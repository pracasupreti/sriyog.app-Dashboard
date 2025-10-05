import { create } from 'zustand';
import axiosInstance from '@/lib/axios';
import { toast } from 'react-hot-toast';
import { use } from 'react';
import { AxiosError, AxiosResponse } from 'axios';

interface User {
  _id: string;
  Email: string;
  Fullname: string;
  Photo: string;
  role: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isUserLoggingOut:boolean;
  isAuthenticated: boolean;
  initialized: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
//   setUser: (user: User | null) => void;
//   setLoading: (loading: boolean) => void;
  initialize: () => Promise<void>;
  refreshToken: () => Promise<any>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isLoading: true,
  isUserLoggingOut:false,
  isAuthenticated: false,
  initialized: false,

//   setUser: (user) => {
//     set({ user, isAuthenticated: !!user });
//   },

//   setLoading: (isLoading) => {
//     set({ isLoading });
//   },

  login: async (email: string, password: string) => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.post('/auth/login', {
        Email: email,
        Password: password
      });

      if (response.data.success) {
        const user = response.data.user;
        set({ 
          user, 
          isAuthenticated: true, 
          isLoading: false,
          initialized: true
        });
        // Don't show toast here - let the redirect happen smoothly
        // toast.success('Login successful');
        return { success: true };
      } else {
        set({ isLoading: false });
        toast.error(response.data.message,{id:'login_error'});
        return { success: false, message: response.data.message };
      }
    } catch (error: unknown) {
      console.error('Login error:', error);
      set({ isLoading: false });
      const errorMessage = error instanceof Error && 'response' in error && 
        typeof error.response === 'object' && error.response !== null &&
        'data' in error.response && typeof error.response.data === 'object' && 
        error.response.data !== null && 'message' in error.response.data 
        ? String(error.response.data.message) 
        : 'Login failed';
      toast.error(errorMessage, {id:'login_error'});
      return { 
        success: false, 
        message: errorMessage
      };
    }
  },

  logout: async () => {
    set({ isUserLoggingOut: true });
    try {
      await axiosInstance.get('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      set({ 
        user: null, 
        isAuthenticated: false, 
        isUserLoggingOut: false,
        initialized: true
      });
    }
  },

  checkAuth: async () => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get('/auth/profile');
      console.log(response)
      if (response.data) {
        set({ 
          user: response.data, 
          isAuthenticated: true,
          isLoading: false,
          initialized: true
        });
      } else {
        set({ 
          user: null, 
          isAuthenticated: false,
          isLoading: false,
          initialized: true
        });
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      // Optional: Clear stale cookies
      try {
        await axiosInstance.get('/auth/logout');
      } catch {}
      
      set({ 
        user: null, 
        isAuthenticated: false,
        isLoading: false,
        initialized: true
      });
    }
  },

  initialize: async () => {
    await get().checkAuth();
  },
     refreshToken: async () => { 
		// if(get().isLoading) return;
		try {
       console.log('🔄 Attempting to refresh token...');
			const response = await axiosInstance.post("/auth/refresh-token");
      console.log('✅ Token refresh successful:', response.data);
          if (response.data.user) {
        set({ 
          user: response.data.user,
          isAuthenticated: true,
          initialized: true
        });
      }
			return response.data;
		} catch (error:unknown) {
            console.error('❌ Token refresh failed:', error);
      
      // Clear auth state on refresh failure
      set({ 
        user: null, 
        isAuthenticated: false,
        isLoading: false,
        initialized: true
      });
      
      throw error;
	}

}
}));

// let refreshPromise:Promise<unknown>|null=null;
// axiosInstance.interceptors.response.use(
// (response:AxiosResponse)=>response,
//   async(error:AxiosError)=>{
//     const originalRequest=error.config;
//     if(error.response?.status === 401 && !originalRequest._retry){
//       originalRequest._retry=true;
//       try{
//         if(refreshPromise){
//           await refreshPromise;
//           return axiosInstance(originalRequest)
//         }
//         //start new refresh Promise
//         refreshPromise=useAuthStore.getState().refreshToken();
//         await refreshPromise;
//         refreshPromise=null;
//         return axiosInstance(originalRequest);
          
//       }catch(refreshError:any){
//         useAuthStore.getState().logout();
//         return Promise.reject(refreshError);
//       }
//     }
//     return Promise.reject(error);
//   }
// )

let refreshPromise: Promise<any> | null = null;

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;
    
    // Type guard to ensure originalRequest exists and add _retry property
    if (!originalRequest) {
      return Promise.reject(error);
    }

    // Add _retry property to the request config
    interface ExtendedAxiosRequestConfig {
      _retry?: boolean;
    }
    
    const extendedRequest = originalRequest as ExtendedAxiosRequestConfig;

    if (error.response?.status === 401 && !extendedRequest._retry) {
      extendedRequest._retry = true;
      
      try {
        console.log('🔄 401 detected, attempting token refresh...');
        
        // If there's already a refresh in progress, wait for it
        if (refreshPromise) {
          console.log('⏳ Waiting for existing refresh promise...');
          await refreshPromise;
          return axiosInstance(originalRequest);
        }

        // Start new refresh promise
        console.log('🚀 Starting new token refresh...');
        refreshPromise = useAuthStore.getState().refreshToken();
        await refreshPromise;
        refreshPromise = null;
        
        console.log('✅ Token refreshed, retrying original request...');
        return axiosInstance(originalRequest);
          
      } catch (refreshError: unknown) {
        console.error('❌ Token refresh failed, logging out user:', refreshError);
        refreshPromise = null;
        
        // Only logout if it's actually a refresh token failure
        const authStore = useAuthStore.getState();
        if (authStore.isAuthenticated) {
          await authStore.logout();
        }
        
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);
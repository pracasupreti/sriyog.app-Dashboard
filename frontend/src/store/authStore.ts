import { create } from 'zustand';
import axiosInstance from '@/lib/axios';
import { toast } from 'react-hot-toast';

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
}));
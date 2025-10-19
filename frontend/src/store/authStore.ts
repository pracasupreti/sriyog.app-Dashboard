import { create } from 'zustand';
import axiosInstance from '@/lib/axios';
import { toast } from 'react-hot-toast';
import { AxiosError, AxiosResponse } from 'axios';

interface User {
  _id: string;
  Email: string;
  Fullname: string;
  Photo: string;
  role: string;
  isVerified:boolean;
  lastLogin:Date;
  passwordResetToken?:string;
  passwordResetTokenExpiresAt?:Date,
  verificationToken?:string;
  verificationTokenExpiresAt?:Date

}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isUserLoggingOut:boolean;
  isAuthenticated: boolean;
  initialized: boolean;
  isresetLinkSending:boolean;
  isResettingPassword:boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
//   setUser: (user: User | null) => void;
//   setLoading: (loading: boolean) => void;
  initialize: () => Promise<void>;
  refreshToken: () => Promise<unknown>;
  forgetPassword:(email:string)=>Promise<unknown>;
  resetPassword:(token:string,newPassword:string,confirmPassword:string)=>Promise<unknown>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isLoading: true,
  isUserLoggingOut:false,
  isAuthenticated: false,
  initialized: false,
  isresetLinkSending:false,
  isResettingPassword:false,

//   setUser: (user) => {
//     set({ user, isAuthenticated: !!user });
//   },

//   setLoading: (isLoading) => {
//     set({ isLoading });
//   },

  login: async (email: string, password: string) => {
    set({ isLoading: true });
    console.log('🔍 Starting login process...');
    
    try {
      const response = await axiosInstance.post('/auth/login', {
        Email: email,
        Password: password
      });

      console.log('🔍 Login response:', response.data);

      if (response.data.success) {
        const user = response.data.user;
        console.log('✅ Setting user data:', user);
        
        set({ 
          user, 
          isAuthenticated: true, 
          isLoading: false,
          initialized: true
        });
        
        console.log('✅ Auth state updated successfully');
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
      await axiosInstance.post('/auth/logout');
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
        await axiosInstance.post('/auth/logout');
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
      console.log('⏰ Current time:', new Date().toISOString());
      console.log('🍪 Available cookies:', document.cookie);
      
			const response = await axiosInstance.post("/auth/refresh-token");
      console.log('hello from china',response)
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
      console.log('hello i was called')
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
,   
forgetPassword:async(email)=>{
        set({isresetLinkSending:true})
        try{
            const response=await axiosInstance.post('/auth/forget-password',{email})
            if(response.status===200){
                toast.success('Password reset link sent to your email')
                set({isresetLinkSending:false})
            }
            return response;
        }catch(error:unknown){
            console.log(error)
            set({isresetLinkSending:false})
            if (error instanceof AxiosError) {
      const errorMessage = error.response?.data?.error || 
                          error.response?.data?.message || 
                          "Failed to send password reset link";
      toast.error(errorMessage);
    } else {
      // Handle non-Axios errors
      toast.error("Failed to send password reset link");
    }
        }
    },

// resendVerificationEmail:async()=>{
//         set({isSendingVerification:true,isEmailvefificationlinksent:false})
//         try{
//             const response=await axios.get('/auth/verify-emailLink')
//             if(response.status===200){
//                 toast.success('verification link sent to your email')
//                 set({isEmailVerificationLinkSent:true,isSendingVerification:false})
//             }
//             return response;
//         }catch(error){
//             console.log(error)
//             set({isSendingVerification:false})
//             toast.error(error?.response?.data?.error || error?.response?.data?.message || "Failed to send verification email")
//         }
//     },
//     verifyEmail:async(code)=>{
//         set({isVerifyingEmail:true})
//         try{
//             const response=await axios.post('/auth/verify-email',{code})
//             if(response.status===200){
//                 toast.success('Email verified successfully')
//                 set({isVerifyingEmail:false,user:response.data.user})
//             }
//             return response;
//         }catch(error){
//             console.log(error)
//             set({isVerifyingEmail:false})
//             toast.error(error?.response?.data?.error || error?.response?.data?.message || "Failed to verify email")
//         }
//     },

    resetPassword:async(token,newPassword,confirmPassword)=>{
        if(newPassword !== confirmPassword){
            return toast.error('passwords do not match');
        }
        set({isResettingPassword:true})

        try{
            const response=await axiosInstance.post(`/auth/reset-password/${token}`,{newPassword})
            if(response.status===200){
                toast.success('Password reset successfully')
                set({isResettingPassword:false})
            }
            return response;
        }catch(error){
            console.log(error)
            set({isResettingPassword:false})
             if (error instanceof AxiosError) {
      const errorMessage = error.response?.data?.error || 
                          error.response?.data?.message || 
                          "Failed to reset the password";
      toast.error(errorMessage);
    } else {
      // Handle non-Axios errors
      toast.error("Failed to reset the password");
    }
        }
    },
}));



let refreshPromise: Promise<unknown> | null = null;

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;
    if (!originalRequest) {
      return Promise.reject(error);
    }

    interface ExtendedAxiosRequestConfig {
      _retry?: boolean;
    }
    const extendedRequest = originalRequest as ExtendedAxiosRequestConfig;

    // Handle invalid refresh token immediately
    if (
      error instanceof AxiosError &&
      typeof error.response?.data === "object" &&
      error.response?.data !== null &&
      "message" in error.response.data &&
      (error.response.data as { message?: string }).message === "Invalid refresh token"
    ) {
      await useAuthStore.getState().logout();
      toast.error("Session expired. Please log in again.");
      return Promise.reject(error);
    }

    // Handle access token expiration and refresh logic
    if (error.response?.status === 401 && !extendedRequest._retry) {
      extendedRequest._retry = true;

      try {
        if (!refreshPromise) {
          refreshPromise = useAuthStore.getState().refreshToken();
        }
        await refreshPromise;
        refreshPromise = null;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        refreshPromise = null;

        let message = "";
        if (refreshError instanceof AxiosError) {
          message = refreshError.response?.data?.message || refreshError.message || "";
        } else {
          message = (refreshError as {message?:string})?.message || "";
        }

        if (message === "Invalid refresh token") {
          await useAuthStore.getState().logout();
          toast.error("Session expired. Please log in again.");
          return Promise.reject(refreshError);
        }

        // Fallback: logout if still authenticated
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



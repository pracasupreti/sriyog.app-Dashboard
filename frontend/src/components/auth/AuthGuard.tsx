"use client";
import { useAuthStore } from "@/store/authStore";
import { Loader } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  console.log('AuthGuard rendered');
  
  // ✅ Use individual selectors to ensure reactivity
  const isLoading = useAuthStore((state) => state.isLoading);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const initialized = useAuthStore((state) => state.initialized);
  
  const router = useRouter();
  const pathname = usePathname();

  console.log('Current pathname:', pathname);
  console.log('AuthGuard State:', { 
    isLoading, 
    isAuthenticated, 
    initialized 
  });

  // ✅ React to authentication state changes
  useEffect(() => {
    // Don't do anything until initialized
    if (!initialized) {
      console.log('❌ Not initialized yet, waiting...');
      return;
    }

    console.log('🔥 Auth state changed!', { 
      isAuthenticated, 
      pathname,
      initialized 
    });
    
    // Handle authenticated user on signin page
    if (isAuthenticated && pathname === '/signin') {
      console.log('✅ Authenticated user on signin page, redirecting to home...');
      // ✅ Use window.location for reliable redirect in production
      window.location.href = '/';
      return;
    }
    
    // Handle unauthenticated user on protected pages
    if (!isAuthenticated && pathname !== '/signin') {
      console.log('❌ Unauthenticated user on protected page, redirecting to signin...');
      window.location.href = '/signin';
      return;
    }
    
    console.log('✅ No redirect needed - user is in correct place');
  }, [initialized, isAuthenticated, pathname]); // ✅ React to these state changes

  // ✅ Show loading only if not initialized
  if (!initialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-pink-50">
        <div className="flex flex-col items-center space-y-4">
          <p className="text-gray-600">
            <Loader className="w-16 h-16 animate-spin text-primary" />
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
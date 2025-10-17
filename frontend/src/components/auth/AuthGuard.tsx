"use client";
import { useAuthStore } from "@/store/authStore";
import { Loader } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isLoading, isAuthenticated, initialized } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  
  console.log('AuthGuard State:', { isLoading, isAuthenticated, initialized, pathname });

  useEffect(() => {
    console.log('🔥 AuthGuard useEffect triggered');
    
    // Don't redirect until initialization is complete
    if (!initialized) {
      console.log('❌ Not initialized yet, waiting...');
      return;
    }
    
    // Redirect authenticated users away from auth pages
    if (isAuthenticated && pathname === '/signin') {
      console.log('✅ Authenticated user accessing signin, redirecting to home');
      router.replace('/');
      return;
    }
    
    // Only redirect if not authenticated and not already on signin page
    if (!isAuthenticated && pathname !== '/signin' ) {
      console.log('❌ Unauthenticated user, redirecting to /signin');
      router.replace('/signin');
    }
  }, [initialized, isAuthenticated, pathname, router]);

  // ✅ KEY LOGIC: Only show loading when we have potential authentication to check
  const shouldShowLoading = !initialized && isLoading;
  
  // ✅ Show loading only when:
  // 1. Not initialized yet AND
  // 2. We're in the process of checking authentication (isLoading = true)
  // 3. NOT on signin page (signin should always show the form)
  if (shouldShowLoading && pathname !== '/signin') {
    console.log('🔄 Showing authentication loading...');
    return (
      <div className="h-screen flex items-center justify-center bg-pink-50">
          <Loader className="w-16 h-16 animate-spin text-primary" />
        </div>
    );
  }

  // ✅ If not authenticated and not on signin page, show nothing while redirecting
  if (!isAuthenticated && pathname !== '/signin' && initialized) {
    return null;
  }

  return <>{children}</>;
}
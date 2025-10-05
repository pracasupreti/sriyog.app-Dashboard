"use client";
import { useAuthStore } from "@/store/authStore";
import { Loader } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, isLoading, isAuthenticated, initialized } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Don't redirect until initialization is complete
    if (!initialized) return;
    
    // Redirect authenticated users away from auth pages
    if (isAuthenticated && pathname === '/signin') {
      console.log('Authenticated user accessing signin, redirecting to home');
      router.replace('/');
      return;
    }
    
    // Only redirect if not authenticated and not already on signin page
    if (!isAuthenticated && pathname !== '/signin') {
      console.log('Unauthenticated user, redirecting to /signin');
      router.replace('/signin');
    }
  }, [initialized, isAuthenticated, pathname, router]);

  // Show loader while initializing or loading
  if (!initialized || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-pink-50">
        <div className="flex flex-col items-center space-y-4">
          {/* <div className="w-12 h-12 border-4 border-[#8B1C1C] border-t-transparent rounded-full animate-spin"></div> */}
          <p className="text-gray-600"><Loader className="w-16 h-16 animate-spin text-primary " /></p>
        </div>
      </div>
    );
  }

  // If not authenticated and not on signin page, show nothing while redirecting
  if (!isAuthenticated && pathname !== '/signin') {
    return null;
  }

  return <>{children}</>;
}
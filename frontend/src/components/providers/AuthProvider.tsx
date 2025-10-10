"use client";
import { useAuthStore } from '@/store/authStore';
import { useEffect, useRef } from 'react';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const initialize = useAuthStore((state) => state.initialize);
  const initialized = useAuthStore((state) => state.initialized);
  const hasInitialized = useRef(false);

  console.log('🔄 AuthProvider render - initialized:', initialized, 'hasInitialized.current:', hasInitialized.current);

  useEffect(() => {
    // ✅ Super strict guard - only initialize ONCE
    if (!hasInitialized.current && !initialized) {
      console.log('� AuthProvider: Starting initialization...');
      hasInitialized.current = true;
      
      // ✅ Run initialization
      initialize().catch((error) => {
        console.error('❌ AuthProvider initialization failed:', error);
      });
    } else {
      console.log('🔄 AuthProvider: Skipping initialization - already done');
    }
  }, []); // ✅ Empty dependency array - only run once on mount

  return <>{children}</>;
}
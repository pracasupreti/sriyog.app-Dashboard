"use client";
import { useAuthStore } from '@/store/authStore';
import { useEffect } from 'react';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const initialize = useAuthStore(state => state.initialize);


  useEffect(() => {
    initialize();
  }, [initialize]);

  return <>
  {children}
  </>;
}
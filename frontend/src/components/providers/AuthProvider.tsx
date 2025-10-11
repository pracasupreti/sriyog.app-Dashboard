"use client";
import { useAuthStore } from '@/store/authStore';
import { useEffect } from 'react';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const initialize = useAuthStore(state => state.initialize);

  console.log('i am auth provider on running state');

  useEffect(() => {
    console.log('this user effect is also running');
    initialize();
  }, [initialize]);

  return <>
  {children}
  </>;
}
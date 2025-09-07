'use client'
import { useAuthStore } from '@/app/stores/authStore';
import { useEffect, useState, useRef, useCallback } from 'react';

export function AuthInitializer({ 
  children, 
  lang = 'en' 
}: { 
  children: React.ReactNode; 
  lang: string; 
}) {
  const [hasHydrated, setHasHydrated] = useState(false);
  const initRef = useRef(false);
  
  // Use stable selectors with useCallback to prevent re-renders
  const initialize = useAuthStore(useCallback((state) => state.initialize, []));
  const isInitialized = useAuthStore(useCallback((state) => state.isInitialized, []));
  const isLoading = useAuthStore(useCallback((state) => state.isLoading, []));
  const user = useAuthStore(useCallback((state) => state.user, []));

  // Handle hydration only once
  useEffect(() => {
    setHasHydrated(true);
  }, []);

  // Initialize store when hydrated and on language changes
  useEffect(() => {
    if (hasHydrated && !initRef.current) {
      initRef.current = true;
      const init = async () => {
        try {
          await initialize(lang);
        } catch (error) {
          console.error('Auth initialization failed:', error);
        } finally {
          initRef.current = false; // Allow reinitialization
        }
      };
      init();
    }
  }, [hasHydrated, initialize, lang]);

  // Show loading state during hydration or initialization
  if (!hasHydrated || !isInitialized || isLoading) {
    return (
      <>
        <div className="flex items-center justify-center fixed top-0 left-0 min-h-screen min-w-screen z-10000 bg-white/60">
            <div className='flex flex-col items-center justify-center bg-white gap-10 rounded-2xl p-10'>
                <div className="animate-spin rounded-full h-15 w-15 border-b-3 text-[var(--theme)]"></div>
                <p className='font-bold text-[var(--theme)]'>SoleimaniRice</p>
            </div>
        </div>
        {children}
      </>
    );
  }

  return <>{children}</>;
}
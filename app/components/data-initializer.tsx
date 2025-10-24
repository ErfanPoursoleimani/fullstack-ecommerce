'use client'
import { useEffect, useRef, useState } from 'react';
import { useDataStore } from '../stores/dataStore';
import { useAuthStore } from '@/app/stores/authStore';

interface DataInitializerProps {
    children: React.ReactNode;
    lang?: string;
}

export const DataInitializer: React.FC<DataInitializerProps> = ({
    children,
    lang = 'en',
}) => {

    // Track previous auth state to detect changes
    const prevAuthRef = useRef<{
        userId: number | null;
        isAuthenticated: boolean;
        cartId: number | null;
    }>({
        userId: null,
        isAuthenticated: false,
        cartId: null
    });

    const hasInitializedRef = useRef(false);
    
    // Auth state selectors
    const authIsInitialized = useAuthStore((state) => state.isInitialized);
    const userId = useAuthStore((state) => state.userId);
    const cartId = useAuthStore((state) => state.cartId);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    
    // Data store selectors
    const initializeStore = useDataStore((state) => state.initializeStore);
    const dataLoading = useDataStore((state) => state.loading);
    const dataReset = useDataStore((state) => state.reset);

    const [hasHydrated, setHasHydrated] = useState(false);
    const [isDataInitialized, setIsDataInitialized] = useState(false);
    useEffect(() => {
        setHasHydrated(true);
    }, []);

    // Main effect that handles initialization and reinitialization
    useEffect(() => {
        if (!authIsInitialized) return;

        const currentAuth = { userId, isAuthenticated, cartId };
        const prevAuth = prevAuthRef.current;

        // Detect if this is the first initialization or if auth state changed
        const isFirstInit = !hasInitializedRef.current;
        const authChanged = (
            prevAuth.userId !== currentAuth.userId ||
            prevAuth.isAuthenticated !== currentAuth.isAuthenticated ||
            prevAuth.cartId !== currentAuth.cartId
        );

        const shouldInitialize = isFirstInit || authChanged;

        if (shouldInitialize) {
            const init = async () => {
                try {
                    // If user logged out, reset the store first
                    if (prevAuth.isAuthenticated && !currentAuth.isAuthenticated) {
                        dataReset();
                    }

                    // Initialize/reinitialize the store
                    await initializeStore(lang, isAuthenticated, cartId, userId);
                    
                    // Update refs after successful initialization
                    prevAuthRef.current = currentAuth;
                    hasInitializedRef.current = true;

                    setIsDataInitialized(true)
                    
                } catch (error) {
                    console.error('Data store initialization failed:', error);
                }
            };

            init();
        }
    }, [
        authIsInitialized,
        userId,
        isAuthenticated,
        cartId,
        initializeStore,
        dataReset,
        lang
    ]);

    if (!hasHydrated/*  || dataLoading */ || !isDataInitialized) {
        return (
        <>
            <div className="flex items-center justify-center fixed top-0 left-0 min-h-screen min-w-screen z-10000 bg-white/60">
                <div className='flex flex-col items-center justify-center bg-white gap-10 rounded-2xl p-10'>
                    <div className="animate-spin rounded-full h-15 w-15 border-b-3 text-[var(--theme)]"></div>
                    <p className='font-bold text-[var(--theme)]'>SoleymaniRice</p>
                </div>
            </div>
            {children}
        </>
        );
    }

    return <>{children}</>;
};
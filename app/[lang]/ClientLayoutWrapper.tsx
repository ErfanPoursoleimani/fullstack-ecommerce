'use client';
import { DataInitializer } from '@/app/components/data-initializer';
import { useAuthStore } from '@/app/stores/authStore';
import { useDataStore } from '@/app/stores/dataStore';
import { usePathname } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import BottomNavBar from './_Navbar/BottomNavBar';
import TopNavBar from './_Navbar/TopNavBar';

interface ClientLayoutWrapperProps {
  children: ReactNode;
  lang: string;
}

export default function ClientLayoutWrapper({ children, lang }: ClientLayoutWrapperProps) {
  
  const currentPath = usePathname()


  return (
    <>
        {
        currentPath.startsWith(`/${lang}/users/login`) /* || 
        currentPath.startsWith(`/${lang}/profile`)   */
        ? null 
        : <TopNavBar 
        className={`
            ${currentPath.startsWith(`/${lang}/profile`) ? "hidden md:flex" : null}
          `}/>
        }
          <main>
            {children}
          </main>
        {currentPath.startsWith(`/${lang}/users/login`) ? null : <BottomNavBar />}
    </>
  );
}
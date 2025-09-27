'use client';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { usePathname } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import BottomNavBar from './_Navbar/BottomNavBar';
import TopNavBar from './_Navbar/TopNavBar';

interface ClientLayoutWrapperProps {
  children: ReactNode;
  lang: string;
}

export default function ClientLayoutWrapper({ children, lang }: ClientLayoutWrapperProps) {
  
  let currentPath = usePathname()



  useEffect(() => {
    // Initialize Lenis with new autoRaf option
    const lenis = new Lenis({
      autoRaf: true, // 🆕 New feature - handles RAF automatically
      // lerp: 0.1,
      // duration: 1.2,
      // easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    // Listen for scroll events
    lenis.on('scroll', (e) => {
      console.log(e);
    });

    // Cleanup
    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
        {currentPath.startsWith(`/${lang}/users/login`) 
          ? null 
          : <TopNavBar 
              className={`
                ${currentPath.startsWith(`/${lang}/profile`) ? "hidden md:flex" : null} 
                ${currentPath.startsWith(`/${lang}/checkout/shipping`) ? "hidden" : null}
                ${currentPath.startsWith(`/${lang}/checkout/payment`) ? "hidden" : null}
            `}/>
        }
                  <main>
                    {children}
                  </main>
        {currentPath.startsWith(`/${lang}/users/login`) 
          ? null 
          : <BottomNavBar 
              className={`
                ${currentPath.startsWith(`/${lang}/products/`) ? "hidden md:fixed" : null} 
                ${currentPath.startsWith(`/${lang}/checkout/shipping`) ? "hidden" : null}
                ${currentPath.startsWith(`/${lang}/checkout/payment`) ? "hidden" : null}
            `} />
        }
    </>
  );
}
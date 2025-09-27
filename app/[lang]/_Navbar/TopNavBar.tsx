'use client'
import { useAuthStore } from '@/app/stores/authStore';
import useDataStore from '@/app/stores/dataStore';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { PiShoppingBagFill } from "react-icons/pi";
import { SignInButton } from '../_components';
import Footer from './components/Footer';
import LanguageDropdown from './components/LanguageDropdown';
import SearchBar from './components/SearchBar';
import UserDropdown from './components/UserDropdown';
import { useScrollDirection } from '@/app/hooks/useScrollDirection'




const DesktopNavBar = ({ className }: { className: string }) => {

  const currentPath = usePathname()

  const { lang } = useParams()
  const { isAuthenticated, role } = useAuthStore()
  const { dict, isRTL } = useDataStore()
  const { logo, selectYourRegion } = dict

  const isBodyVisible = useScrollDirection(100);
  const isFooterVisible = useScrollDirection(100);
  
  const navLinks = useMemo(() => {
    
    const baseNavLinks = [
      {id: 1, label: "home", href: `/${lang}#home`},
      {id: 2, label: "products", href: `/${lang}#products`},
      {id: 3, label: "contact", href: `/${lang}#contact`},
      {id: 4, label: "about", href: `/${lang}#about`},
    ]
    
    // Create new array with translated labels
    const translatedLinks = baseNavLinks.map(link => ({
      ...link,
      label: (dict[link.label as keyof typeof dict] as string) || link.label
    }))
    
    return translatedLinks
  }, [dict, lang])
  
  const adminNavLinks = useMemo(() => {
    
    const baseNavLinks = [
    {id: 1, label: "home", href: `/${lang}#home`},
    {id: 3, label: "products", href:  `/${lang}#products`},
    {id: 2, label: "orders", href: `/${lang}#orders`},
  ]
    
    // Create new array with translated labels
    const translatedLinks = baseNavLinks.map(link => ({
      ...link,
      label: (dict[link.label as keyof typeof dict] as string) || link.label
    }))
    
    return translatedLinks
  }, [dict, lang])
  
  
  !(isRTL) ? null : (navLinks.sort((a, b) => navLinks.indexOf(b) - navLinks.indexOf(a)), adminNavLinks.sort((a, b) => adminNavLinks.indexOf(b) - adminNavLinks.indexOf(a)))
  
  
  return (
    <>
      <nav className={`
        ${className}
        flex flex-col justify-center z-104 items-stretch fixed w-[100%] ${!isBodyVisible ? 'border-b-1' : null} border-[#7979793f] text-[var(--dark-text)] bg-[var(--background)] top-0 z-103 lg:px-[10%] px-3 pt-3 ${!isFooterVisible ? "pb-3" : "max-md:pb-3"}
        `}
      >
        <div
          className='flex justify-between gap-4 items-center'
          style={{
            flexDirection: isRTL ? 'row' : 'row-reverse'
          }}
          >
          <div
            className='flex gap-6 items-center justify-center h-full'
            style={{
              flexDirection: isRTL ? 'row' : 'row-reverse'
            }}
          >
            <Link className='top-to-down-animation text-[27px] cursor-pointer hidden md:inline-block' href={`/${lang}/checkout/cart`}>
              <PiShoppingBagFill color='var(--icons)' />
            </Link>
            <span className='hidden md:inline-block text-[13px] text-[#8f8f8f]'>|</span>
            {!isAuthenticated
              ? <SignInButton className={'hidden md:block'} />
              : <UserDropdown />
            }
            <LanguageDropdown />
          </div>
          <div
            className='flex justify-stretch items-center flex-1 gap-5'
            style={{
              flexDirection: !isRTL ? 'row' : 'row-reverse'
            }}
          >
            <Link href={`/${lang}`} className={`font-extrabold text-[var(--theme)] text-xl xl:text-2xl hidden md:inline-block ${isRTL ? "max-xl:text-[18px]" : null}`}>{logo}</Link>
            <SearchBar />
          </div>
        </div>
      </nav>
      <nav className={`
        ${className}
        flex flex-col top-[54px] justify-center items-between fixed w-[100vw] shadow-xs text-[var(--dark-text)] bg-[var(--background)] md:z-103 z-102 ${isFooterVisible ? 'translate-y-0' : '-translate-y-full'}
        `}
      >
        <Footer/>
      </nav>
    </>
  )
}

export default DesktopNavBar
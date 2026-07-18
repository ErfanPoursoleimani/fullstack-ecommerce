'use client'

import { useAuthStore } from '@/app/stores/authStore'
import useDataStore from '@/app/stores/dataStore'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { PiShoppingBagFill } from 'react-icons/pi'
import { SignInButton } from '../_components/general'
import Footer from './components/Footer'
import LanguageDropdown from './components/LanguageDropdown'
import SearchBar from './components/SearchBar'
import UserDropdown from './components/UserDropdown'
import { useScrollDirection } from '@/app/hooks/useScrollDirection'

const DesktopNavBar = ({ className }: { className: string }) => {
  const currentPath = usePathname()

  const { lang } = useParams()
  const { isAuthenticated } = useAuthStore()
  const { dict, isRTL } = useDataStore()
  const { logo } = dict

  const isBodyVisible = useScrollDirection(100)
  const isFooterVisible = useScrollDirection(100)

  // Floating navbar state
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = useMemo(() => {
    const baseNavLinks = [
      { id: 1, label: 'home', href: `/${lang}#home` },
      { id: 2, label: 'products', href: `/${lang}#products` },
      { id: 3, label: 'contact', href: `/${lang}#contact` },
      { id: 4, label: 'about', href: `/${lang}#about` },
    ]

    return baseNavLinks.map((link) => ({
      ...link,
      label: (dict[link.label as keyof typeof dict] as string) || link.label,
    }))
  }, [dict, lang])

  const adminNavLinks = useMemo(() => {
    const baseNavLinks = [
      { id: 1, label: 'home', href: `/${lang}#home` },
      { id: 2, label: 'orders', href: `/${lang}#orders` },
      { id: 3, label: 'products', href: `/${lang}#products` },
    ]

    return baseNavLinks.map((link) => ({
      ...link,
      label: (dict[link.label as keyof typeof dict] as string) || link.label,
    }))
  }, [dict, lang])

  if (isRTL) {
    navLinks.reverse()
    adminNavLinks.reverse()
  }

  return (
    <>
      <nav
        className={`
          ${className}
          fixed
          z-[104]
          flex flex-col justify-center items-stretch
          

          ${
            isScrolled
              ? `
                top-4
                left-1/2
                -translate-x-1/2
                w-[92%]
                px-5
                max-w-7xl
                rounded-t-2xl
                border-x border-t
                border-[#7979793f]
                backdrop-blur-xl
                bg-[var(--background)]
              `
              : `
                top-0
                left-0
                w-full
                rounded-none
                border-[#7979793f]
                shadow-none
                bg-[var(--background)]
                lg:px-[10%]
              `
          }

          text-[var(--dark-text)]
          px-3
          pt-3
          ${!isFooterVisible ? 'pb-3 rounded-b-2xl' : 'max-md:pb-3'}
        `}
      >
        <div
          className="flex justify-between items-center gap-4"
          style={{
            flexDirection: isRTL ? 'row' : 'row-reverse',
          }}
        >
          <div
            className="flex gap-6 items-center justify-center h-full"
            style={{
              flexDirection: isRTL ? 'row' : 'row-reverse',
            }}
          >
            <Link
              className="top-to-down-animation text-[27px] cursor-pointer hidden md:inline-block"
              href={`/${lang}/checkout/cart`}
            >
              <PiShoppingBagFill color="var(--icons)" />
            </Link>

            <span className="hidden md:inline-block text-[13px] text-[#8f8f8f]">
              |
            </span>

            {!isAuthenticated ? (
              <SignInButton className="hidden md:block" />
            ) : (
              <UserDropdown />
            )}

            <LanguageDropdown />
          </div>

          <div
            className="flex max-xl:flex-1 xl:w-1/2 items-center justify-stretch gap-5"
            style={{
              flexDirection: !isRTL ? 'row' : 'row-reverse',
            }}
          >
            <Link
              href={`/${lang}`}
              className={`font-extrabold text-[var(--theme)] text-xl xl:text-2xl hidden md:inline-block ${
                isRTL ? 'max-xl:text-[18px]' : ''
              }`}
            >
              {logo}
            </Link>

            <SearchBar />
          </div>
        </div>
      </nav>

      <nav
        className={`
          ${className}
          fixed
          md:z-[103]
          z-[102]
          flex flex-col
          border-[#7979793f]
          justify-center
          items-between
          transition-all duration-300 ease-out
          text-[var(--dark-text)]
          bg-[var(--background)]

          ${
            isScrolled
              ? `
                top-[76px]
                left-1/2
                -translate-x-1/2
                w-[92%]
                border-x border-b
                max-w-7xl
                rounded-b-2xl
                shadow-xl
              `
              : `
                top-[60px]
                left-0
                w-full
                lg:px-[10%]
              `
          }

          ${isFooterVisible ? 'translate-y-0' : '-translate-y-full'}
        `}
      >
        <Footer />
      </nav>
    </>
  )
}

export default DesktopNavBar
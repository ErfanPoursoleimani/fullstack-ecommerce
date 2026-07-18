'use client'
import { useAuthStore } from '@/app/stores/authStore';
import useDataStore from '@/app/stores/dataStore';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { Component, ReactNode, useMemo } from 'react';
import { BiCategory, BiSolidCategory } from "react-icons/bi";
import { FaRegUser, FaUser } from "react-icons/fa6";
import { PiShoppingBagFill, PiShoppingBagLight } from 'react-icons/pi';
import { RiHome9Fill, RiHome9Line } from "react-icons/ri";




const PhoneNavBar = ({className}: { className?: string}) => {

    const currentPath = usePathname()

    const { lang } = useParams()
    const { user, role } = useAuthStore()
    const { dict, isRTL } = useDataStore()
    
    const navLinks = useMemo(() => {
        const baseNavLinks = [
            {id: 1, label: "home", selectedIcon: <RiHome9Fill className='text-[#555] text-xl' />, unselectedIcon: <RiHome9Line className='text-xl' />, href: `/${lang}`},
            {id: 2, label: "products", selectedIcon: <BiSolidCategory className='text-[#555] text-xl' />, unselectedIcon: <BiCategory className='text-xl' />, href: `/${lang}/products`},
            {id: 3, label: "cart", selectedIcon: <PiShoppingBagFill className='text-[#555] text-xl' />, unselectedIcon: <PiShoppingBagLight className='text-xl' />, href: `/${lang}/checkout/cart`},
            {id: 4, label: "profile", selectedIcon: <FaUser className='text-[#555] text-xl' />, unselectedIcon: <FaRegUser className='text-xl' />, href: `/${lang}/profile` },
        ]

        // Create new array with translated labels
        const translatedLinks = baseNavLinks.map((link: {id: number, label: string, selectedIcon: ReactNode, unselectedIcon: ReactNode, href: string}) => ({
            ...link,
            label: dict.links?.[link.label as keyof typeof dict.links] || link.label
        }))

        // Reverse order for RTL languages
        if (isRTL) {
            return [...translatedLinks].reverse()
        }

        return translatedLinks
    }, [dict, lang])

    const adminNavLinks = useMemo(() => {
        const baseAdminLinks = [
            {id: 1, label: "user", selectedIcon: <RiHome9Fill className='text-[#555] text-xl' />, unselectedIcon: <RiHome9Line className='text-xl' />, href: `/${lang}`},
            {id: 3, label: "products", selectedIcon:  <BiSolidCategory className='text-[#555] text-xl' />, unselectedIcon: <BiCategory className='text-xl' />, href: `/${lang}/admin/dashboard/products`},
            {id: 4, label: "Orders", selectedIcon:  <PiShoppingBagFill className='text-[#555] text-xl' />, unselectedIcon: <PiShoppingBagLight className='text-xl' />, href: `/${lang}/admin/dashboard/orders`},
            {id: 5, label: "users", selectedIcon:<FaUser className='text-[#555] text-xl' />, unselectedIcon: <FaRegUser className='text-xl' /> , href: `/${lang}/admin/dashboard/users`}
        ]

        // Create new array with translated labels
        const translatedLinks = baseAdminLinks.map((link: {id: number, label: string, selectedIcon: ReactNode, unselectedIcon: ReactNode, href: string}) => ({
            ...link,
            label: dict.links?.[link.label as keyof typeof dict.links] || link.label
        }))

        // Reverse order for RTL languages
        if (isRTL) {
            return [...translatedLinks].reverse()
        }

        return translatedLinks
    }, [dict, lang])

  return (
    
<nav
  className={`
    ${className}
    fixed
    bottom-4
    left-1/2
    -translate-x-1/2

    w-[calc(100%-1.5rem)]
    max-w-md
    h-16

    rounded-3xl
    border
    border-neutral-200/70

    backdrop-blur-2xl
    shadow-[0_12px_40px_rgba(0,0,0,.18)]


    flex
    items-center
    justify-between
    gap-2

    md:hidden
    z-[120]

    transition-all
    duration-500

    ${
      role === 'ADMIN' && currentPath.startsWith(`/${lang}/admin`)
        ? 'bg-black/90 text-white border-neutral-700'
        : 'bg-white/85 text-neutral-500'
    }
  `}
>
  {(role === 'ADMIN' && currentPath.startsWith(`/${lang}/admin`)
    ? adminNavLinks
    : navLinks
  ).map((elem) => {
    const active =
      currentPath === elem.href ||
      (elem.href !== `/${lang}` && currentPath.startsWith(elem.href))

    return (
      <Link
        key={elem.id}
        href={elem.href}
        className={`
          relative
          flex
          flex-1
          flex-col
          items-center
          justify-center
          gap-2
          rounded-3xl
          py-2
          transition-all
          duration-300
          ${
            active
              ? role === 'ADMIN' &&
                currentPath.startsWith(`/${lang}/admin`)
                ? 'bg-white/10 text-white scale-105'
                : 'bg-[var(--theme)]/10 text-[var(--theme)] scale-105'
              : 'hover:bg-black/5'
          }
        `}
      >
        <div
          className={`
            transition-all
            duration-300
            ${active ? 'scale-110' : ''}
          `}
        >
          {active ? elem.selectedIcon : elem.unselectedIcon}
        </div>

        <span
          className={`
            text-[11px]
            font-medium
            transition-all
            duration-300
            ${active ? 'opacity-100' : 'opacity-70'}
          `}
        >
          {elem.label}
        </span>
      </Link>
    )
  })}
</nav>
  )
}

export default PhoneNavBar


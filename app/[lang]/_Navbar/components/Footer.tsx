import React from 'react'
import CategoryDropdown from './CategoryDropdown'
import RegionDropdown from './RegionDropdown'
import useDataStore from '@/app/stores/dataStore'
import { useParams, usePathname } from 'next/navigation'
import { useAuthStore } from '@/app/stores/authStore'
import Link from 'next/link'
import { MdAdminPanelSettings } from "react-icons/md";
import { FaUser } from 'react-icons/fa'

const Footer = () => {

    const { isRTL } = useDataStore()
    const { role } = useAuthStore()
    const { lang } = useParams()
    const currentPath = usePathname()

  return (
    <footer 
        className={`lg:px-[10%] px-3 flex items-stretch gap-2 h-12 ${role === "USER" ? "max-md:hidden" : ""}`}
        style={{
          justifyContent: 
            isRTL ? 'justify-end' : 'justify-start',
          flexDirection:
            isRTL ? 'row-reverse' : 'row',

        }}
      >
        <CategoryDropdown />
        {/* <RegionDropdown /> */}
        <Link href={`/${lang}/admin/dashboard`} className={`text-[1.5rem] self-center ${role === "ADMIN" ? "block" : "hidden"} ${currentPath.startsWith(`/${lang}/admin`) ? "hidden" : 'block'}`}>
          <MdAdminPanelSettings />
        </Link>
        <Link href={`/${lang}`} className={`text-[1.2rem] self-center ${role === "ADMIN" ? "block" : "hidden"} ${currentPath.startsWith(`/${lang}/admin`) ? "block" : 'hidden'}`}>
          <FaUser />
        </Link>
      </footer>
  )
}

export default Footer

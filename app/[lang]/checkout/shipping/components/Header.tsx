import useDataStore from '@/app/stores/dataStore'
import Link from 'next/link'
import React from 'react'
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md'

const Header = () => {
    const { isRTL, lang, dict } = useDataStore()
  return (
    <div className={`mt-5 px-5 py-2 w-full max-md:min-h-15 max-md:mt-5 md:border-1 max-md:border-b-5 border-neutral-200 md:rounded-[7px] relative max-w-[1200px]`}>
        <span className={`font-medium text-[0.9rem] flex ${!isRTL ? "flex-row-reverse" : ""} items-center justify-center gap-4 absolute top-1/2 -translate-y-1/2 ${isRTL ? "right-5" : "left-5"}`}>
            <span>Address and Shipping</span>
            <Link href={`/${lang}/checkout/cart`}>
            {!isRTL
                ? <MdArrowBackIos/>
                : <MdArrowForwardIos /> }
            </Link>
        </span>
        <p className='max-md:hidden text-center font-bold text-xl'>{dict.logo}</p>
    </div>
  )
}

export default Header

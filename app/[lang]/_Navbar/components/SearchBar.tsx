'use client'
import { useParams } from 'next/navigation'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { LuSearch } from 'react-icons/lu'
import SmallLogo from '../../_components/SmallLogo'
import useDataStore from '@/app/stores/dataStore'
import ProductCard from '../../_ProductCard/ProductCard'
import Link from 'next/link'
import { Product } from '@/app/types/types'
import AnimatedBox from '@/app/components/ui/AnimatedBox'

const SearchBar = () => {

    const { lang } = useParams()
    const { dict, isRTL, products } = useDataStore()
    const { search, in: inn, logo } = dict
    
    const [ isActive, setIsActive ] = useState(false)
    const [basicQuery, setBasicQuery] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    
    const handleBasicSearch = (query: string, array: Product[]): Product[] => {
        if (!query.trim()) return [];

        return array.filter(product => 
            dict.product.products[product.label as keyof typeof dict.product.products].toLowerCase().includes(query.toLowerCase())
        );
    };

/*     const productLabels = useMemo(() => {
        return products.map((product) => dict.product.products[product.label as keyof typeof dict.product.products].toLowerCase())
    }, []) */

    const basicResults = useMemo(() => {
        return handleBasicSearch(basicQuery, products);
    }, [basicQuery]);

    const handleClick = () => {
        setIsActive(!isActive)
    }

    useEffect(() => {
    if (isActive && inputRef.current) {
        inputRef.current.focus();
    }
    }, [isActive]);

  return (
    <>
        <div className={`relative flex items-center justify-stretch gap-2 rounded-[7px] flex-1 xl:flex-initial xl:min-w-[600]`}>
            <div
                className={`${isRTL ? "flex-end flex-row-reverse" : "flex-start"} ${isActive ? "md:hidden" : ""} bg-[#e6e6e6] p-2 md:p-3 text-[#555555] flex items-center justify-stretch gap-2 rounded-[7px] flex-1`}
                onClick={handleClick}
            >
                <LuSearch className='text-[17px]'/>
                <div className='space-x-[3px] text-[13px]'>
                    <span>{search}</span>
                    <span className='md:hidden'>{inn} </span>
                    <span className='md:hidden'>
                        <SmallLogo style={ { fontSize: "17px" } } />
                    </span>
                </div>
            </div>
                {   isActive &&
                    <AnimatedBox className={`z-111 px-3 md:px-4 bg-white text-[#555555] flex flex-col items-stretch gap-2 md:rounded-t-[7px] flex-1 max-md:absolute max-md:w-[calc(100vw)] ${isRTL ? "max-md:-top-3 max-md:-left-22" : "max-md:-top-3 max-md:-left-3"}`}>
                        <input onChange={(e) => setBasicQuery(e.target.value)} ref={inputRef} type="text" className={`${isRTL ? "text-end" : ""} h-[43px] text-[13px] border-b-2 rounded-[7px] border-[#03a58a] md:text-[15px] p-3 max-md:mt-2 w-full outline-0 flex-1`}/>
                        <div className={`${!inputRef.current?.value ? "hidden" : "" } overflow-auto scrollbar-hide scroll-smooth flex-1 flex gap-1 text-[13px] px-3 py-4 pt-10 max-md:px-0 bg-white rounded-b-[7px] md:absolute md:top-full ${isRTL ? "justify-end md:right-0" : "md:left-0"} w-full`}>
                            {basicResults.map((product) => (
                                <ProductCard className='md:min-w-50 md:min-h-65 min-w-35 min-h-50' key={product.id} product={product} buttonBg='--theme'/>
                            ))}
                        </div>
                        <div className={`${basicResults.length ? "hidden" : "" } flex-1 flex flex-wrap text-[13px] gap-2 px-3 py-4 pt-10 max-md:px-0 bg-white rounded-b-[7px] md:absolute md:top-full ${isRTL ? "justify-end md:right-0" : "md:left-0"} w-full`}>
                            {products.filter((_,i) => 0 <= i && i <= 2).map((product) => (
                                <Link href={`/${lang}/products/${product.id}`} key={product.id} className={`rounded-full border-1 p-2 text-black border-neutral-300`}>
                                    {dict.product.products[product.label as keyof typeof dict.product.products]}
                                </Link>
                            ))}
                        </div>
                    </AnimatedBox>
                }
        </div>
        <div
            className='fixed top-0 left-0 bg-[#000000c2] md:bg-[#00000094] w-[100%] h-[100vh] z-110'
            style={{display: isActive ? "block" : "none"}}
            onClick={handleClick}
        >
        </div>
    </>
  )
}

export default SearchBar

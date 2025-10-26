"use client"
import useDataStore from '@/app/stores/dataStore'
import classNames from 'classnames'
import React, { useEffect, useRef, useState } from 'react'
import NavArrows from '../../_components/NavArrows'
import ProductCard from '../../_ProductCard/ProductCard'
import SeeAllProducts from './components/SeeAllProducts'
import { useCarousel } from '@/app/hooks/useCarousel'
import Image from 'next/image';
import { Product, Tag } from '@/app/types/types'

const ProductsSection = () => {

    const list1 = useRef<HTMLDivElement>(null!)
    const list2 = useRef<HTMLDivElement>(null!)


    const { dict, tags, isRTL } = useDataStore()

    if (!dict || !tags || tags.length === 0) {
        return <></>
    }

  return (
    <div id='productsSec' className='relative w-full py-5 flex flex-col items-center overflow-hidden after:min-w-[200vw] after:min-h-80 after:md:min-h-100 after:absolute after:bg-[var(--theme2) after:top-[50%] after:-translate-y-[50%] after:-rotate-z-0'>
        <div className="w-full max-w-350 flex flex-col text-white justify-center bg-white space-y-4 xl:rounded-2xl">
            <div className="bottom-to-top-animation flex flex-col justify-center w-full relative overflow-x-auto z-2 ">
                <h2 className={`text-black ${isRTL ? "mr-4 text-right" : "text-left ml-4"} mb-2 px-5 md:hidden font-bold text-[1.1rem] bg-neutral-100 p-2`}>Iranian Rice</h2>
                <div
                ref={list1}
                className={classNames({
                    "flex gap-1 overflow-x-auto scroll-smooth scrollbar-hide max-xl:px-4": true,
                    "flex-row-reverse": isRTL,
                    "flex-row": !(isRTL),
                })}>
                    <h2 className={`text-white border-b-5 ${isRTL ? "rounded-r-2xl" : "rounded-l-2xl"} bg-[var(--theme2)] min-w-60 hidden md:flex flex-col justify-center items-center self-stretch text-center px-10 text-[60px] font-bold`}>
                        <span className={`text-[40px]`}>Iranian</span>
                        <span className={``}>Rice</span>
                    </h2>
                    {tags[0].products.map((product: Product) => (
                        <ProductCard key={product.id} product={product} buttonBg={'--theme'}/>
                    ))}
                    {tags[3].products.map((product: Product) => (
                        <ProductCard key={product.id} product={product} buttonBg={'--theme'}/>
                    ))}
                    <SeeAllProducts arrowDirection={`${isRTL ? "toLeft" : "toRight"}`} />
                </div>
                <NavArrows list={list1}/>
            </div>
            <div className="bottom-to-top-animation flex flex-col justify-center w-full relative overflow-x-auto z-2">
                <h2 className={`text-black ${isRTL ? "mr-4 text-right md:text-left" : "text-left md:text-right ml-4"} mb-2 px-5 md:hidden font-bold text-[1.1rem] bg-neutral-100 p-2`}>{dict.otherProducts}</h2>
                <div
                ref={list2}
                className={`flex gap-1 overflow-x-auto scroll-smooth scrollbar-hide max-xl:px-4 ${!isRTL ? "md:flex-row-reverse" : "max-md:flex-row-reverse"}`}>
                    <h2 className={`text-white border-b-5 ${!isRTL ? "rounded-r-2xl" : "rounded-l-2xl"} bg-[var(--theme2)] min-w-60 hidden md:flex flex-col justify-center items-center self-stretch text-center px-10 text-[60px] font-bold`}>
                        <span className={`text-[48px]`}>Other</span>
                        <span className={`text-[30px]`}>Products</span>
                    </h2>
                    {tags.filter((_, i) => (i !== 0 && i !== 3)).map((tag: Tag) => (
                      tag.products.map((product: Product) => (
                        <ProductCard key={product.id} product={product} buttonBg={'--theme'}/>
                    ))
                    ))}
                    <SeeAllProducts arrowDirection={`${!isRTL ? "toLeft" : "toRight"}`} />
                </div>
                <NavArrows list={list2}/>
            </div>
        </div>
    </div>
  )
}

export default ProductsSection

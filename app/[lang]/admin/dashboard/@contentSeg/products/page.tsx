"use client"
import { ProductPicker } from './ProductPicker'
import { useAuthStore } from '@/app/stores/authStore'
import useDataStore from '@/app/stores/dataStore'
import { useParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { BiSolidDirections } from 'react-icons/bi'
import { SlLocationPin } from "react-icons/sl";
import { HiDotsVertical } from "react-icons/hi";
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md'
import { FaPlus } from 'react-icons/fa6'
import ProductCard from '@/app/[lang]/_ProductCard/ProductCard'
import Loading from '@/app/[lang]/_components/Loading'
import ProductInfo from './ProductInfo'
import React from 'react'
import { CategoryPicker } from './CategoryPicker'
import { FaRegEdit } from 'react-icons/fa'

const page = () => {

  const { lang } = useParams()
  const router = useRouter()
  const { dict, isRTL, products, loading, tags } = useDataStore()
  
  const handleBackAction = () => {
    router.push(`/${lang}/admin/dashboard`)
  }

  return (
    <>
      <div className={`min-h-100 max-md:absolute -top-30 max-md:top-0 max-md:min-h-full max-md:w-full bg-white flex flex-col flex-1 justify-stretch md:border-1 border-neutral-300 rounded-[10px]`}>
        <div className={`p-4 md:border-b-0 border-b-7 border-neutral-200 flex justify-between items-center ${isRTL ? "flex-row-reverse" : "flex-row"}`}>
          <p className='font-medium md:border-b-3 border-red-500 md:pb-4'>{dict.products}</p>
          {isRTL
            ? <MdArrowBackIos className='self-start md:hidden' onClick={handleBackAction} />
            : <MdArrowForwardIos className='self-start md:hidden' onClick={handleBackAction} /> }
          <span className={`items-center justify-center gap-3 hidden md:flex text-red-500`}>
            <FaPlus />
            <CategoryPicker purpose={'post'} buttonContent={`New Category`} className={`text-sm`}/>
          </span>
        </div>
        <div className={`text-[13px] max-md:p-2 p-5 flex-1 flex flex-col justify-stretch items-stretch gap-5 ${isRTL ? "text-end" : "text-start"}`}>
          { products.length === 0
          ? <div className={`space-y-2 flex max-md:justify-start max-md:mt-[10vh] flex-col items-center justify-center`}>
              <BiSolidDirections className='text-[150px] text-[var(--theme)]'/>
              <p>No Categories added</p>
              <CategoryPicker purpose={'post'} buttonContent='Add a Category' className={`p-4 border-1 border-[var(--theme)] rounded-[7px] md:text-sm text-[0.8rem] md:text-md text-[var(--theme)]`}/>
            </div>
          : tags.map((tag) => (
              <div className={`flex flex-col justify-stretch items-stretch gap-5 pb-3`} key={tag.id}>
                <span className={`text-center text-xl flex justify-stretch items-center bg-neutral-100 rounded-[10px] p-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                  <div className={`flex-1 flex items-center ${isRTL ? "text-end flex-row-reverse" : "text-start"}`}>
                    <span className='inline-block max-sm:text-[18px] pb-3 border-b-2 border-green-600'>
                      {dict.product.categories[tag.label as keyof typeof dict.product.categories]}
                    </span>
                  </div>
                  <div className={`flex items-center gap-5`}>
                    <CategoryPicker purpose={'patch'} tag={tag} buttonContent={<FaRegEdit className='text-[15px] text-red-600'/>} className={``} />
                    <ProductPicker tagId={tag.id} purpose={'post'} buttonContent={<div className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}><FaPlus className='text-green-600 text-[17px]'/>{/* <p>New Product</p> */}</div>} className={`text-green-600`}/>
                  </div>
                </span>
                {tag.products.map((product) => (
                  <div key={product.id} className={`gap-2 md:gap-3 border-b-1 border-neutral-200 flex items-stretch justify-start ${isRTL ? "flex-row-reverse" : ""}`}>
                    <ProductCard className='min-h-50 min-w-35 self-center' buttonBg='--theme' product={product}/>
                    <ProductInfo tagId={tag.id} product={product}/>
                  </div>
                ))}
              </div>
          ))}
        </div>
      </div>
      <div className={`${products.length === 0 ? 'hidden' : ""}`}>
        <span className={`fixed bottom-20 left-[4vw] items-center justify-center gap-3 md:hidden flex text-white bg-[var(--theme)] rounded-full p-4`}>
          { loading
            ? <Loading className=''/>
            : (
                <>
                  <FaPlus className='text-white'/>
                  <CategoryPicker purpose={'post'} buttonContent={`New Category`} className={``}/>
                </>
              )
          }
        </span>
      </div>
    </>
  )
}

export default page

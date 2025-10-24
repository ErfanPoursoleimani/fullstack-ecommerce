'use client'
import useDataStore from '@/app/stores/dataStore'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import React from 'react'
import { FaStar } from 'react-icons/fa6'
import { IoShareSocialOutline } from "react-icons/io5"
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md'
import ProductCard from '../../_ProductCard/ProductCard'
import CartButton from '../../_ProductCard/components/CartButton'

const PhoneView = () => {

    const { id } = useParams()
    const { products, dict, tags, isRTL } = useDataStore()

    const product = products.filter((product) => product.id === parseInt(id as string))[0]
    const currency = dict.product.currency
    const massUnit = dict.product.massUnit
    const { priceFa, description, label, stock } = product

  return (
    <div className='md:hidden w-full relative top-[103px]'>
      
      <div className={`w-full sticky top-[103px] -z-2 flex items-center overflow-x-auto scrollbar-hide scroll-smooth`}>
        {product.images.map((image) => (
          <div key={image.id} className='min-w-full bg-neutral-100 min-h-full flex justify-center'>
            <img className='' key={image.id} src={image.url} width={200} height={200} alt='product image'/>
          </div>
        ))}
      </div>
      <div 
        className={`
          w-full bg-neutral-100 flex flex-col gap-1
          ${isRTL ? "text-end" : "text-start"}`}
      >
        <div className='bg-white rounded-t-3xl flex flex-col gap-5 p-5'>
          <div className={`flex justify-between ${isRTL ? 'flex-row-reverse' : "flex-row"}`}>
            <p className={`text-neutral-400 underline underline-offset-3 text-[13px] flex gap-[2px] items-center`}>
              {/* <span className={`text-[11px]`}>{isRTL ? <MdArrowBackIos/> : <MdArrowForwardIos/>}</span> */}
              {dict.product.categories[tags.find((tag) => tag.id === product.tagId)?.label as keyof typeof dict.product.categories]}
            </p>
            <span className='text-[20px]'><IoShareSocialOutline /></span>
          </div>
          <h1 className={`font-medium text-2xl`}>{dict.product.products[product.label as keyof typeof dict.product.products]}</h1>
          <div className={`flex items-center gap-3`}>
            <span className={`flex gap-1`}>
              <FaStar className='text-yellow-400'/>
              <p className={`text-[13px]`}>
                {product.reviews && product.reviews.length === 0
                 ? "No Reviews"
                 : product.reviews.reduce((sum, review) => review.rating, 0) / product.reviews.length
                }
                <span>{product.reviews.length === 0 ? null : product.reviews.length}</span>
              </p>
            </span>
            { product.reviews.length === 0 
            ? null 
            : <span className={`py-1 px-2 rounded-full flex items-center gap-1 bg-neutral-100`}>
                <span className={`flex items-end gap-[2px] text-[12px]`}>
                  <p>{product.reviews.length}</p>
                  <p>reviews</p>
                </span>
                <span className={`text-[11px]`}>{isRTL ? <MdArrowBackIos/> : <MdArrowForwardIos/>}</span>
              </span>
            }
          </div>
        </div>
        <div className={`bg-white p-5 space-y-4`}>
          <h2 className={`font-medium text-[17]`}>About Product</h2>
          <p className='text-[13px] text-neutral-800 px-3'>{product.description}</p>
        </div>
        <div className={`bg-white p-5 space-y-4 flex flex-col`}>
          <h2 className={`font-medium text-[17]`}>Reviews</h2>
          {product.reviews.length === 0
           ?  <p className='self-center mb-4 text-[15px] text-neutral-400'>no reviews yet</p>
           :  <span className={`flex gap-1`}>
                <p className={`text-[15px]`}>
                  {product.reviews.reduce((sum, review) => review.rating, 0) / product.reviews.length}
                  <span>{product.reviews.length === 0 ? null : product.reviews.length}</span>
                </p>
                <FaStar className='text-yellow-400 text-[21px]'/>
              </span>
          }
        </div>
        <div className={`bg-white p-5 space-y-4 flex flex-col`}>
          <h2 className={`font-medium text-[17]`}>Similar Products</h2>
          <div className={`${isRTL ? "flex-row-reverse" : ""} flex gap-1 overflow-x-auto scrollbar-hide scroll-smooth`}>

              {tags.find((tag) => tag.id === product.tagId)!.products.filter((p) => p.id !== product.id).length === 0
              ?  <p className='self-center mb-4 text-[15px] text-neutral-400'>No similar products exist</p>
              : tags.find((tag) => tag.id === product.tagId)!.products.filter((p) => p.id !== product.id).map((product) => (
                  <ProductCard buttonBg='--theme' key={product.id} product={product}/>
                ))
              }
          </div>
        </div>
        <div className={`bg-white p-5 space-y-4 flex flex-col mb-13 overflow-hidden`}>
          <h2 className={`font-medium text-[17]`}>Recommendation</h2>
          <div className={`${isRTL ? "flex-row-reverse" : ""} flex gap-1 overflow-x-auto scrollbar-hide scroll-smooth`}>
            {tags.filter((tag) => tag.id !== product.tagId).map((tag) => (
              <React.Fragment key={tag.id}>
                {tag.products.filter((p) => p.id !== product.id).map((product) => (
                  <ProductCard buttonBg='--theme' key={product.id} product={product}/>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
      <div className={`fixed w-full bottom-0 flex flex-row-reverse items-center justify-between bg-white gap-5 px-5 py-4 ${isRTL ? "flex-row" : ""}`}>
        <div
          className={`flex justify-stretch w-30
            ${ isRTL ? "items-end" : "items-start" }
            `}
        >
          {!product.stock
            ? <p 
                className={`
                  select-none flex justify-center items-center rounded-[7px] text-[15px]
                  bg-[var(--theme2)]  text-white w-full py-3
                `}
              > 
                Out of stock
              </p>
            : <CartButton className={"flex-1 border-1 border-neutral-200"} product={product} buttonBg={'--theme'}/>
          }
        </div>
        <div className={`flex flex-col ${isRTL ? "items-end" : ""}`}>
          <div
            className={` 
              flex justify-center items-center text-[var(--theme)] text-[13px]
              ${isRTL ? "justify-end flex-row-reverse" : "justify-start"}
              `}
              >
            <h2>{product.originalPriceFa - product.priceFa}</h2>
            <div className={`
              flex justify-center md:text-[11px] text-[10px] gap-[2px]
              ${isRTL ? 'items-start flex-row-reverse' : 'items-end'}
            `}
            >
              <span>{currency} </span>
              <span>discount</span>
            </div>
          </div>
          <div
            className={` 
              flex justify-center items-center
              ${isRTL ? "justify-end flex-row-reverse" : "justify-start"}
              `}
              >
            <h2>{product.priceFa}</h2>
            <div className={`
              flex justify-center md:text-[11px] text-[9px] gap-[5px]
              ${isRTL ? 'items-start flex-row-reverse' : 'items-end'}
            `}
            >
              <span>{currency} </span>
              <span>/</span>
              <span>{massUnit}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PhoneView

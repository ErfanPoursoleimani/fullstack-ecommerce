'use client'
import { usePopup } from '@/app/hooks/usePopup'
import React, { ReactNode, useState } from 'react'
import Popup from '@/app/[lang]/_components/PopupRaw'
import useDataStore from '@/stores/dataStore'
import { z } from 'zod'
import { imageSchema, productSchema } from '@/validation/validationSchemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import { useAuthStore } from '@/stores/authStore'
import Loading from '@/app/[lang]/_components/Loading'
import { Product } from '@/types/types'

type productData = z.infer<typeof productSchema>

export const ProductPicker = ({purpose, product, tagId, className, buttonContent}: { purpose: string, tagId: number, product?: Product, className: string, buttonContent: ReactNode}) => {
  const popup = usePopup()
  const { lang } = useParams()
  const { isRTL, fetchProducts, loading, dict } = useDataStore()

  const {register, handleSubmit, control, formState: { errors, isSubmitted }, reset} = useForm<productData>({
      resolver: zodResolver(productSchema)
  })

  const onSubmit = handleSubmit( async (data) => {
    const productData = {label: data.label, originalPriceFa: data.originalPriceFa, priceFa: data.priceFa, stock: data.stock, description: data.description,}
    const imageData = {url: data.url}
    try {
      if(purpose === 'post' ){
        const { data: receivedData } = await axios.post(`/${lang}/api/products`, {...productData, label: productData.label.replaceAll(" ", "_"), tagId}) 
        await axios.post(`/${lang}/api/images`, {...imageData, productId: receivedData.id})
      }
      else if(purpose === "patch") {
        await axios.patch(`/${lang}/api/products/${product?.id}`, {...productData, label: productData.label.replaceAll(" ", "_"), tagId}) 
        await axios.patch(`/${lang}/api/images/${product?.images[0].id}`, {...imageData, productId: product?.id}) 
      }

      await fetchProducts(lang as string)
      popup.closePopup()
    } catch (error) {
      console.log(error)
    } finally {
      reset()
    }
  })

  return (
    <>
      <button
      disabled={loading}
      className={`${className}`}
      onClick={() => popup.openPopup({ title: 'Add new product', variant: 'default' })}
      >
        
        { loading
          ? <Loading className={`text-white`} />
          : buttonContent
        }
      </button>
      <Popup popup={popup} className={`top-0 left-0 z-103 text-neutral-800`}>
        <form onSubmit={onSubmit}>
          <div className={`flex flex-col gap-5 md:text-sm text-[0.8rem] mb-25`}>
            <div className='flex flex-col items-stretch flex-1 space-y-3'>
              <p className={`px-1 flex gap-1 ${isRTL ? "flex-row-reverse" : ""} ${isRTL ? 'self-end' : "self-start"}`}><span>Label</span> <span className='text-red-600'>*</span></p>
              <div>
                <input {...register('label')} defaultValue={purpose === "patch" ? `${product?.label.replaceAll("_", " ")}` : ""} className={`w-full md:border-1 max-md:focus:border-b-3 max-md:focus:border-[var(--theme)] outline-0 border-neutral-300 focus:border-[var(--theme)] rounded-[7px] max-md:bg-neutral-200 h-12 p-3 appearance-none ${isRTL ? "text-end" : ""}`} type="text" />
                <p className='text-red-600 px-1 text-[12px] mt-2'>{errors.label?.message}</p>
              </div>
            </div>
            <div className={`flex justify-stretch items-center gap-5`}>
              <span className={`flex flex-col items-stretch flex-1 space-y-3`}>
                <p className={`px-1 flex gap-1 ${isRTL ? "flex-row-reverse" : ""} ${isRTL ? 'self-end' : "self-start"}`}><span>Primary Price</span> <span className='text-red-600'>*</span></p>
                <div>
                  <input {...register('originalPriceFa', {valueAsNumber: true})} defaultValue={purpose === "patch" ? product?.originalPriceFa : null!} className={`w-full md:border-1 max-md:focus:border-b-3 max-md:focus:border-[var(--theme)] outline-0 border-neutral-300 focus:border-[var(--theme)] rounded-[7px] max-md:bg-neutral-200 h-12 p-3 appearance-none ${isRTL ? "text-end" : ""}`} type="number" />
                  <p className='text-red-600 px-1 text-[12px] mt-2'>{errors.originalPriceFa?.message}</p>
                </div>
              </span>
              <span className={`flex flex-col items-stretch flex-1 space-y-3`}>
                <p className={`px-1 flex gap-1 ${isRTL ? "flex-row-reverse" : ""} ${isRTL ? 'self-end' : "self-start"}`}><span>After Discount</span> <span className='text-red-600'>*</span></p>
                <div>
                  <input {...register('priceFa', {valueAsNumber: true})} defaultValue={purpose === "patch" ? product?.priceFa : null!} className={`w-full md:border-1 max-md:focus:border-b-3 max-md:focus:border-[var(--theme)] outline-0 border-neutral-300 focus:border-[var(--theme)] rounded-[7px] max-md:bg-neutral-200 h-12 p-3 appearance-none ${isRTL ? "text-end" : ""}`} type="number" />
                  <p className='text-red-600 px-1 text-[12px] mt-2'>{errors.priceFa?.message}</p>
                </div>
              </span>
            </div>
            <div className='flex flex-col items-stretch flex-1 space-y-3'>
              <p className={`px-1 flex gap-1 ${isRTL ? "flex-row-reverse" : ""} ${isRTL ? 'self-end' : "self-start"}`}><span>Description</span> <span className='text-red-600'>*</span></p>
              <div>
                <input {...register('description')} defaultValue={purpose === "patch" ? `${product?.description}` : ""} className={`w-full md:border-1 max-md:focus:border-b-3 max-md:focus:border-[var(--theme)] outline-0 border-neutral-300 focus:border-[var(--theme)] rounded-[7px] max-md:bg-neutral-200 h-12 p-3 appearance-none ${isRTL ? "text-end" : ""}`} type="text" />
                <p className='text-red-600 px-1 text-[12px] mt-2'>{errors.description?.message}</p>
              </div>
            </div>
            <div className='flex flex-col items-stretch flex-1 space-y-3'>
              <p className={`px-1 flex gap-1 ${isRTL ? "flex-row-reverse" : ""} ${isRTL ? 'self-end' : "self-start"}`}><span>In Stock</span> <span className='text-red-600'>*</span></p>
              <div>
                <input {...register('stock', {valueAsNumber: true})} defaultValue={purpose === "patch" ? product?.stock : null!} className={`w-full md:border-1 max-md:focus:border-b-3 max-md:focus:border-[var(--theme)] outline-0 border-neutral-300 focus:border-[var(--theme)] rounded-[7px] max-md:bg-neutral-200 h-12 p-3 appearance-none ${isRTL ? "text-end" : ""}`} type="number" />
                <p className='text-red-600 px-1 text-[12px] mt-2'>{errors.stock?.message}</p>
              </div>
            </div>
            <div className='flex flex-col items-stretch flex-1 space-y-3'>
              <p className={`px-1 flex gap-1 ${isRTL ? "flex-row-reverse" : ""} ${isRTL ? 'self-end' : "self-start"}`}><span>Image URL</span> <span className='text-red-600'>*</span></p>
              <div>
                <input {...register('url')} defaultValue={purpose === "patch" ? `${product?.images[0].url}` : ""} className={`w-full md:border-1 max-md:focus:border-b-3 max-md:focus:border-[var(--theme)] outline-0 border-neutral-300 focus:border-[var(--theme)] rounded-[7px] max-md:bg-neutral-200 h-12 p-3 appearance-none ${isRTL ? "" : ""}`} type="text" />
                <p className='text-red-600 px-1 text-[12px] mt-2'>{errors.url?.message}</p>
              </div>
            </div>
          </div>
          <div className={`absolute bg-white bottom-0 max-md:bottom-14 left-0 w-full border-t-1 p-4 border-neutral-300 z-103`}>
            <button disabled={isSubmitted} className={`bg-[var(--theme)] p-3 w-full rounded-[7px] text-white text-[1rem]`}>
              Confirm and continue
            </button>
          </div>
        </form>
      </Popup>
    </>
  )
}
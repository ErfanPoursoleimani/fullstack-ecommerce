'use client'
import { usePopup } from '@/app/hooks/usePopup'
import React, { ReactNode, useState } from 'react'
import Popup from '@/app/[lang]/_components/PopupRaw'
import useDataStore from '@/app/stores/dataStore'
import { z } from 'zod'
import { tagImageSchema, tagSchema } from '@/app/validation/validationSchemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import { useAuthStore } from '@/app/stores/authStore'
import Loading from '@/app/[lang]/_components/Loading'
import { Tag } from '@/app/types/types'

type tagData = z.infer<typeof tagSchema>

export const CategoryPicker = ({purpose, tag, className, buttonContent}: { purpose: string, tag?: Tag, className: string, buttonContent: ReactNode}) => {
  const popup = usePopup()
  const router = useRouter()
  const { lang } = useParams()
  const { isRTL, fetchProducts, loading, dict } = useDataStore()
  const { userId } = useAuthStore()

  const {register, handleSubmit, control, formState: { errors, isSubmitted }, reset} = useForm<tagData>({
      resolver: zodResolver(tagSchema)
  })

  const onSubmit = handleSubmit( async (data) => {
    const tagData = {label: data.label}
    const imageData = {url: data.url}
    try {
      if(purpose === 'post' ){
        const { data: receivedData } = await axios.post(`/${lang}/api/tags`, {...tagData, label: tagData.label.trim().replaceAll(" ", "_")}) 
        await axios.post(`/${lang}/api/tagImages`, {...imageData, tagId: receivedData.id})
      }
      else if(purpose === "patch"){
        await axios.patch(`/${lang}/api/tags/${tag?.id}`, {...tagData, label: tagData.label.trim().replaceAll(" ", "_")})
        await axios.patch(`/${lang}/api/tagImages/${tag?.images[0].id}`, {...imageData, tagId: tag?.id}) 
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
      onClick={() => popup.openPopup({ title: 'Add New Category', variant: 'default' })}
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
              <p className={`px-1 ${isRTL ? 'self-end' : "self-start"}`}><span>Label</span> <span className='text-red-600'>*</span></p>
              <div>
                <input {...register('label')} defaultValue={purpose === "patch" ? `${tag?.label.replaceAll("_", " ")}` : ""} className={`w-full md:border-1 max-md:focus:border-b-3 max-md:focus:border-[var(--theme)] outline-0 border-neutral-300 ${isRTL ? "text-end" : ""} focus:border-[var(--theme)] rounded-[7px] max-md:bg-neutral-200 h-12 p-3`} type="text" />
                <p className='text-red-600 px-1 text-[12px] mt-2'>{errors.label?.message}</p>
              </div>
            </div>
            <div className='flex flex-col items-stretch flex-1 space-y-3'>
              <p className={`px-1 ${isRTL ? 'self-end' : "self-start"}`}><span>Image URL</span> <span className='text-red-600'>*</span></p>
              <div>
                <input {...register('url')} defaultValue={purpose === "patch" ? `${tag?.images[0].url}` : ""} className={`w-full md:border-1 max-md:focus:border-b-3 max-md:focus:border-[var(--theme)] outline-0 border-neutral-300 ${isRTL ? "" : ""} focus:border-[var(--theme)] rounded-[7px] max-md:bg-neutral-200 h-12 p-3`} type="text" />
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
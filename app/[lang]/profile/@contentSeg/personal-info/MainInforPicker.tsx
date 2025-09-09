'use client'
import { usePopup } from '@/app/hooks/usePopup'
import React, { ReactNode, useState } from 'react'
import Popup from '@/app/[lang]/_components/PopupRaw'
import useDataStore from '@/app/stores/dataStore'
import { z } from 'zod'
import { addressSchema, userSchema } from '@/app/validation/validationSchemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import { useAuthStore } from '@/app/stores/authStore'
import Loading from '@/app/[lang]/_components/Loading'

type userData = z.infer<typeof userSchema>

export const MainInfoPicker = ({className, buttonContent}: {className: string, buttonContent: ReactNode}) => {
  const popup = usePopup()
  const { lang } = useParams()
  const { isRTL, loading, dict } = useDataStore()
  const { userId, user, initialize, setUser } = useAuthStore() // Make sure setUser is available
  const router = useRouter()

  const {register, handleSubmit, control, formState: { errors, isSubmitted }, reset} = useForm<userData>({
      // resolver: zodResolver(userSchema)
  })

  const onSubmit = handleSubmit( async (data) => {
    try {
      const response = await axios.patch(`/${lang}/api/users/${userId}`, {
        ...data, 
        email: user?.email, 
        phoneNumber: user?.phoneNumber
      }, {
        headers: {
          'Cache-Control': 'no-cache',
        }
      })
      if (initialize) {
        await initialize(lang as string)
      }
      router.refresh()
      popup.closePopup()
      reset()
      
    } catch (error) {
      console.log(error)
    }
  })

  return (
    <>
      <button
      disabled={loading}
      className={`${className}`}
      onClick={() => popup.openPopup({ title: 'Edit personal info', variant: 'default' })}>
        
        { loading
          ? <Loading className={`text-white`} />
          : buttonContent
        }
      </button>
      <Popup popup={popup} className={`top-0 left-0 z-103 text-neutral-800`}>
        <form onSubmit={onSubmit}>
          <div className={`flex flex-col gap-5 md:text-sm text-[0.8rem] mb-15 max-md:mb-35`}>
            <div className={`flex justify-stretch items-center gap-5 max-sm:justify-center max-sm:items-stretch`}>
              <span className={`flex flex-col items-stretch flex-1 space-y-3`}>
                <p className={`px-1 flex gap-1 ${isRTL ? 'self-end flex-row-reverse' : "self-start"}`}><span>{dict.firstName}</span> <span className='text-red-600'>*</span></p>
                <div>
                  <input {...register('firstName')} defaultValue={user?.firstName!} className={`w-full md:border-1 max-md:focus:border-b-3 max-md:focus:border-[var(--theme)] outline-0 border-neutral-300 focus:border-[var(--theme)] rounded-[7px] max-md:bg-neutral-200 h-12 p-3`} type="search" />
                  <p className='text-red-600 px-1 text-[12px] mt-2'>{errors.firstName?.message}</p>
                </div>
              </span>
              <span className={`flex flex-col items-stretch flex-1 space-y-3`}>
                <p className={`px-1 flex gap-1 ${isRTL ? 'self-end flex-row-reverse' : "self-start"}`}><span>{dict.lastName}</span> <span className='text-red-600'>*</span></p>
                <div>
                  <input {...register('lastName')} defaultValue={user?.lastName!} className={`w-full md:border-1 max-md:focus:border-b-3 max-md:focus:border-[var(--theme)] outline-0 border-neutral-300 focus:border-[var(--theme)] rounded-[7px] max-md:bg-neutral-200 h-12 p-3`} type="search" />
                  <p className='text-red-600 px-1 text-[12px] mt-2'>{errors.lastName?.message}</p>
                </div>
              </span>
            </div>
            <div className='flex flex-col items-stretch flex-1 space-y-3'>
              <p className={`px-1 flex gap-1 ${isRTL ? 'self-end flex-row-reverse' : "self-start"}`}><span>{dict.nationalCode}</span> <span className='text-red-600'>*</span></p>
              <div>
                <input {...register('nationalCode')} defaultValue={user?.nationalCode!} className={`w-full md:border-1 max-md:focus:border-b-3 max-md:focus:border-[var(--theme)] outline-0 border-neutral-300 focus:border-[var(--theme)] rounded-[7px] max-md:bg-neutral-200 h-12 p-3`} type="search" />
                <p className='text-red-600 px-1 text-[12px] mt-2'>{errors.nationalCode?.message}</p>
              </div>
            </div>
          </div>
          <div className={`max-md:fixed bg-white bottom-11 md:bottom-0 left-0 w-full border-t-1 p-4 border-neutral-300 z-103`}>
            <button disabled={isSubmitted} className={`bg-[var(--theme)] p-3 w-full rounded-[7px] text-white text-[1rem]`}>
              Confirm
            </button>
          </div>
        </form>
      </Popup>
    </>
  )
}
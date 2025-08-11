'use client'
import { usePopup } from '@/app/hooks/usePopup'
import React, { ReactNode, useState } from 'react'
import Popup from '@/app/[lang]/_components/PopupRaw'
import useDataStore from '@/stores/dataStore'
import { z } from 'zod'
import { addressSchema, userSchema } from '@/validation/validationSchemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import { useAuthStore } from '@/stores/authStore'
import Loading from '@/app/[lang]/_components/Loading'

type userData = z.infer<typeof userSchema>

export const EmailPicker = ({className, buttonContent}: {className: string, buttonContent: ReactNode}) => {
  const popup = usePopup()
  const { lang } = useParams()
  const { isRTL, loading } = useDataStore()
  const { userId, user, initialize } = useAuthStore()
  const router = useRouter()

  const {register, handleSubmit, control, formState: { errors, isSubmitted }, reset} = useForm<userData>({
    //   resolver: zodResolver(userSchema)
  })

  const onSubmit = handleSubmit( async (data) => {
    try {
      await axios.patch(`/${lang}/api/users/${userId}`, {firstName: user?.firstName, lastName: user?.lastName, phoneNumber: user?.phoneNumber, nationalCode: user?.nationalCode, email: data.email})
      popup.closePopup()
      reset()
    } catch (error) {
        console.log(error)
    } finally {
    }
  })



  return (
    <>
      <button
      disabled={loading}
      className={`${className}`}
      onClick={() => popup.openPopup({ title: 'Edit personal info', variant: 'default' })}
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
              <p className={`px-1 ${isRTL ? 'self-end' : "self-start"}`}>Email</p>
              <div>
                <input {...register('email')} defaultValue={user?.email!} className={`w-full md:border-1 max-md:focus:border-b-3 max-md:focus:border-[var(--theme)] outline-0 border-neutral-300 focus:border-[var(--theme)] rounded-[7px] max-md:bg-neutral-200 h-12 p-3`} type="search" />
                <p className='text-red-600 px-1 text-[12px] mt-2'>{errors.email?.message}</p>
              </div>
            </div>
          </div>
          <div className={`absolute bg-white bottom-14 md:bottom-0 left-0 w-full border-t-1 p-4 border-neutral-300 z-103`}>
            <button disabled={isSubmitted} className={`bg-[var(--theme)] p-3 w-full rounded-[7px] text-white text-[1rem]`}>
              Confirm
            </button>
          </div>
        </form>
      </Popup>
    </>
  )
}
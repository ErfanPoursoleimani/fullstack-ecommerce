'use client'
import { usePopup } from '@/app/hooks/usePopup'
import { useAuthStore } from '@/stores/authStore'
import useDataStore from '@/stores/dataStore'
import { Address } from '@/types/types'
import { addressSchema } from '@/validation/validationSchemas'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import { ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import Popup from './PopupRaw'

type addressData = z.infer<typeof addressSchema>

export const AddressPicker = ({purpose, addressId, className, buttonContent, address}: { purpose: string, addressId?: string, className: string, buttonContent: ReactNode, address?: Address}) => {
  const popup = usePopup()
  const { lang } = useParams()
  const { isRTL, fetchAddresses, loading } = useDataStore()
  const { userId } = useAuthStore()
  const router = useRouter()

  const {register, handleSubmit, control, formState: { errors, isSubmitted }, reset} = useForm<addressData>({
      resolver: zodResolver(addressSchema),
      mode: 'onSubmit'
  })

  const onSubmit = handleSubmit( async (data) => {
    try {
      let dataWithUserId
      if(userId){
        dataWithUserId = {...data, userId}
      }
      purpose === 'post' ? await axios.post(`/${lang}/api/addresses`, dataWithUserId) : purpose === "patch" ? await axios.patch(`/${lang}/api/addresses/${addressId}`, dataWithUserId) : null
      await fetchAddresses(lang as string, userId)
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
      onClick={() => popup.openPopup({ title: purpose === "post" ? 'Add new Address' : 'Edit Address' , variant: 'default' })}
      >
        {buttonContent}
      </button>
      <Popup popup={popup} className={`top-0 left-0 z-103 text-neutral-800`}>
        <form onSubmit={onSubmit}>
          <div className={`flex flex-col gap-5 md:text-sm text-[0.8rem] mb-25`}>
            <div className={`flex justify-stretch items-center gap-5 max-sm:flex-col max-sm:justify-center max-sm:items-stretch`}>
              <span className={`flex flex-col items-stretch flex-1 space-y-3`}>
                <p className={`px-1 flex gap-1 ${isRTL ? 'self-end flex-row-reverse' : "self-start"}`}><span>Province</span> <span className='text-red-600'>*</span></p>
                <div>
                  <input {...register('province')} defaultValue={purpose === "patch" ? address?.province : ""} className={`w-full md:border-1 max-md:focus:border-b-3 max-md:focus:border-[var(--theme)] outline-0 border-neutral-300 focus:border-[var(--theme)] rounded-[7px] max-md:bg-neutral-200 h-12 p-3`} type="search" />
                  <p className='text-red-600 px-1 text-[12px] mt-2'>{errors.province?.message}</p>
                </div>
              </span>
              <span className={`flex flex-col items-stretch flex-1 space-y-3`}>
                <p className={`px-1 flex gap-1 ${isRTL ? 'self-end flex-row-reverse' : "self-start"}`}><span>City</span> <span className='text-red-600'>*</span></p>
                <div>
                  <input {...register('city')} defaultValue={purpose === "patch" ? address?.city : ""} className={`w-full md:border-1 max-md:focus:border-b-3 max-md:focus:border-[var(--theme)] outline-0 border-neutral-300 focus:border-[var(--theme)] rounded-[7px] max-md:bg-neutral-200 h-12 p-3`} type="search" />
                  <p className='text-red-600 px-1 text-[12px] mt-2'>{errors.city?.message}</p>
                </div>
              </span>
            </div>
            <div className='flex flex-col items-stretch flex-1 space-y-3'>
              <p className={`px-1 flex gap-1 ${isRTL ? 'self-end flex-row-reverse' : "self-start"}`}><span>Address</span> <span className='text-red-600'>*</span></p>
              <div>
                <input {...register('address')} defaultValue={purpose === "patch" ? address?.address : ""} className={`w-full md:border-1 max-md:focus:border-b-3 max-md:focus:border-[var(--theme)] outline-0 border-neutral-300 focus:border-[var(--theme)] rounded-[7px] max-md:bg-neutral-200 h-12 p-3`} type="search" />
                <p className='text-red-600 px-1 text-[12px] mt-2'>{errors.address?.message}</p>
              </div>
            </div>
            <div className={`flex justify-stretch items-center gap-5`}>
              <span className={`flex flex-col items-stretch flex-1 space-y-3`}>
                <p className={`px-1 flex gap-1 ${isRTL ? 'self-end flex-row-reverse' : "self-start"}`}><span>Plaque</span> <span className='text-red-600'>*</span></p>
                <div>
                  <input {...register('plaque')} defaultValue={purpose === "patch" ? address?.plaque : ""} className={`w-full md:border-1 max-md:focus:border-b-3 max-md:focus:border-[var(--theme)] outline-0 border-neutral-300 focus:border-[var(--theme)] rounded-[7px] max-md:bg-neutral-200 h-12 p-3`} type="search" />
                  <p className='text-red-600 px-1 text-[12px] mt-2'>{errors.plaque?.message}</p>
                </div>
              </span>
              <span className={`flex flex-col items-stretch flex-1 space-y-3`}>
                <p className={`px-1 ${isRTL ? 'self-end' : "self-start"}`}>Unit</p>
                <div>
                  <input {...register('unit')} defaultValue={purpose === "patch" ? address?.unit as string : ""} className={`w-full md:border-1 max-md:focus:border-b-3 max-md:focus:border-[var(--theme)] outline-0 border-neutral-300 focus:border-[var(--theme)] rounded-[7px] max-md:bg-neutral-200 h-12 p-3`} type="search" />
                  <p className='text-red-600 px-1 text-[12px] mt-2'>{errors.unit?.message}</p>
                </div>
              </span>
            </div>
            <div className='flex flex-col items-stretch flex-1 space-y-3'>
              <p className={`px-1 flex gap-1 ${isRTL ? 'self-end flex-row-reverse' : "self-start"}`}><span>Postal Code</span> <span className='text-red-600'>*</span></p>
              <div>
                <input {...register('postalCode')} defaultValue={purpose === "patch" ? address?.postalCode : ""} className={`w-full md:border-1 max-md:focus:border-b-3 max-md:focus:border-[var(--theme)] outline-0 border-neutral-300 focus:border-[var(--theme)] rounded-[7px] max-md:bg-neutral-200 h-12 p-3`} type="search" />
                <p className='text-red-600 px-1 text-[12px] mt-2'>{errors.postalCode?.message}</p>
              </div>
            </div>
          </div>
          <div className={`absolute bg-white bottom-0 left-0 w-full border-t-1 p-4 border-neutral-300 z-103`}>
            <button disabled={isSubmitted} className={`bg-[var(--theme)] p-3 w-full rounded-[7px] text-white text-[1rem]`}>
              Confirm and continue
            </button>
          </div>
        </form>
      </Popup>
    </>
  )
}
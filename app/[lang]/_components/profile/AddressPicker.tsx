'use client'
import { usePopup } from '@/app/hooks/usePopup'
import { useAuthStore } from '@/app/stores/authStore'
import useDataStore from '@/app/stores/dataStore'
import { Address } from '@/app/types/types'
import { addressSchema } from '@/lib/validation/validationSchemas'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import { ReactNode, useState } from 'react'
import { useForm } from 'react-hook-form'
import { discriminatedUnion, z } from 'zod'
import Popup from '../general/PopupRaw'

type addressData = z.infer<typeof addressSchema>

export const AddressPicker = ({purpose, addressId, className, buttonContent, address}: { purpose: "post" | "patch", addressId?: string, className: string, buttonContent: ReactNode, address?: Address}) => {
  const popup = usePopup()
  const { lang } = useParams()
  const { isRTL, addresses, fetchAddresses, loading, dict } = useDataStore()
  const { userId } = useAuthStore()
  const [addedAddress, setAddedAddress] = useState<Address>(null!)

  const {register, handleSubmit, control, formState: { errors, isSubmitted }, reset} = useForm<addressData>({
      resolver: zodResolver(addressSchema),
      mode: 'onSubmit'
  })

  const onSubmit = handleSubmit( async (data) => {
    try {
      let dataWithUserId
      if(userId){
        dataWithUserId = {...data, userId, isActive: true}
      }
      for (let i = 0; i < addresses.length; i++) {
          await axios.patch(`/${lang}/api/addresses/${addresses[i].id}`, {...addresses[i], isActive: false})
      }
      if(purpose === 'post') {
        const { data }: { data: Address} = await axios.post(`/${lang}/api/addresses`, dataWithUserId)
        setAddedAddress(data)
      } else {
        await axios.patch(`/${lang}/api/addresses/${addressId}`, dataWithUserId)
      }
      
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
      <Popup popup={popup} className={`top-0 left-0 z-110 text-neutral-800`}>
        <form onSubmit={onSubmit}>
          <div className={`flex flex-col gap-5 md:text-sm text-[0.8rem] mb-10 max-md:mb-25`}>
            <div className={`flex justify-stretch items-center gap-5 max-sm:flex-col max-sm:justify-center max-sm:items-stretch`}>
              <span className={`flex flex-col items-stretch flex-1 space-y-3`}>
                <p className={`px-1 flex gap-1 ${isRTL ? 'self-end flex-row-reverse' : "self-start"}`}><span>{dict.province}</span> <span className='text-red-600'>*</span></p>
                <div>
                  <input {...register('province')} defaultValue={purpose === "patch" ? address?.province : ""} className={`w-full md:border-1 max-md:focus:border-b-3 max-md:focus:border-[var(--theme)] outline-0 border-neutral-300 focus:border-[var(--theme)] rounded-[7px] max-md:bg-neutral-200 h-12 p-3`} type="search" />
                  <p className='text-red-600 px-1 text-[12px] mt-2'>{errors.province?.message}</p>
                </div>
              </span>
              <span className={`flex flex-col items-stretch flex-1 space-y-3`}>
                <p className={`px-1 flex gap-1 ${isRTL ? 'self-end flex-row-reverse' : "self-start"}`}><span>{dict.city}</span> <span className='text-red-600'>*</span></p>
                <div>
                  <input {...register('city')} defaultValue={purpose === "patch" ? address?.city : ""} className={`w-full md:border-1 max-md:focus:border-b-3 max-md:focus:border-[var(--theme)] outline-0 border-neutral-300 focus:border-[var(--theme)] rounded-[7px] max-md:bg-neutral-200 h-12 p-3`} type="search" />
                  <p className='text-red-600 px-1 text-[12px] mt-2'>{errors.city?.message}</p>
                </div>
              </span>
            </div>
            <div className='flex flex-col items-stretch flex-1 space-y-3'>
              <p className={`px-1 flex gap-1 ${isRTL ? 'self-end flex-row-reverse' : "self-start"}`}><span>{dict.address}</span> <span className='text-red-600'>*</span></p>
              <div>
                <input {...register('address')} defaultValue={purpose === "patch" ? address?.address : ""} className={`w-full md:border-1 max-md:focus:border-b-3 max-md:focus:border-[var(--theme)] outline-0 border-neutral-300 focus:border-[var(--theme)] rounded-[7px] max-md:bg-neutral-200 h-12 p-3`} type="search" />
                <p className='text-red-600 px-1 text-[12px] mt-2'>{errors.address?.message}</p>
              </div>
            </div>
            <div className={`flex justify-stretch items-center gap-5`}>
              <span className={`flex flex-col items-stretch flex-1 space-y-3`}>
                <p className={`px-1 flex gap-1 ${isRTL ? 'self-end flex-row-reverse' : "self-start"}`}><span>{dict.plate}</span> <span className='text-red-600'>*</span></p>
                <div>
                  <input {...register('plaque')} defaultValue={purpose === "patch" ? address?.plaque : ""} className={`w-full md:border-1 max-md:focus:border-b-3 max-md:focus:border-[var(--theme)] outline-0 border-neutral-300 focus:border-[var(--theme)] rounded-[7px] max-md:bg-neutral-200 h-12 p-3`} type="search" />
                  <p className='text-red-600 px-1 text-[12px] mt-2'>{errors.plaque?.message}</p>
                </div>
              </span>
              <span className={`flex flex-col items-stretch flex-1 space-y-3`}>
                <p className={`px-1 ${isRTL ? 'self-end' : "self-start"}`}>{dict.unit}</p>
                <div>
                  <input {...register('unit')} defaultValue={purpose === "patch" ? address?.unit as string : ""} className={`w-full md:border-1 max-md:focus:border-b-3 max-md:focus:border-[var(--theme)] outline-0 border-neutral-300 focus:border-[var(--theme)] rounded-[7px] max-md:bg-neutral-200 h-12 p-3`} type="search" />
                  <p className='text-red-600 px-1 text-[12px] mt-2'>{errors.unit?.message}</p>
                </div>
              </span>
            </div>
            <div className='flex flex-col items-stretch flex-1 space-y-3'>
              <p className={`px-1 flex gap-1 ${isRTL ? 'self-end flex-row-reverse' : "self-start"}`}><span>{dict.postalCode}</span> <span className='text-red-600'>*</span></p>
              <div>
                <input {...register('postalCode')} defaultValue={purpose === "patch" ? address?.postalCode : ""} className={`w-full md:border-1 max-md:focus:border-b-3 max-md:focus:border-[var(--theme)] outline-0 border-neutral-300 focus:border-[var(--theme)] rounded-[7px] max-md:bg-neutral-200 h-12 p-3`} type="search" />
                <p className='text-red-600 px-1 text-[12px] mt-2'>{errors.postalCode?.message}</p>
              </div>
            </div>
          </div>
          <div className={`max-md:fixed bg-white bottom-0 left-0 w-full border-t-1 p-4 border-neutral-300`}>
            <button disabled={isSubmitted} className={`bg-[var(--theme)] p-3 w-full rounded-[7px] text-white text-[1rem]`}>
              {dict.confirm} {dict.and} {dict.continue}
            </button>
          </div>
        </form>
      </Popup>
    </>
  )
}
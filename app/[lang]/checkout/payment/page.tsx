'use client'
import useDataStore from '@/app/stores/dataStore'
import { useSettingsStore } from '@/app/stores/settingsStore'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useMemo, useState } from 'react'
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md'
import FeesAndButton from './components/FeesAndButton'
import Header from './components/Header'
import PaymentMethod from './components/PaymentMethod'

const page = () => {
    const { addresses, isRTL, lang, loading, dict, cartProducts } = useDataStore()
    const { shippingMethod } = useSettingsStore()
  
    const currency = dict.product.currency
  
    const sum = useMemo(() => {
      return cartProducts.reduce((sum, elem) => sum += elem.product.originalPriceFa, 0)
    }, [cartProducts])
    const finalSum = useMemo(() => {
      return cartProducts.reduce((sum, elem) => sum += elem.product.priceFa, 0)
    }, [cartProducts])
    const discountAmmount = useMemo(() => {
      return cartProducts.reduce((sum, elem) => sum += elem.product.originalPriceFa, 0) - cartProducts.reduce((sum, elem) => elem.product.priceFa, 0)
    }, [cartProducts])
    const discountPercentage = useMemo(() => {
      return Math.floor(cartProducts.reduce((sum, elem) => sum += elem.product.originalPriceFa, 0) / (cartProducts.reduce((sum, elem) => elem.product.originalPriceFa, 0) - cartProducts.reduce((sum, elem) => elem.product.priceFa, 0)))
    }, [cartProducts])
    
  return (
    <div className='relative md:px-5 min-h-[100vh] flex flex-col items-center'>
      <Header />
      <div className={`relative max-w-[1200px] pt-3 w-full flex gap-3 max-md:flex-col max-md:items-stretch md:justify-stretch ${isRTL ? "md:flex-row-reverse" : ""}`}>
        <div className={`w-full text-[0.8rem] max-md:px-5 flex flex-col gap-6 ${isRTL ? "" : ""}`}>
          <PaymentMethod />
        </div>
        <FeesAndButton />
      </div>
    </div>
  )
}

export default page

import useDataStore from '@/app/stores/dataStore'
import { useSettingsStore } from '@/app/stores/settingsStore'
import React, { useMemo } from 'react'
import PayButton from './components/PayButton'
import { useRouter } from 'next/navigation'

const FeesAndButton = () => {
    const { isRTL, dict, cartProducts } = useDataStore()
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
/*     <div className={`flex-1/5 relative max-w-[1200px] pt-3 w-full flex gap-3 max-md:flex-col max-md:items-stretch md:justify-stretch ${isRTL ? "md:flex-row-reverse" : ""}`}>
        <div className={`w-full text-[0.8rem] max-md:px-5 flex flex-col gap-6 ${isRTL ? "items-end" : ""}`}>
          
        </div> */
        <div className='bg-white md:sticky top-5 md:flex-1/3 md:max-w-70 max-md:w-full md:border-1 max-md:border-t-5 md:rounded-[7px] border-gray-200 max-h-max px-5 md:py-3 max-md:mb-18'>
          <div className='divide-y-1 divide-gray-200 text-[0.7rem] w-full'>
            <span className={`${isRTL ? "flex-row-reverse" : ""} w-full py-4 flex justify-between gap-5`}>
              <span className={`flex gap-1 ${isRTL ? "flex-row-reverse" : ""}`}>
                <p>{dict.productsPrice}</p>
                <p>{`(${cartProducts.length})`}</p>
              </span>
              <div className={`flex items-center ${isRTL ? "flex-row-reverse" : ""}`}>
                <p>{sum}</p>
                <span className="text-[10px]">{currency}</span>
              </div>
            </span>
            <span className={`${isRTL ? "flex-row-reverse" : ""} w-full py-4 flex justify-between gap-5`}>
              <span>{dict.shipping} {dict.fee}</span>
              <div className={`flex items-center ${isRTL ? "flex-row-reverse" : ""}`}>
                <p>{shippingMethod === "online" ? "200000" : `${dict.free}`}</p>
                <span className="text-[10px]">{shippingMethod === "online" ? currency : null}</span>
              </div>
            </span>
            <span className={`${isRTL ? "flex-row-reverse" : ""} w-full py-4 flex justify-between gap-5`}>
              <p>{dict.discount}</p>
              <div className={`flex items-center gap-1 ${isRTL ? "flex-row-reverse" : ""}`}>
                <span className={`flex items-center ${isRTL ? "flex-row-reverse" : ""}`}>
                  <p>{discountAmmount}</p>
                  <span className="text-[10px]">{currency}</span>
                </span>
                <p className="text-[10px]">{` (${discountPercentage}%) `}</p>
              </div>
            </span>
            <span className={`text-green-800 font-medium ${isRTL ? "flex-row-reverse" : ""} w-full py-4 flex justify-between gap-5`}>
              <span className={`flex gap-1 ${isRTL ? "flex-row-reverse" : ""}`}>
                <p>{dict.finalSum}</p>
              </span>
              <div className={`flex items-center ${isRTL ? "flex-row-reverse" : ""}`}>
                <p className=''>{finalSum}</p>
                <span className="text-[10px]">{currency}</span>
              </div>
            </span>
          </div>
          <PayButton finalSum={finalSum}/>
        </div>
      // </div>
  )
}

export default FeesAndButton

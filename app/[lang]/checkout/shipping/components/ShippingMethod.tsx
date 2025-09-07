import useDataStore from '@/app/stores/dataStore'
import { useSettingsStore } from '@/app/stores/settingsStore'
import React from 'react'
import { AiOutlineShop } from "react-icons/ai";
import { FaTruck } from 'react-icons/fa'

const ShippingMethod = () => {
    const { shippingMethod, setShippingMethod } = useSettingsStore()
    const { isRTL } = useDataStore()
  return (
    <div>
      <p className={`font-medium text-[1rem] pb-3 ${isRTL ? "text-end" : ""}`}>Shipping Method</p>
      <div className='w-full px-5 text-[0.8rem] flex flex-col divide-y- divide-gray-300 border-1 border-neutral-300 rounded-[7px]'>
          <div onClick={() => setShippingMethod("inPerson")} className={`py-5 flex items-start justify-stretch ${isRTL ? "flex-row-reverse" : ""}`}>
            <span className={`min-h-4 min-w-4 rounded-full ${shippingMethod === "inPerson" ? "border-5 border-cyan-500" : "border-1 border-neutral-500"}`}></span>
            <button className={`${shippingMethod === "inPerson" ? "text-cyan-500" : "text-neutral-500"} flex flex-col gap-3 ${isRTL ? "justify-end mr-3" : "ml-3"}`}>
                <div className={`flex gap-2 items-center ${isRTL ? "flex flex-row-reverse" : ""}`}>
                  <AiOutlineShop className='text-[1.1rem]'/>
                  <p className='font-medium'>Buy directly from store</p>
                </div>
                <div className={`flex gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                  <span>Address</span>
                  <span>:</span>
                  <span className={`${isRTL? "text-end" : "text-start"}`}>اصفهان، خیابان ابوریحان بیرونی، کوچه مهرانگیز، نبش کوچه مهرانگیز 2، پلاک 2 طبقه همکف</span>
                </div>
            </button>
          </div>
          <div onClick={() => setShippingMethod("isfahan")} className={`py-5 flex items-start justify-stretch ${isRTL ? "flex-row-reverse" : ""}`}>
            <span className={`min-h-4 min-w-4 rounded-full ${shippingMethod === "isfahan" ? "border-5 border-cyan-500" : "border-1 border-neutral-500"}`}></span>
            <button className={`${shippingMethod === "isfahan" ? "text-cyan-500" : "text-neutral-500"} flex flex-col gap-3 ${isRTL ? "justify-end mr-3" : "ml-3"}`}>
                <div className={`flex gap-2 items-center ${isRTL ? "flex flex-row-reverse" : ""}`}>
                    <FaTruck className='text-[1.1rem]'/>
                    <p className='font-medium'>Ship to Isfahan</p>
                </div>
                <div className={`flex gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                  <span>Fee</span>
                  <span>:</span>
                  <p>Free</p>
                </div>
            </button>
          </div>
          <div onClick={() => setShippingMethod("online")} className={`py-5 flex items-start justify-stretch ${isRTL ? "flex-row-reverse" : ""}`}>
            <span className={`min-h-4 min-w-4 rounded-full ${shippingMethod === "online" ? "border-5 border-cyan-500" : "border-1 border-neutral-500"}`}></span>
            <button className={`${shippingMethod === "online" ? "text-cyan-500" : "text-neutral-500"} flex flex-col gap-3 ${isRTL ? "justify-end mr-3" : "ml-3"}`}>
                <div className={`flex gap-2 items-center ${isRTL ? "flex flex-row-reverse" : ""}`}>
                  <FaTruck className='text-[1.1rem]'/>
                  <p className='font-medium'>Other cities</p>
                </div>
                <div className={`flex gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                  <span>Fee</span>
                  <span>:</span>
                  <p>Will be calculated</p>
                </div>
            </button>
          </div>
      </div>
    </div>
  )
}

export default ShippingMethod

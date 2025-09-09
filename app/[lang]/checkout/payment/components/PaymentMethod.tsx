import useDataStore from '@/app/stores/dataStore'
import { useSettingsStore } from '@/app/stores/settingsStore'
import React from 'react'
import { AiOutlineShop } from "react-icons/ai";
import { FaTruck } from 'react-icons/fa'
import { FaMoneyBillTransfer, FaRegCreditCard } from 'react-icons/fa6';

const PaymentMethod = () => {
    const { paymentMethod, setPaymentMethod } = useSettingsStore()
    const { isRTL, dict } = useDataStore()
  return (
    <div>
      <div className='w-full flex-1 px-5 flex flex-col divide-y- divide-gray-300 md:border-1 border-neutral-300 rounded-[7px]'>
          <div onClick={() => setPaymentMethod("inPerson")} className={`py-5 flex items-start justify-stretch ${isRTL ? "flex-row-reverse" : ""}`}>
            <span className={`min-h-4 min-w-4 rounded-full ${paymentMethod === "inPerson" ? "border-5 border-cyan-500" : "border-1 border-neutral-500"}`}></span>
            <button className={`${paymentMethod === "inPerson" ? "text-cyan-500" : "text-neutral-500"} flex flex-col gap-3 ${isRTL ? "justify-end mr-3" : "ml-3"}`}>
                <div className={`flex gap-2 items-center ${isRTL ? "flex flex-row-reverse" : ""}`}>
                  <AiOutlineShop className='text-[1.1rem]'/>
                  <p className='font-medium text-[1rem]'>{dict.payOnTheSpot}</p>
                </div>
                <div className={`flex gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                  <span className={`${isRTL? "text-end" : "text-start"}`}>{dict.payOnTheSpotUsingCashOrCreditCard}</span>
                </div>
            </button>
          </div>
          <div onClick={() => setPaymentMethod("debitCard")} className={`py-5 flex items-start justify-stretch ${isRTL ? "flex-row-reverse" : ""}`}>
            <span className={`min-h-4 min-w-4 rounded-full ${paymentMethod === "debitCard" ? "border-5 border-cyan-500" : "border-1 border-neutral-500"}`}></span>
            <button className={`${paymentMethod === "debitCard" ? "text-cyan-500" : "text-neutral-500"} flex flex-col gap-3 ${isRTL ? "justify-end mr-3" : "ml-3"}`}>
                <div className={`flex gap-2 items-center ${isRTL ? "flex flex-row-reverse" : ""}`}>
                    <FaRegCreditCard className='text-[1.1rem]'/>
                    <p className='font-medium text-[1rem]'>{dict.payOnline}</p>
                </div>
                <div className={`flex gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                  <span>{dict.portal}</span>
                  <span>:</span>
                  <p>{dict.zarinPal}</p>
                </div>
            </button>
          </div>
          <div onClick={() => setPaymentMethod("transfer")} className={`py-5 flex items-start justify-stretch ${isRTL ? "flex-row-reverse" : ""}`}>
            <span className={`min-h-4 min-w-4 rounded-full ${paymentMethod === "transfer" ? "border-5 border-cyan-500" : "border-1 border-neutral-500"}`}></span>
            <button className={`${paymentMethod === "transfer" ? "text-cyan-500" : "text-neutral-500"} flex flex-col gap-3 ${isRTL ? "justify-end mr-3" : "ml-3"}`}>
                <div className={`flex gap-2 items-center ${isRTL ? "flex flex-row-reverse" : ""}`}>
                  <FaMoneyBillTransfer className='text-[1.1rem]'/>
                  <p className='font-medium text-[1rem]'>{dict.transferTheMoney}</p>
                </div>
                <div className={`flex gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                  <span>{dict.TransferTo}</span>
                  <span>:</span>
                  <span>
                      <p>6037998247480709</p>
                      <p>علی پورسلیمانی</p>
                  </span>
                </div>
            </button>
          </div>
      </div>
    </div>
  )
}

export default PaymentMethod

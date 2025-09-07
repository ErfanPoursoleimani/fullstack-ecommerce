import { useMessages } from '@/app/contexts/MessagesContext'
import useDataStore from '@/app/stores/dataStore'
import { useSettingsStore } from '@/app/stores/settingsStore'
import { useRouter } from 'next/navigation'
import React from 'react'

const PayButton = () => {
    const { isRTL, lang } = useDataStore()
    const router = useRouter()
    const { paymentMethod } = useSettingsStore()
    const { addMessage } = useMessages();



    const showWarningMessage = () => {
        addMessage({
        type: 'error',
        title: 'Please choose a payment method first',
        description: '',
        duration: 4000,
        });
    };

    const handlePay = () => {
        paymentMethod 
        ? ""
        : showWarningMessage()
    }
  return (
    <div onClick={handlePay} className={`w-full max-md:fixed bottom-0 left-0 max-md:px-5 max-md:py-3 flex font-medium bg-white ${isRTL ? "justify-end" : ""}`}>
        <button className='bg-[red] text-[0.9rem] text-white rounded-[10px] mt-2 w-full max-md:w-full py-2 px-5 cursor-pointer'>Pay</button>
    </div>
  )
}

export default PayButton

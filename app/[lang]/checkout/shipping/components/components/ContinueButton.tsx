
import { useMessages } from '@/app/contexts/MessagesContext'
import useDataStore from '@/app/stores/dataStore'
import { useSettingsStore } from '@/app/stores/settingsStore'
import { useRouter } from 'next/navigation'
import React from 'react'

const ContinueButton = () => {
    const { dict, isRTL, lang } = useDataStore()
    const { addMessage } = useMessages();
    const { shippingMethod} = useSettingsStore()
    const router = useRouter()

    const showWarningMessage = () => {
        addMessage({
        type: 'error',
        title: 'Please choose a shipping method first',
        description: '',
        duration: 4000,
        });
    };

    const handleContinue = () => {
        shippingMethod 
        ? router.push(`/${lang}/checkout/payment`)
        : showWarningMessage()
    }
  return (
    <div onClick={handleContinue} className={`w-full max-md:fixed bottom-0 left-0 max-md:px-5 max-md:py-3 flex bg-white ${isRTL ? "justify-end" : ""}`}>
        <button className='bg-[red] text-[0.9rem] text-white rounded-[10px] font-medium mt-2 w-full max-md:w-full py-2 px-5 cursor-pointer'>{dict.continue}</button>
    </div>
    
  )
}

export default ContinueButton

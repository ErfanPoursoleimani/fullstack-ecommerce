import { useMessages } from '@/app/contexts/MessagesContext'
import { useAuthStore } from '@/app/stores/authStore'
import useDataStore from '@/app/stores/dataStore'
import { useSettingsStore } from '@/app/stores/settingsStore'
import { useRouter } from 'next/navigation'
import React from 'react'

const PayButton = ({finalSum}: {finalSum: number}) => {
    const { isRTL, lang, cartProducts } = useDataStore()
    const { userId } = useAuthStore()
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

    const handlePayment = async () => {  

      if(!paymentMethod){
        showWarningMessage()
        return
      }

      try {
          const res = await fetch(`/api/payment-zarinpal/request`, {
              method: 'POST',
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify({
                  userId: userId,
                  items: cartProducts,
                  finalPrice: finalSum * 10
              })
          })


          const data = await res.json();


          if (data.success && data.url) {
              router.push(data.url);
          } else {
              alert("خطا در ایجاد پرداخت:" + (data.error || "نامشخص"));
          }

      } catch (error) {
          console.error("خطای واقعی:", error);
          console.log('مشکل از سمت سرور رخ داده است');
      }
    }


  return (
    <div onClick={handlePayment} className={`w-full max-md:fixed bottom-0 left-0 max-md:px-5 max-md:py-3 flex font-medium bg-white ${isRTL ? "justify-end" : ""}`}>
        <button className='bg-[red] text-[0.9rem] text-white rounded-[10px] mt-2 w-full max-md:w-full py-2 px-5 cursor-pointer'>Pay</button>
    </div>
  )
}

export default PayButton

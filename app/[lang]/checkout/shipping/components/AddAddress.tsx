import { usePopup } from '@/app/hooks/usePopup'
import useDataStore from '@/app/stores/dataStore'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { FaPlus } from 'react-icons/fa6'
import { AddressPicker } from '../../../_components/profile/AddressPicker'
import Popup from '../../../_components/general/PopupRaw'

const AddAddress = () => {
    const { isRTL, lang } = useDataStore()
    const router = useRouter()
    const popup = usePopup()
    const childPopup = usePopup()

    useEffect(() => {
        popup.openPopup({ title: "Choose Address" })
    }, [])

    useEffect(() => {
        if (!popup.isOpen) {
            const timeoutId = setTimeout(() => {
                router.push(`/${lang}/checkout/cart`)
            }, 100)
            
            return () => clearTimeout(timeoutId)
        }
    }, [popup.isOpen, router, lang])

  return ( 
    <div className='flex flex-col items-center'>
        <Popup popup={popup} className={``}>
            <span className={`items-center max-md:justify-center max-md:min-h-30 ${isRTL ? "justify-end" : ""} gap-3 flex text-cyan-500`}>
                <FaPlus />
                <AddressPicker purpose={'post'} buttonContent={`add new address`} className={`text-sm`}/>
            </span>
        </Popup>
    </div>
  )
}

export default AddAddress

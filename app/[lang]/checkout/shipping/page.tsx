'use client'
import useDataStore from '@/app/stores/dataStore'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import AddressCard from '../../_components/AddressCard'
import InCartProduct from '../cart/components/InCartProduct'
import AddAddress from './components/AddAddress'
import ShippingMethod from './components/ShippingMethod'
import FeesAndButton from './components/FeesAndButton'
import Header from './components/Header'

const page = () => {


  const { addresses, isRTL, lang, loading, dict, cartProducts } = useDataStore()
  const router = useRouter()

  useEffect(() => {
    if(addresses && loading || !addresses.some((address) => address.isActive) && addresses.length !== 0){
      const timeoutId = setTimeout(() => {
          router.push(`/${lang}/profile/addresses`)
      }, 1000)
      
      return () => clearTimeout(timeoutId)
    }
  }, [!addresses.some((address) => address.isActive), addresses.length, addresses])

  useEffect(() => {
    if(cartProducts && cartProducts.length === 0){
      const timeoutId = setTimeout(() => {
          router.push(`/${lang}/checkout/cart`)
      }, 1000)
      
      return () => clearTimeout(timeoutId)
    }
  }, [cartProducts])

    return (
      <div className='relative md:px-5 min-h-[100vh] flex flex-col items-center'>
        <Header />
        {
        addresses.length === 0
        ? <AddAddress />
        : addresses.filter((address) => address.isActive)[0] &&
          <div className={`relative max-w-[1200px] pt-3 w-full flex gap-3 max-md:flex-col max-md:items-stretch md:justify-stretch ${isRTL ? "md:flex-row-reverse" : ""}`}>
            <div className={`w-full text-[0.8rem] max-md:px-5 flex flex-col gap-6`}>
              <div>
                <AddressCard address={addresses.filter((address) => address.isActive)[0]} />
              </div>
              <ShippingMethod />
              <div className={`${isRTL ? "self-end" : ""}`}>
                {cartProducts.map((cartProduct) => (
                  <InCartProduct key={cartProduct.id} cartProduct={cartProduct} />
                ))}
              </div>
            </div>
            <FeesAndButton />
          </div>
        }
      </div>
    );
}

export default page

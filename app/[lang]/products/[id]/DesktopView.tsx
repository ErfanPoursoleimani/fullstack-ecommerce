import useDataStore from '@/stores/dataStore'
import React from 'react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import CartButton from '../../_ProductCard/components/CartButton'

const DesktopView = () => {
  const { id } = useParams()
  const { products, dict, tags, isRTL } = useDataStore()
  const currency = dict.product.currency
  const massUnit = dict.product.massUnit

  const product = products.filter((product) => product.id === parseInt(id as string))[0]

  const { priceFa, description, label, stock } = product
  return (
    <div className='hidden md:flex justify-center mt-[103px] min-w-[100vw] min-h-[calc(100vh-103px)]'>
      <div className={`flex justify-stretch gap-5 p-10 xl:p-20 w-full max-w-[1200px] h-max ${isRTL ? "flex-row-reverse" : ""}`}>
        <Image className='w-max h-max rounded-2xl' src={product.images[0].url} alt={''} width={200} height={100} />
        <div className={`flex flex-1 gap-10 flex-col justify-between ${isRTL ? "items-end" : null}`}>
          <h1 className='text-2xl font-medium'>{dict.product.products[product.label as keyof typeof dict.product.products]}</h1>
          <p>{product.description}</p>
          <div className={`flex items-end gap-5 max-sm:hidden ${isRTL ? "flex-row-reverse" : ""}`}>
            <div
              className={`flex justify-stretch w-30 gap-3
                ${ isRTL ? "items-end" : "items-start" }
                `}
            >
              <CartButton className={"flex-1 border-1 border-neutral-200"} product={product} buttonBg={'--theme'}/>
            </div>
            <div className={`flex flex-col ${isRTL ? "items-end" : ""}`}>
              <div
                className={` 
                  flex justify-center items-center text-[var(--theme)] text-[13px]
                  ${isRTL ? "justify-end flex-row-reverse" : "justify-start"}
                  `}
                  >
                <h2>{product.originalPriceFa - product.priceFa}</h2>
                <div className={`
                  flex justify-center md:text-[11px] text-[10px] gap-[2px]
                  ${isRTL ? 'items-start flex-row-reverse' : 'items-end'}
                `}
                >
                  <span>{currency} </span>
                  <span>discount</span>
                </div>
              </div>
              <div
                className={` 
                  flex justify-center items-center
                  ${isRTL ? "justify-end flex-row-reverse" : "justify-start"}
                  `}
                  >
                <h2>{product.priceFa}</h2>
                <div className={`
                  flex justify-center md:text-[11px] text-[9px] gap-[5px]
                  ${isRTL ? 'items-start flex-row-reverse' : 'items-end'}
                `}
                >
                  <span>{currency} </span>
                  <span>/</span>
                  <span>{massUnit}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DesktopView

import { CartProduct } from '@/app/types/types'
import CartButton from '@/app/[lang]/_ProductCard/components/CartButton'
import useDataStore from '@/app/stores/dataStore'
import Image from 'next/image'

const InCartProduct = ({ cartProduct }: {cartProduct: CartProduct}) => {
    const { isRTL, dict } = useDataStore()
    const currency = dict.product.currency
    const massUnit = dict.product.massUnit

  return (
    <div className='space-y-3 flex flex-col items-start '>
      <div className={`flex gap-5 ${isRTL ? 'justify-end flex-row-reverse' : null} items-stretch`}>
        <Image className='rounded-xl' src={cartProduct.product.images[0].url} alt={cartProduct.product.label} width={110} height={50} />
        <div className={`flex flex-1 gap-4 flex-col justify-between ${isRTL ? "items-end" : null}`}>
          <h1 className='text-xl truncate'>{dict.product.products[cartProduct.product.label as keyof typeof dict.product.products]}</h1>
          <div className={`flex items-end gap-5 max-xs:hidden ${isRTL ? "flex-row-reverse" : ""}`}>
            <div
              className={`flex justify-stretch w-30 gap-3
                ${ isRTL ? "items-end" : "items-start" }
                `}
            >
              <CartButton className={"flex-1 border-1 border-neutral-300"} product={cartProduct.product} buttonBg={'--theme'}/>
            </div>
            <div className={`flex flex-col ${isRTL ? "items-end" : ""}`}>
              <div
                className={` 
                  flex justify-center items-center text-[var(--theme)] text-[13px]
                  ${isRTL ? "justify-end flex-row-reverse" : "justify-start"}
                  `}
                  >
                <h2>{cartProduct.product.originalPriceFa - cartProduct.product.priceFa}</h2>
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
                <h2>{cartProduct.product.priceFa}</h2>
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
      <div className={`flex items-center gap-5 xs:hidden ${isRTL ? "" : "flex-row-reverse"}`}>
        <div className={`flex flex-col ${isRTL ? "items-end" : ""}`}>
          <div
            className={` 
              flex justify-center items-center text-[var(--theme)] text-[13px]
              ${isRTL ? "justify-end flex-row-reverse" : "justify-start"}
              `}
              >
            <h2>{cartProduct.product.originalPriceFa - cartProduct.product.priceFa}</h2>
            <div className={`
              flex justify-center md:text-[11px] text-[10px] gap-[5px]
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
            <h2>{cartProduct.product.priceFa}</h2>
            <div className={`
              flex justify-center md:text-[11px] text-[9px] gap-[2px]
              ${isRTL ? 'items-start flex-row-reverse' : 'items-end'}
            `}
            >
              <span>{currency} </span>
              <span>/</span>
              <span>{massUnit}</span>
            </div>
          </div>
        </div>
        <CartButton className={"border-1 max-w-25 min-w-25 border-neutral-300"} product={cartProduct.product} buttonBg={'--theme'}/>
      </div>
    </div>
  )
}

export default InCartProduct

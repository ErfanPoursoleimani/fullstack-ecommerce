'use client'
import useDataStore from "@/app/stores/dataStore";
import { useParams, useRouter } from "next/navigation";
import { LiaOpencart } from "react-icons/lia";
import InCartProduct from "./components/InCartProduct";
import { useMemo } from "react";
import Link from "next/link";


const Shoppingcart = () => {

  const { lang } = useParams()
  const router = useRouter()

  const { cartProducts, isRTL, dict } = useDataStore()
  const currency = dict.product.currency
  const massUnit = dict.product.massUnit



  const sum = useMemo(() => {
    return cartProducts.reduce((sum, elem) => elem.product.originalPriceFa, 0)
  }, [cartProducts])
  const finalSum = useMemo(() => {
    return cartProducts.reduce((sum, elem) => elem.product.priceFa, 0)
  }, [cartProducts])
  const discountAmmount = useMemo(() => {
    return cartProducts.reduce((sum, elem) => elem.product.originalPriceFa, 0) - cartProducts.reduce((sum, elem) => elem.product.priceFa, 0)
  }, [cartProducts])
  const discountPercentage = useMemo(() => {
    return Math.floor(cartProducts.reduce((sum, elem) => elem.product.originalPriceFa, 0) / (cartProducts.reduce((sum, elem) => elem.product.originalPriceFa, 0) - cartProducts.reduce((sum, elem) => elem.product.priceFa, 0)))
  }, [cartProducts])

  if(cartProducts.length === 0){
    return (
      <div className="absolute top-[20%] left-[50%] translate-x-[-50%] flex flex-col items-center justify-center text-center">
        <div className="text-[100px] text-[var(--theme)]">
          <LiaOpencart />
        </div>
        <p className="text-[0.8rem] font-medium text-neutral-500">The Cart is empty</p>
      </div>
    )
  }

  return (
    <div className={`relative p-3 xs:p-5 sm:p-10 top-[120px] flex flex-col items-center justify-center w-[100vw] min-h-max`}>
      <div className={`max-w-290 w-full flex justify-stretch gap-10
        ${isRTL ? "flex-row-reverse" : null}
        `}
      >
        <div className={`rounded-xl border-neutral-300 flex flex-1 flex-col gap-6 sm:gap-10 ${isRTL ? "items-end" : null}`}>
          {cartProducts.map((cartProduct) => (
            <div key={cartProduct.id}>
              <InCartProduct cartProduct={cartProduct} />
            </div>
          ))}
        </div>
        <div className={`
          w-full md:w-85 md:h-max px-5 py-4 md:rounded-[7px]
          fixed md:sticky md:top-[105px] md:bottom-auto bottom-[48px] left-0
          flex justify-between md:flex-col md:justify-start gap-5 items-center
          md:border-1 border-neutral-300 bg-white
          text-[0.8rem]
          `}
        >
          <span className={`text-neutral-400 hidden md:flex md:w-full justify-between items-center ${isRTL ? "flex-row-reverse" : null}`}>
              <span className={`flex gap-1 ${isRTL ? "flex-row-reverse" : ""}`}>
                <p>{dict.productsPrice}</p>
                <p>{`(${cartProducts.length})`}</p>
              </span>
            <div className={`flex items-center ${isRTL ? "flex-row-reverse" : ""}`}>
              <p>{cartProducts.reduce((sum, elem) => elem.product.originalPriceFa, 0)}</p>
              <span className="text-[10px]">{currency}</span>
            </div>
          </span>
          <span className={`flex flex-col md:flex-row md:w-full ${isRTL ? "md:flex-row-reverse" : ""} md:justify-between md:items-center`}>
            <p className="max-md:text-neutral-400 text-[0.8rem]">{dict.finalSum}</p>
            <div className={`flex items-center ${isRTL ? "flex-row-reverse" : ""}`}>
              <p>{cartProducts.reduce((sum, elem) => elem.product.priceFa, 0)}</p>
              <span className="text-[10px]">{currency}</span>
            </div>
          </span>
          <span className={`hidden md:flex md:w-full justify-between items-center ${isRTL ? "flex-row-reverse" : null} text-[var(--theme)]`}>
            <p>{dict.discount}</p>
            <div className={`flex items-center gap-1 ${isRTL ? "flex-row-reverse" : ""}`}>
              <span className={`flex items-center ${isRTL ? "flex-row-reverse" : ""}`}>
                <p>{discountAmmount}</p>
                <span className="text-[10px]">{currency}</span>
              </span>
              <p className="text-[10px]">{` (${discountPercentage}%) `}</p>
            </div>
          </span>
          <Link href={`/${lang}/checkout/shipping`} className="w-[50%] md:w-full">
            <button className={`w-full py-3 text-[0.9rem] max-sm:text-[0.9rem] cursor-pointer rounded-xl bg-[var(--theme)] font-medium text-white`}>
              {dict.completeTheOrder}
            </button>
          </Link>
        </div>
      </div>
      <div className="max-md:h-40 w-full"></div>
    </div>
  )
}

export default Shoppingcart

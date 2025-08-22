'use client'
import { ProductPicker } from './ProductPicker'
import Loading from '@/app/[lang]/_components/Loading'
import { useAuthStore } from '@/app/stores/authStore'
import useDataStore from '@/app/stores/dataStore'
import { Image } from '@prisma/client'
import { Product } from '@/app/types/types'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { FaRegTrashAlt } from 'react-icons/fa'
import { HiDotsVertical } from 'react-icons/hi'
import { RiEdit2Fill } from 'react-icons/ri'

const ProductInfo = ({product, tagId}: {product: Product, tagId: number}) => {

    const { lang } = useParams()
    const { isRTL, fetchProducts, dict } = useDataStore()
    const { user, userId } = useAuthStore()
    const router = useRouter()

    const [loading, setLoading] = useState(false)
    const [isOptionsOpen, setIsOptionsOpen] = useState(false)
    const { removeProduct, addProduct } = useDataStore.getState();

    const handleDeleteProduct = async() => {
      try {
        setLoading(true);
      
        removeProduct(product.id);
        await axios.delete(`/${lang}/api/products/${product.id}`);
        
        setIsOptionsOpen(false);
        
      } catch (error) {
          console.error('Error deleting product:', error);
          // If delete failed, add the product back to the state
          addProduct(product);
          alert('Failed to delete product. Please try again.');
      } finally {
          setLoading(false);
      }
    }

  return (
    <div className={`flex justify-between ${!isRTL ? "flex-row-reverse" : ""} items-stretch flex-1 text-neutral-700 rounded-[6px] py-3`}>
        <span className={`md:relative flex flex-col ${isRTL ? "" : ""}`}>
            <HiDotsVertical onClick={() => setIsOptionsOpen(!isOptionsOpen)} className='text-[22px]'/>
            {isOptionsOpen &&
              <>
                <ul className={`pb-6 pt-5 md:pb-0 md:pt-0 md:absolute fixed bottom-13 left-0 md:top-8 z-104 h-max min-w-full md:min-w-60 flex shadow-xl flex-col border-1 text-[0.8rem] md:text-[1rem] border-neutral-200 rounded-t-3xl md:rounded-[7px] bg-white ${isRTL ? "" : "right-0 md:-left-60"}`}>
                  <p className={`md:hidden px-4 py-5 text-[1rem] text-black`}>Product' settings</p>
                  <li onClick={handleDeleteProduct} className={`select-none w-full md:p-4 px-4 py-3 text-red-600 flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""} md:border-b-1 border-neutral-200`}>
                      <FaRegTrashAlt className={`text-[1.1rem]`}/>
                      <p>Delete</p>
                  </li>
                  <li className={`select-none w-full flex items-center gap-3`}>
                      
                      <ProductPicker 
                        tagId={tagId}
                        product={product} 
                        purpose={'patch'} 
                        buttonContent={
                            loading 
                            ? <Loading className='text-red-600'/> 
                            : <><RiEdit2Fill className={`text-[1.1rem]`}/><p>Edit</p></>} 
                        className={`w-full h-full md:p-4 px-4 py-3 flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}/>
                  </li>
                </ul>
              </>
            }
        </span>
        <div className='flex flex-col justify-between'>
          <span className={`flex gap-2 items-center ${isRTL ? "flex-row-reverse" : null}`}>
            <p className={`text-[0.6rem] sm:text-[0.7rem] md:text-[0.8rem] text-neutral-400 truncate`}>Label</p>
            <p className={`md:text-[0.9rem] text-black text-[0.7rem]`}>{dict.product.products[product.label as keyof typeof dict.product.products]}</p>
          </span>
          <span className={`flex gap-2 items-center ${isRTL ? "flex-row-reverse" : null}`}>
            <p className={`text-[0.6rem] sm:text-[0.7rem] md:text-[0.8rem] text-neutral-400 truncate`}>Stock</p>
            <p className={`md:text-[0.9rem] text-black text-[0.7rem]`}>{product.stock}</p>
          </span>
          <span className={`flex gap-2 items-center ${isRTL ? "flex-row-reverse" : null}`}>
            <p className={`text-[0.6rem] sm:text-[0.7rem] md:text-[0.8rem] text-neutral-400 truncate`}>Primary Price</p>
            <p className={`md:text-[0.9rem] text-black text-[0.7rem]`}>{product.originalPriceFa}</p>
          </span>
          <span className={`flex gap-2 items-center ${isRTL ? "flex-row-reverse" : null}`}>
            <p className={`text-[0.6rem] sm:text-[0.7rem] md:text-[0.8rem] text-neutral-400 truncate`}>After discount</p>
            <p className={`md:text-[0.9rem] text-black text-[0.7rem]`}>{product.priceFa}</p>
          </span>
{/*           <span className={`flex gap-2 items-center ${isRTL ? "flex-row-reverse" : null}`}>
            <p className={`text-[0.6rem] sm:text-[0.7rem] md:text-[0.8rem] text-neutral-400 truncate`}>Description</p>
            <p className={`md:text-[0.9rem] text-black text-[0.7rem]`}>{product.description}</p>
          </span> */}
        </div>
    </div>
  )
}

export default ProductInfo

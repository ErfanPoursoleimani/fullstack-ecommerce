import useDataStore from '@/app/stores/dataStore'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React from 'react'
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md'

const SeeAllProducts = ({ arrowDirection }: { arrowDirection: string}) => {

  const { lang } = useParams()
  const { dict: { seeAllProducts } } = useDataStore()

  return (
    <Link 
      href={`/${lang}/products`}
      className='xl:min-w-50 xl:min-h-80 md:min-w-45 md:min-h-70 min-h-50 min-w-35 rounded-[7px] flex flex-col items-center justify-center gap-5 bg-[var(--theme2)] text-white'
/*       style={
        arrowDirection === 'toLeft' ? {marginRight: '5px'} : {marginLeft: '5px'}
      } */
      >
      {arrowDirection === 'toLeft' 
      ? <MdArrowBackIos className='text-[60px] p-3 rounded-full border-2 border-white' /> 
      :  <MdArrowForwardIos className='text-[60px] p-3 rounded-full border-2 border-white'/>}
      <p className='text-[15px]'>{seeAllProducts}</p>
    </Link>
  )
}

export default SeeAllProducts

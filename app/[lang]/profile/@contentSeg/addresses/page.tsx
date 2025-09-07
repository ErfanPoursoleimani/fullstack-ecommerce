"use client"
import { AddressPicker } from '@/app/[lang]/_components/AddressPicker'
import Loading from '@/app/[lang]/_components/Loading'
import useDataStore from '@/app/stores/dataStore'
import { useParams, useRouter } from 'next/navigation'
import { BiSolidDirections } from 'react-icons/bi'
import { FaPlus } from 'react-icons/fa6'
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md'
import AddressCard from '../../../_components/AddressCard'

const page = () => {

  const { lang } = useParams()
  const router = useRouter()
  const { isRTL, addresses, loading } = useDataStore()
  
  const handleBackAction = () => {
    router.push(`/${lang}/profile`)
  }

  return (
    <>
      <div className={`min-h-100 max-md:absolute max-md:min-h-full max-md:w-full max-md:bg-white flex flex-col flex-1 justify-stretch md:border-1 border-neutral-300 rounded-[10px]`}>
        <div className={`p-4 md:border-b-0 border-b-7 border-neutral-200 flex justify-between items-center ${isRTL ? "flex-row-reverse" : "flex-row"}`}>
          <p className='font-medium md:border-b-3 border-red-500 md:pb-4'>Addreesses</p>
          {isRTL
            ? <MdArrowBackIos className='self-start md:hidden' onClick={handleBackAction} />
            : <MdArrowForwardIos className='self-start md:hidden' onClick={handleBackAction} /> }
          <span className={`items-center justify-center gap-3 hidden md:flex text-red-500`}>
            <FaPlus />
            <AddressPicker purpose={'post'} buttonContent={`add new address`} className={`text-sm`}/>
          </span>
        </div>
        <div className={`text-[13px] p-5 flex-1 flex flex-col justify-stretch gap-2 items-center ${isRTL ? "text-end" : "text-start"}`}>
          { addresses.length === 0
          ? <div className={`space-y-2 flex max-md:justify-start max-md:mt-[10vh] flex-col items-center justify-center`}>
              <BiSolidDirections className='text-[150px] text-[var(--theme)]'/>
              <p>No addresses added</p>
              <AddressPicker purpose={'post'} buttonContent='add an address' className={`p-4 border-1 border-[var(--theme)] rounded-[7px] md:text-sm text-[0.8rem] md:text-md text-[var(--theme)]`}/>
            </div>
          : addresses.map((address) => (
            <AddressCard key={address.id} address={address}/>
          ))}
        </div>
      </div>
      <div className={`${addresses.length === 0 ? 'hidden' : ""}`}>
        <span className={`fixed bottom-20 left-[4vw] items-center justify-center gap-3 md:hidden flex text-white bg-[var(--theme)] rounded-full p-4 z-103`}>
          { loading
            ? <Loading className=''/>
            : (
                <>
                  <FaPlus className='text-white'/>
                  <AddressPicker purpose={'post'} buttonContent={`add new address`} className={`text-[0.9rem]`}/>
                </>
              )
          }
        </span>
      </div>
    </>
  )
}

export default page

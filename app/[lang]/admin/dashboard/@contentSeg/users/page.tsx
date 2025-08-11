"use client"
import Loading from '@/app/[lang]/_components/Loading'
import useDataStore from '@/stores/dataStore'
import { useParams, useRouter } from 'next/navigation'
import { BiSolidDirections } from 'react-icons/bi'
import { FaPlus } from 'react-icons/fa6'
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md'
import { ProductPicker } from '../products/ProductPicker'
import UserCard from './UserCard'

const page = () => {

  const { lang } = useParams()
  const router = useRouter()
  const { dict, isRTL, users, loading } = useDataStore()
  
  const handleBackAction = () => {
    router.push(`/${lang}/admin/dashboard`)
  }

  return (
    <>
      <div className={`bottom-to-top-animation min-h-100 max-md:absolute max-md:min-h-full max-md:w-full max-md:bg-white flex flex-col flex-1 justify-stretch md:border-1 border-neutral-300 rounded-[10px]`}>
        <div className={`p-4 md:border-b-0 border-b-7 border-neutral-200 flex justify-between items-center ${isRTL ? "flex-row-reverse" : "flex-row"}`}>
          <p className='font-medium md:border-b-3 border-red-500 md:pb-4'>Addreesses</p>
          {isRTL
            ? <MdArrowBackIos className='self-start md:hidden' onClick={handleBackAction} />
            : <MdArrowForwardIos className='self-start md:hidden' onClick={handleBackAction} /> }
        </div>
        <div className={`text-[13px] divide-y-1 divide-neutral-300 p-5 max-md:p-2 flex-1 flex flex-col justify-stretch gap-3 items-center ${isRTL ? "text-end" : "text-start"}`}>
          { users.length === 0
          ? <div className={`space-y-2 flex max-md:justify-start max-md:mt-[10vh] flex-col items-center justify-center`}>
              <BiSolidDirections className='text-[150px] text-[var(--theme)]'/>
              <p>No users signed up</p>
              {/* <ProductPicker purpose={'post'} buttonContent='add an user' className={`p-4 border-1 border-[var(--theme)] rounded-[7px] md:text-sm text-[0.8rem] md:text-md text-[var(--theme)]`}/> */}
            </div>
          : users.map((user) => (
            <UserCard key={user.id} user={user}/>
          ))}
        </div>
      </div>
    </>
  )
}

export default page

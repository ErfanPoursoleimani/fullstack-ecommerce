'use client'
import useDataStore from '@/stores/dataStore'
import { Product, User } from '@/types/types'
import { useParams } from 'next/navigation'

const UserCard = ({user}: {user: User}) => {

    const { lang } = useParams()
    const { isRTL, fetchAddresses } = useDataStore()

  return (
    <div className={`flex flex-col gap-2 ${isRTL ? "items-end" : "items-start"} justify-between items-center text-neutral-700 w-full p-3 h-max`}>
        {user.firstName && user.lastName ? <span>{`${user.firstName} ${user.lastName}`}</span> : null}
        {user.phoneNumber ? <span>{user.phoneNumber}</span> : null}
        {user.email ? <span>{user.email}</span> : null}
    </div>
  )
}

export default UserCard

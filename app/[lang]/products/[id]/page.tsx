'use client'
import useDataStore from '@/app/stores/dataStore'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'
import DesktopView from './DesktopView'
import PhoneView from './PhoneView'

const page = () => {

    const { id } = useParams()
    const { products } = useDataStore()

    let product = null
    useEffect(() => {
      product = products.filter((product) => product.id === parseInt(id as string))[0]
    }, [])

  return (
    <>
      <PhoneView />
      <DesktopView />
    </>
  )
}

export default page

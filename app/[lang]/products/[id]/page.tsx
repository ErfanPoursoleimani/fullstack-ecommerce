'use client'
import useDataStore from '@/app/stores/dataStore'
import { notFound, useParams } from 'next/navigation'
import React, { useEffect } from 'react'
import Image from 'next/image'
import { Share2 } from 'lucide-react'
import { FaStar } from 'react-icons/fa6'
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md'
import { IoShareSocialOutline } from "react-icons/io5";
import PricingAndButton from '@/app/[lang]/_ProductCard/components/PricingAndButton';
import ProductCard from '../../_ProductCard/ProductCard'
import PhoneView from './PhoneView'
import DesktopView from './DesktopView'

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

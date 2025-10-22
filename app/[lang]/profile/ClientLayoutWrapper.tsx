'use client';
import { ReactNode, useState } from 'react';
import OrdersDefault from './_components/OrdersDefault';
import useDataStore from '@/app/stores/dataStore';
import { useParams, usePathname } from 'next/navigation';
import Footer from '../_components/Footer';

interface Props {
  children: ReactNode,
  contentSeg: ReactNode,
  navSeg: ReactNode,
}

export default function ClientLayoutWrapper({ children, contentSeg, navSeg }: Props) {
  
    const { isRTL } = useDataStore()
    const [screenWidth, setScreenWidth] = useState<number>(
        typeof window !== 'undefined' ? window.innerWidth : 0
    );

  return (
    <>
      <div className={`max-w-300 md:p-10 w-full flex justify-stretch items-start gap-5 ${ isRTL ? "flex-row-reverse" : '' }`}>
          {children}
          {navSeg}
          {contentSeg}
      </div>
      {screenWidth >= 76 && <Footer />}
    </>
  );
}
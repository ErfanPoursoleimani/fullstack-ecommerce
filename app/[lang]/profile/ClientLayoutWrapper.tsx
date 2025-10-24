'use client';
import useDataStore from '@/app/stores/dataStore';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode,
  contentSeg: ReactNode,
  navSeg: ReactNode,
}

export default function ClientLayoutWrapper({ children, contentSeg, navSeg }: Props) {
  
    const { isRTL } = useDataStore()

  return (
    <>
      <div className={`max-w-300 md:p-10 w-full flex justify-stretch items-start gap-5 ${ isRTL ? "flex-row-reverse" : '' }`}>
          {children}
          {navSeg}
          {contentSeg}
      </div>
    </>
  );
}
'use client'

import { useParams } from 'next/navigation'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { LuSearch } from 'react-icons/lu'
import SmallLogo from '../../_components/general/SmallLogo'
import useDataStore from '@/app/stores/dataStore'
import ProductCard from '../../_ProductCard/ProductCard'
import Link from 'next/link'
import { Product } from '@/app/types/types'
import AnimatedBox from '@/app/components/ui/AnimatedBox'

const SearchBar = () => {
  const { lang } = useParams()
  const { dict, isRTL, products } = useDataStore()
  const { search, in: inn } = dict

  const [isActive, setIsActive] = useState(false)
  const [basicQuery, setBasicQuery] = useState('')

  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleBasicSearch = (
    query: string,
    array: Product[]
  ): Product[] => {
    if (!query.trim()) return []

    return array.filter((product) =>
      dict.product.products[
        product.label as keyof typeof dict.product.products
      ]
        .toLowerCase()
        .includes(query.toLowerCase())
    )
  }

  const basicResults = useMemo(() => {
    return handleBasicSearch(basicQuery, products)
  }, [basicQuery, products])

  const openSearch = () => setIsActive(true)

  const closeSearch = () => {
    setIsActive(false)
    setBasicQuery('')
  }

  useEffect(() => {
    if (isActive) {
      inputRef.current?.focus()
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      inputRef.current?.blur()
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isActive])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isActive) {
        e.preventDefault()
        closeSearch()
        return
      }

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        openSearch()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isActive])

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isActive &&
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        closeSearch()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isActive])

  return (
    <div ref={containerRef} className="relative flex flex-1 items-center">
        <button
          onClick={openSearch}
          className={`
            flex w-full items-center gap-2
            rounded-xl
            border border-neutral-200
            bg-neutral-100/80
            px-4
            py-3
            text-[#555555]
            transition-all
            duration-300
            hover:bg-neutral-200
            ${isRTL ? 'flex-row-reverse text-right' : ''}
            `}
            >
          <LuSearch className="text-[18px] shrink-0" />

          <div className="flex items-center gap-1 text-[13px] md:text-[14px]">
            <span>{search}</span>

            <span className="md:hidden">{inn}</span>

            <span className="md:hidden">
              <SmallLogo style={{ fontSize: '17px' }} />
            </span>
          </div>
        </button>
        {isActive && (
        <AnimatedBox
          className="
            absolute
            left-0
            right-0
            top-0
            z-[120]
            overflow-hidden
            rounded-2xl
            border
            border-neutral-200
            bg-white
            shadow-2xl
          "
        >
          <div className="p-4">
            <div
              className="
                flex
                items-center
                gap-3
                rounded-xl
                border
                border-[#03a58a]
                px-4
              "
            >
              <LuSearch className="text-lg text-neutral-500" />

              <input
                ref={inputRef}
                value={basicQuery}
                onChange={(e) => setBasicQuery(e.target.value)}
                placeholder={search}
                className={`
                  h-12
                  w-full
                  bg-transparent
                  text-[15px]
                  outline-none
                  ${isRTL ? 'text-right' : ''}
                `}
              />
            </div>

            <div className="mt-4 max-h-[420px] overflow-y-auto scrollbar-hide">
              {basicQuery.trim() ? (
                basicResults.length ? (
                  <div
                    className={`
                      flex
                      gap-3
                      overflow-x-auto
                      scrollbar-hide
                      ${isRTL ? 'flex-row-reverse' : ''}
                    `}
                  >
                    {basicResults.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        className="md:min-w-50 md:min-h-65 min-w-35 min-h-50"
                        buttonBg="--theme"
                      />
                    ))}
                  </div>
                ) : (
                  <div className="py-8 text-center text-sm text-neutral-500">
                    No products found.
                  </div>
                )
              ) : (
                <div
                  className={`
                    flex
                    flex-wrap
                    gap-2
                    ${isRTL ? 'justify-end' : ''}
                  `}
                >
                  {products.slice(0, 3).map((product) => (
                    <Link
                      key={product.id}
                      href={`/${lang}/products/${product.id}`}
                      onClick={closeSearch}
                      className="
                        rounded-full
                        border
                        border-neutral-300
                        px-4
                        py-2
                        text-sm
                        transition
                        hover:border-[var(--theme)]
                        hover:text-[var(--theme)]
                      "
                    >
                      {
                        dict.product.products[
                          product.label as keyof typeof dict.product.products
                        ]
                      }
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </AnimatedBox>
      )}
    </div>
  )
}

export default SearchBar
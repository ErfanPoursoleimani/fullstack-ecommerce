'use client'

import AnimatedBox from '@/app/components/ui/AnimatedBox'
import useDataStore from '@/app/stores/dataStore'
import { Product, Tag } from '@/app/types/types'
import classNames from 'classnames'
import React, { useEffect, useRef, useState } from 'react'
import { BiCategory } from 'react-icons/bi'
import ProductCard from '../../_ProductCard/ProductCard'
import NavArrows from '../../_components/general/NavArrows'

const CategoryDropdown: React.FC = () => {
  const listRef = useRef<HTMLDivElement>(null!)
  const containerRef = useRef<HTMLDivElement>(null)

  const { tags, dict, isRTL } = useDataStore()

  const [isOpen, setIsOpen] = useState(false)
  const [isTagOpen, setIsTagOpen] = useState(true)
  const [tagHover, setTagHover] = useState<Tag>(tags[0])

  const handleEnterTag = (tag: Tag) => {
    setTagHover(tag)
    setIsTagOpen(true)
  }

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  // Close with Escape
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <div ref={containerRef} className="hidden md:block" onMouseLeave={() => setIsOpen(false)}>
      <div
        className={`relative z-10 flex h-full flex-col ${
          isRTL ? '' : 'items-start'
        }`}
      >
        <button
          type="button"
          onMouseEnter={() => setIsOpen(true)}
          
          className="h-full cursor-pointer p-1 text-[16px] transition-colors duration-200 focus:outline-none"
        >
          <div
            className={`flex items-center gap-3 ${
              isRTL ? 'flex-row-reverse' : 'flex-row'
            }`}
          >
            <span
              className={`flex items-center gap-1 ${
                isRTL ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <BiCategory
                className={`h-4 w-4 transition-transform duration-300 ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />

              <span className="block truncate">
                {dict.categories}
              </span>
            </span>

            <span className="text-[12px] text-[#8f8f8f]">|</span>
          </div>
        </button>

        {isOpen && (
          <AnimatedBox className='shadow-2xl '>
            <div
              className={`
                absolute
                top-full
                z-30
                flex
                min-h-[30vh]
                max-w-[70vw]
                border-t
                border-neutral-200
                shadow-xl
                ${
                  isRTL
                    ? 'right-0 flex-row-reverse'
                    : 'left-0 flex-row'
                }
              `}
            >
              {/* Categories */}
              <div className="bg-[#e7e7e7]">
                {tags.map((tag, index) => (
                  <button
                    key={tag.id}
                    type="button"
                    onMouseEnter={() => handleEnterTag(tag)}
                    className={`
                      flex
                      cursor-pointer
                      items-center
                      gap-2
                      truncate
                      border-x
                      w-full
                      border-[#c7c7c7]
                      px-6
                      py-6
                      transition-colors
                      ${
                        tagHover === tag
                          ? 'bg-white text-[var(--theme)]'
                          : 'hover:bg-neutral-100'
                      }
                      ${
                        index !== tags.length - 1
                          ? 'border-b'
                          : ''
                      }
                      ${
                        isRTL
                          ? 'flex-row-reverse'
                          : 'flex-row'
                      }
                    `}
                  >
                    {
                      dict.product.categories[
                        tag.label as keyof typeof dict.product.categories
                      ]
                    }
                  </button>
                ))}
              </div>

              {/* Products */}
              {isTagOpen && (
                <div
                  className={`
                    relative
                    z-20
                    flex
                    w-full
                    flex-col
                    justify-center
                    overflow-hidden
                    bg-white
                    ${
                      isRTL
                        ? 'rounded-bl-xl'
                        : 'rounded-br-xl'
                    }
                  `}
                >
                  <div
                    ref={listRef}
                    className={classNames({
                      'flex gap-2 overflow-x-auto scroll-smooth scrollbar-hide p-5':
                        true,
                      'flex-row-reverse': isRTL,
                      'flex-row': !isRTL,
                    })}
                  >
                    {tagHover?.products.map((product: Product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        className="min-h-65 min-w-50"
                        buttonBg="--theme2"
                      />
                    ))}
                  </div>

                  <NavArrows list={listRef} />
                </div>
              )}
            </div>
          </AnimatedBox>
        )}
      </div>
    </div>
  )
}

export default CategoryDropdown
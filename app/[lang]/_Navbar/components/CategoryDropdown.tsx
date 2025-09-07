import useDataStore from '@/app/stores/dataStore';
import classNames from 'classnames';
import { Amphora, Bean, Citrus, Tractor, Wheat } from 'lucide-react';
import { useParams, usePathname, useRouter } from 'next/navigation';
import React, { ReactNode, useRef, useState } from 'react';
import { BiCategory } from 'react-icons/bi';
import ProductCard from '../../_ProductCard/ProductCard';
import NavArrows from '../../_components/NavArrows';
import { Tag } from '@/app/types/types'

const options = [
  { value: 'ir', label: 'Iran' },
  { value: 'uae', label: 'United Arab Emirates' },
  { value: 'tr', label: 'Turkey', disabled: true },
];
  
const CategoryDropdown: React.FC = () => {

  const listRef = useRef<HTMLDivElement>(null!)

  const { tags, dict, isRTL } = useDataStore()

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isTagOpen, setIsTagOpen] = useState<boolean>(true);
  const [tagHover, setTagHover] = useState<Tag>(tags[0])

  const handleEnterTag = (tag: Tag) => {
    setTagHover(tag)
    setIsTagOpen(true)
  }

/*   const handleTagIcon = (label: string): ReactNode => {
    switch (label) {
      case 'برنج_ایرانی':
        return <Tractor size={'1rem'} />
      case "برنج_خارجی":
        return <Tractor size={'1rem'} />
    }
    return null
  } */

  return (
        <div className='hidden md:block'>
          <div className={`relative z-10 h-full flex flex-col 
              ${isRTL ? "items-end" : "items-start"}
            `}
          >
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              onMouseEnter={() => setIsOpen(true)}
              onMouseLeave={() => setIsOpen(false)}
              className={`p-1 text-[16px] h-full focus:outline-none transition-colors duration-200 cursor-pointer`}
                >
              <div 
                className={`flex items-center gap-3
                  ${isRTL ? "flex-row-reverse" : "flex-row"}
                `}
                >
                <span
                  className={`flex items-center gap-1
                    ${isRTL ? "flex-row-reverse" : "flex-row"}
                  `}
                >
                  <BiCategory
                    className={`w-4 h-4 transition-transform duration-200
                      ${isOpen ? 'rotate-180' : 'rotate-0'}
                      `}
                    />
                  <span className="block truncate">
                    Categories
                  </span>
                </span>
                <span className='text-[12px] text-[#8f8f8f]'>|</span>
              </div>
            </button>
            {isOpen &&
              <div 
                className={`absolute top-[100%] border-t-1 border-neutral-200 flex max-w-[70vw] min-h-[30vh]
                  ${isRTL ? "flex-row-reverse" : "flex-row"}
                `}
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
              >
                <div className='bg-[#e7e7e7]'>
                  {tags.map((tag, i) => (
                    <p
                      key={tag.id}
                      className={`flex items-center gap-2 truncate px-6 py-6 cursor-pointer border-x-1 border-[#c7c7c7]
                        ${tagHover === tag ? "bg-white text-[var(--theme)]" : null}
                        ${i !== tags.length - 1 ? "border-b-1" : null} 
                        ${isRTL ? "flex-row-reverse" : "flex-row"}
                      `}
                      onMouseEnter={() => handleEnterTag(tag)}
                    >
                      {dict.product.categories[tag.label as keyof typeof dict.product.categories]}
                    </p>
                  ))}
                </div>
                {isTagOpen &&
                  <div className={`bg-white flex flex-col justify-center w-full relative overflow-x-auto z-2
                    ${isRTL ? 'rounded-bl-xl' : 'rounded-br-xl'}
                  `}>
                      {/* <h2 className='font-bold mb-3 mx-5 text-[23px]'>{dict.product.categories[tagHover && tagHover.label as keyof typeof dict.product.categories]}</h2> */}
                      <div
                      ref={listRef}
                      className={classNames({
                          "flex gap-2 overflow-x-auto scroll-smooth scrollbar-hide p-5": true,
                          "flex-row-reverse": isRTL,
                          "flex-row": !(isRTL),
                      })}>
                          {/* <h2 className='hidden md:flex flex-col justify-center items-center self-stretch px-2 text-center mx-13 text-[40px] font-bold'>{dict.product.categories[tagHover && tagHover.label as keyof typeof dict.product.categories]}</h2> */}
                          {tagHover && tagHover.products.map((product) => (
                              <ProductCard className='min-h-65 min-w-50' key={product.id} product={product} buttonBg={'--theme2'}/>
                          ))}
                          {/* <SeeAllProducts arrowDirection={`${isRTL ? "toLeft" : "toRight"}`} /> */}
                      </div>
                      <NavArrows list={listRef}/>
                  </div>
                }
              </div>
            }
          </div>
          {isOpen && <div className='fixed top-[50px] left-0 w-[100%] h-[100vh] bg-[#000000c0] z-9'></div>}
        </div>
  );
};

export default CategoryDropdown;
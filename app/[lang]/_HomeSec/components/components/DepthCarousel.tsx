'use client'
import { useCarousel2 } from '@/app/hooks/useCarousel2'
import useDataStore from '@/app/stores/dataStore'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

interface CarouselItem {
  id: number;
  url: string;
  title: string;
}
interface DepthCarouselProps {
  items?: CarouselItem[];
  initialIndex?: number;
  visibleRange?: number;
}

const DepthCarousel = () => {
        const {dict, products, isRTL} = useDataStore()
        let initialIndex = 2
        let visibleRange = 2
        const {
          activeIndex,
          getCarouselProps,
          getItemProps,
          getNavigationProps,
          getDotProps,
        } = useCarousel2({
          itemCount: products.filter(product => product.tagId === 1).length,
          initialIndex,
          visibleRange,
        });
  return (
    <div className="min-h-[50vh] p-8 my-10">
        <div className="min-w-full min-h-max flex flex-col justify-center items-center">
          <div className='min-w-full min-h-100 perspective- flex justify-center items-center'>
            {products.filter(product => product.tagId === 1).map((product, index) => {
              const itemProps = getItemProps(index);
              
              if (!itemProps['data-visible']) return null;

              return (
                <div key={product.id} {...itemProps}>
                  <div className={`relative rounded-2xl overflow-hidden shadow-2xl`}>
                    <div className="relative w-80 h-100 max-md:w-60 max-md:h-80">
                      <Image
                        src={product.images[0].url}
                        alt={product.label}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 320px"
                        priority={itemProps['data-active']}
                      />
                    </div>
{/*                     {itemProps['data-active'] && (
                      <div className="absolute min-w-max bottom-0 left-1/2 -translate-x-1/2 p-4">
                        <h3 className="text-white text-xl font-semibold">{dict.product.products[product.label as keyof typeof dict.product.products]}</h3>
                      </div>
                    )} */}
                  </div>
                </div>
              );
            })}
          </div>

{/*           <div className='max-md:hidden'>
            <button {...getNavigationProps('prev')}>
              <ChevronLeft size={24} />
            </button>
            <button {...getNavigationProps('next')}>
              <ChevronRight size={24} />
            </button>
          </div> */}
        </div>

        <style jsx>{`
          .perspective-1000 {
            perspective: 1000px;
            transform-style: preserve-3d;
          }
        `}</style>
      </div>
  )
}

export default DepthCarousel

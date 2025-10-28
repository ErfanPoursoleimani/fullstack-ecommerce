'use client'
import { useEffect } from 'react'
import { useCarousel2 } from '@/app/hooks/useCarousel2'
import useDataStore from '@/app/stores/dataStore'


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

  useEffect(() => {
    const interval = setInterval(() => {
      const nextButton = getNavigationProps('next');
      if (nextButton.onClick) {
        nextButton.onClick();
      }
    }, 4000); // Change slide every 3 seconds

    return () => clearInterval(interval); 
  }, [getNavigationProps]);

  return (
    <div className="min-w-[100vw] min-h-[50vh] p-8 my-10">
        <div className="min-w-full max-w-full overflow-hidden min-h-max flex flex-col justify-center items-center">
          <div className='relative max-w-full min-h-100 flex justify-center items-center'>
            {products.filter(product => product.tagId === 1).map((product, index) => {
              const itemProps = getItemProps(index);
              if (!itemProps['data-visible']) return null;

              return (
                <div key={product.id} {...itemProps}>
                  <div className={`relative rounded-2xl overflow-hidden`}>
                    <div className="relative w-80 h-100 max-md:w-60 max-md:h-80">
                      <img
                        src={product.images[0].url}
                        alt={product.label}
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
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
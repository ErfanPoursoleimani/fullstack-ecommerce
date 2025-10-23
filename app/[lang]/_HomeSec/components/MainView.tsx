import { useCarousel } from '@/app/hooks/useCarousel';
import useDataStore from '@/app/stores/dataStore';
import { Tag } from '@/app/types/types';
import Image from 'next/image';

const MainView = () => {

const { tags, dict } = useDataStore()

const {
    currentIndex,
    isPlaying,
    goToSlide,
    goToNext,
    goToPrevious,
    play,
    pause,
    toggle,
    getSliderProps,
    getSlidesContainerProps,
    getSlideProps,
    getDotProps,
    getArrowProps,
    progress
  } = useCarousel({
    itemCount: 4,
    autoPlay: true,
    autoPlayDelay: 5000,
    loop: true,
    startIndex: 0,
  })

    const {
        currentIndex: tagCurrentIndex,
        isPlaying: tagIsPlaying,
    /*     goToSlide: tagGoToSlide,
        goToNext: tagGoToNext,
        goToPrevious: tagGoToPrevious,
        play: tagPlay,
        pause: tagPause,
        toggle: tagToggle, */
        getSliderProps: tagGetSliderProps,
        getSlidesContainerProps: tagGetSlidesContainerProps,
        getSlideProps: tagGetSlideProps,
    /*     getDotProps: tagGetDotsProps,
        getArrowProps: tagGetArrowProps,
        progress: tagProgress */
    } = useCarousel({
        itemCount: 1,
        autoPlay: true,
        autoPlayDelay: 10000,
        loop: true,
        startIndex: 0,
    })
  


  return (
    <div className={`w-[100vw] flex flex-col items-center pb-5 max-md:px-4 space-y-5 md:space-y-10`}>
        <div {...getSliderProps()} className='relative overflow-hidden max-md:mt-3'>
            <div {...getSlidesContainerProps()}>
                <div {...getSlideProps(0)} className='h-50 md:h-60 xl:h-70 flex justify-center items-center max-md:rounded-2xl overflow-hidden min-w-full'>
                    <Image className='max-md:rounded-2xl min-w-full' src={'/images/flat-lay-bowl-with-condiments.jpg'} width={10000} height={1000} alt={''} />
                    <div className='absolute max-md:rounded-2xl bg-black/35 min-w-full min-h-full'></div>
                </div>
                <div {...getSlideProps(1)} className='h-50 md:h-60 xl:h-70 flex justify-center items-center max-md:rounded-2xl overflow-hidden min-w-full'>
                    <Image className='max-md:rounded-2xl min-w-full' src={'/images/detail-rice-plant-sunset-valencia-with-plantation-out-focus-rice-grains-plant-seed.jpg'} width={10000} height={1000} alt={''} />
                    <div className='absolute max-md:rounded-2xl bg-black/35 min-w-full min-h-full'></div>
                </div>
                <div {...getSlideProps(2)} className='h-50 md:h-60 xl:h-70 flex justify-center items-center max-md:rounded-2xl overflow-hidden min-w-full'>
                    <Image className='max-md:rounded-2xl min-w-full' src={'/images/ricefield2.jpg'} width={10000} height={1000} alt={''} />
                    <div className='absolute max-md:rounded-2xl bg-black/35 min-w-full min-h-full'></div>
                </div>
                <div {...getSlideProps(3)} className='h-50 md:h-60 xl:h-70 flex justify-center items-center max-md:rounded-2xl overflow-hidden min-w-full'>
                    <Image className='max-md:rounded-2xl min-w-full' src={'/images/ricespoons.jpg'} width={10000} height={1000} alt={''} />
                    <div className='absolute max-md:rounded-2xl bg-black/35 min-w-full min-h-full'></div>
                </div>
            </div>

            <div className='absolute bottom-10 right-10 w-30 hidden md:block'>
                <button {...getArrowProps('prev')}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <button {...getArrowProps('next')}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>

            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-3">
                <button {...getDotProps(0)} />
                <button {...getDotProps(1)} />
                <button {...getDotProps(2)} />
                <button {...getDotProps(3)} />
            </div>
        </div>
        <div className='px-5 flex flex-wrap items-stretch justify-center md:gap-4 gap-2 max-w-320 w-full'>
            {tags.map((tag: Tag, i: number) => (
            <div key={tag.id} {...tagGetSliderProps()} className={`relative xl:max-w-45 md:max-w-40 sm:max-w-37 xs:max-w-33 max-w-30 overflow-hidden ${i === 1 ? "max-xs:hidden" : ""} hover:scale-102 transition`}>
                <div {...tagGetSlidesContainerProps()} className='flex h-full w-full'>
                {tag.images.map((image: any, index: any) => (
                    <Image key={image.id} {...tagGetSlideProps(index)} className='rounded-2xl h-full w-full' src={image.url} width={1000} height={1} alt={''} />
                ))}
                </div>
                <div className='w-full h-full absolute inset-0 bg-[#020202a2] rounded-2xl z-2'></div>
                <div className={`bg-gradient-to-r from-white via-white to-white bg-clip-text text-transparent md:p-4 p-3 z-3 w-full h-full rounded-2xl absolute bottom-0 flex flex-col justify-center items-center text-[0.8rem] xs:text-[0.9rem] sm:text-[1.3rem] md:text-[1.4rem] xl:text-[1.5rem] text-medium`}>
                {dict.product.categories[tag.label as keyof typeof dict.product.categories]}
                </div>
            </div>
            ))}
        </div>
    </div>
  )
}

export default MainView

'use client'
import useDataStore from '@/app/stores/dataStore'
import Image from 'next/image'
import Link from 'next/link'
import DepthCarousel from './components/DepthCarousel'

const Content = () => {
  
    const {dict, products, isRTL} = useDataStore()
  return (
    <div className={`bg-white min-h-screen ${isRTL && "text-right"}`}>
      <DepthCarousel />

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 max-md:px-10 items-center">
            <div>
              <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {dict.aboutSectionHeading}
              </h2>
              <p className="text-gray-700 leading-relaxed md:text-lg text-[0.9rem]">
                {dict.aboutSection}
              </p>
            </div>
            <div className="relative lg:h-full min-h-[200px] xl:min-h-[300px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/detail-rice-plant-sunset-valencia-with-plantation-out-focus-rice-grains-plant-seed.jpg" 
                alt="Rice fields in Northern Iran"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Products Section */}
      <section className="py-10 max-md:px-5 bg-gradient-to-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-16">
            {dict.productsSectionHeading}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {products.filter(product => product.id !== 10 && product.tagId === 1 ).map((product) => (
              <div key={product.id} style={{backgroundImage: `url(${product.images[0].url})`}} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow relative bg-center bg-cover after:min-w-full after:min-h-full after:absolute after:inset-0 after:bg-white/85 after:z-0">
                <div className={`p-8 relative z-1`}>
                  <div className="flex flex-col gap-8">
                    <h3 className="text-2xl font-bold text-gray-900">{dict.product.products[product.label as keyof typeof dict.product.products]}</h3>
                    <span className="text-[0.9rem] text-gray-700">{dict[product.label]}</span>
                  </div>
                  <button className="mt-10 w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-semibold transition-colors">
                    {dict.viewDetails}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Origin Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-md:px-10">
            <div className="relative lg:h-full min-h-[200px] xl:min-h-[300px] rounded-2xl overflow-hidden shadow-xl order-2 lg:order-1">
              <Image
                src="/images/ricefield2.jpg" 
                alt="Northern Iran landscape"
                fill
                className="object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {dict.originHeading}
              </h2>
              <p className="text-gray-700 leading-relaxed md:text-lg text-[0.9rem]">
                {dict.origin}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-600 to-teal-600 text-white min-w-[100vw]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl sm:text-4xl font-bold mb-6">
            Order Premium Iranian Rice Today
          </h2>
          <p className="text-[0.9rem] md:text-xl mb-8 text-emerald-50">
            Experience the authentic taste of Northern Iran delivered to your door
          </p>
          <Link href={'#mainView'}>
            <button className="bg-white text-emerald-800 px-10 py-4 rounded-lg text-lg font-bold hover:bg-emerald-50 transition-colors shadow-lg">
              {dict.shopNow}
            </button>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Content


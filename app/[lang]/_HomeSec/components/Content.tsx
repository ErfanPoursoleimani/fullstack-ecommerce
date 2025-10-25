'use client'
import useDataStore from '@/app/stores/dataStore'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Content = () => {
    const {dict, products, isRTL} = useDataStore()

    {/* <div>
      <h1>{dict.mainHeading}</h1>
      <p></p>
      <h2></h2>
      <p></p>
      <h2></h2>

      <h2></h2>
      <p></p>
      
      <h2></h2>
      <p></p>
      <h2></h2>
      <p></p>
    </div> */}
  return (
    <div className={`min-h-screen bg-white ${isRTL && "text-right"}`}>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-cyan-50 via-blue-50 to-teal-50 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/rice-pattern.svg')] opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              {dict.mainHeading.split(' - ')[0]}
            </h1>
            <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto mb-8 leading-relaxed">
              {dict.mainSection}
            </p>
{/*             <div className="flex flex-wrap justify-center gap-4 mb-10">
              {dict.features.map((feature, index) => (
                <span key={index} className="bg-white px-6 py-2 rounded-full text-sm font-medium text-emerald-700 shadow-sm border border-emerald-100">
                  {feature}
                </span>
              ))}
            </div> */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={'#mainView'}>
                  <button className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors shadow-lg">
                    Shop Our Collection
                  </button>
              </Link>
{/*               <button className="bg-white hover:bg-gray-50 text-emerald-700 px-8 py-4 rounded-lg text-lg font-semibold transition-colors border-2 border-emerald-600">
                Learn More
              </button> */}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                {dict.aboutSectionHeading}
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {dict.aboutSection}
              </p>
            </div>
            <div className="relative h-96 lg:h-full min-h-[400px] rounded-2xl overflow-hidden shadow-xl">
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
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-16">
            {dict.productsSectionHeading}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {products.filter(product => product.id !== 10 && product.tagId === 1 ).map((product) => (
              <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-64">
                  <Image 
                    src={product.images[0].url} 
                    alt={dict[product.label]}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-8">
                  <div className="flex flex-col gap-5 mb-4">
                    <h3 className="text-2xl font-bold text-gray-900">{dict.product.products[product.label]}</h3>
                    <span className="text-[0.9rem] text-gray-500">{dict[product.label]}</span>
                  </div>
                  <button className="mt-6 w-full bg-cyan-600 hover:bg-cyan-700 text-white py-3 rounded-lg font-semibold transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Difference Section */}
{/*       <section className="py-20 bg-emerald-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">
            {dict.ourDifferenceHeading}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dict.ourDifference}
          </div>
        </div>
      </section> */}

      {/* Origin Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-96 lg:h-full min-h-[400px] rounded-2xl overflow-hidden shadow-xl order-2 lg:order-1">
              <Image 
                src="/images/detail-rice-plant-sunset-valencia-with-plantation-out-focus-rice-grains-plant-seed.jpg" 
                alt="Northern Iran landscape"
                fill
                className="object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                {dict.originHeading}
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {dict.origin}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-600 to-teal-600 text-white min-w-[100vw]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Order Premium Iranian Rice Today
          </h2>
          <p className="text-xl mb-8 text-emerald-50">
            Experience the authentic taste of Northern Iran delivered to your door
          </p>
          <Link href={'#mainView'}>
            <button className="bg-white text-emerald-700 px-10 py-4 rounded-lg text-lg font-bold hover:bg-emerald-50 transition-colors shadow-lg">
              Shop Now
            </button>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Content

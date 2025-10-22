'use client'
import Footer from '../_components/Footer';
import MainView from './components/MainView';
import ProductsSection from './components/ProductsSection';

const HomeSec = () => {


  return (
    <div className='flex flex-col items-center'>
      <MainView />
      <ProductsSection />
      <Footer />
    </div>
  )
}

export default HomeSec

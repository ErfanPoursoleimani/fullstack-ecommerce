'use client'
import Footer from '../_components/Footer';
import Content from './components/Content';
import MainView from './components/MainView';
import ProductsSection from './components/ProductsSection';

const HomeSec = () => {


  return (
    <div className='flex flex-col items-center'>
      <MainView />
      <ProductsSection />
      <Content />
      <Footer />
    </div>
  )
}

export default HomeSec

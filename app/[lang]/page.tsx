'use client'
import { useAuthStore } from "../stores/authStore";
import Footer from "./_components/general/Footer";
import MainView from "./_HomeSec/MainView";
import ProductsSection from "./_HomeSec/ProductsSection";
import Content from "./_HomeSec/Content";


const page = () => {
  const { role } = useAuthStore()

  return (
    <div className={`flex flex-col items-center relative top-[103px] ${role === "USER" || !role ? "max-md:top-[55px]" : ""}`}>
      <MainView />
      <ProductsSection />
      <Content />
      <Footer />
    </div>
  )
}

export default page
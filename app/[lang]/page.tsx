'use client'
import { useAuthStore } from "../stores/authStore";
import HomeSec from "./_HomeSec/HomeSec";


const page = () => {
  const { role } = useAuthStore()

  return (
    <div className={`relative top-[103px] ${role === "USER" || !role ? "max-md:top-[55px]" : ""}`}>
      <HomeSec />
    </div>
  )
}

export default page
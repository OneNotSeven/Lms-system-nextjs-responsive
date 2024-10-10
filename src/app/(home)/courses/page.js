"use client"
import React, { useState } from 'react'
import Cards from '@/app/_Components/Cards'
import Enrolledcard from '@/app/_Components/Enrolledcard'


const Page = () => {
  const [change, setchange] = useState("")
  
  return (
    <div className=' w-full h-full p-4'>
      <div>

      <select className=' float-end w-28 px-2 font-[Poppins] border-0' onChange={(e)=>setchange(e.target.value)}>
        <option selected value="Currently">Currently</option>
        <option value="Enrolled">Enrolled</option>
      </select>
      </div>
      {change != "Enrolled" && <Cards />}
      {change == "Enrolled" && <Enrolledcard />}
      
    </div>
  )
}

export default Page

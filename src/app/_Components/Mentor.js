import Link from 'next/link'
import React from 'react'

const Mentor = () => {
  // "navbar"
  return (
    <>
  
          <div>
              
          <nav className="top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
  <div className="px-3 py-3 lg:px-5 lg:pl-3">
    <div className="flex items-center justify-between">
      <div className="flex items-center w-full sm:w-full justify-between rtl:justify-end">
        <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
            <span className="sr-only">Open sidebar</span>
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
               <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
            </svg>
         </button>
        <Link href="/" className="flex ms-2 md:me-24">
                  {/* <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 me-3" alt="FlowBite Logo" /> */}
                  
                 
          <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap font-[Poppins] text-[#d42eeb]">Quest Castle</span>
                              </Link>

                              
    
                              <Link href='/stdashboard' className='flex items-center justify-center gap-1'>
                <div className='teacher  focus:ring-1 focus:ring-gray-500 mr-6 pl-3 pr-3 pt-1 pb-1 text-sm font-semibold text-[#6c5d5d] bg-[#f78dff] rounded'>
                  <span className='font-[Poppins] gap-2 text-white flex justify-center items-center '><svg class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2"/>
</svg>
Exit</span>
                </div></Link>
                          </div>
                          
                          
                          
     
    </div>
  </div>
</nav>
      </div>
      </>
  )
}

export default Mentor
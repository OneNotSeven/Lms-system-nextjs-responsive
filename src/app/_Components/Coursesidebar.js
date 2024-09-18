"use client";

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';


const Coursesidebar = ({ courselist, price,courseid,videoid }) => {
  


 

  return (
    <div>

        { courselist?<motion.aside initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }} id="logo-sidebar" className="top-0 left-0 z-40 w-64 h-screen pt-8 transition-transform -translate-x-0 font-[Poppins] border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
        <div className="h-full px-3 pb-4 overflow-y-auto dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <div className='flex gap-1 w-full text-[#d42eeb] rounded-lg'>
            <svg class="w-6 h-6 text-[#d42eeb] dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  <path fill-rule="evenodd" d="M5 6a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1Zm0 12a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1Zm1.65-9.76A1 1 0 0 0 5 9v6a1 1 0 0 0 1.65.76l3.5-3a1 1 0 0 0 0-1.52l-3.5-3ZM12 10a1 1 0 0 1 1-1h5a1 1 0 1 1 0 2h-5a1 1 0 0 1-1-1Zm0 4a1 1 0 0 1 1-1h5a1 1 0 1 1 0 2h-5a1 1 0 0 1-1-1Z" clip-rule="evenodd"/>
</svg>
<span>All Playlist</span>
            </div>
            <div className='flex flex-col gap-3 mt-3'>

            {courselist.map((items, idx) => (
              <Link key={idx} href={price === "free" ? `/courses/${courseid}/${items._id}` : "#"} className="flex items-center text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <li className={`flex ${videoid==items._id?"bg-[#ffc0f7] text-[#fff]":"bg-none text-gray-600"} gap-1 p-1 w-full items-center hover:text-white rounded-lg dark:text-white hover:bg-[#ffc0f7] dark:hover:bg-gray-700 group`}>
                  {price === "free" ? (
                    <svg class="w-6 h-6 text-gray-600 hover:text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor"strokeLinecap="round"strokeLinejoin="round"strokeWidth="2" d="M8 16.881V7.119a1 1 0 0 1 1.636-.772l5.927 4.881a1 1 0 0 1 0 1.544l-5.927 4.88A1 1 0 0 1 8 16.882Z"/>
                  </svg>
                     
                  ) : (
                    <svg className='w-5 h-5' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M7 10.0288C7.47142 10 8.05259 10 8.8 10H15.2C15.9474 10 16.5286 10 17 10.0288M7 10.0288C6.41168 10.0647 5.99429 10.1455 5.63803 10.327C5.07354 10.6146 4.6146 11.0735 4.32698 11.638C4 12.2798 4 13.1198 4 14.8V16.2C4 17.8802 4 18.7202 4.32698 19.362C4.6146 19.9265 5.07354 20.3854 5.63803 20.673C6.27976 21 7.11984 21 8.8 21H15.2C16.8802 21 17.7202 21 18.362 20.673C18.9265 20.3854 19.3854 19.9265 19.673 19.362C20 18.7202 20 17.8802 20 16.2V14.8C20 13.1198 20 12.2798 19.673 11.638C19.3854 11.0735 18.9265 10.6146 18.362 10.327C18.0057 10.1455 17.5883 10.0647 17 10.0288M7 10.0288V8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8V10.0288" stroke="#000000" stroke-width="1.584" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                  )}
                  <span className="truncate capitalize">{items.chaptername}</span>
                </li>
              </Link>
            ))}
            </div>
          </ul>
        </div>
      </motion.aside>:null}
    </div>
  );
};

export default Coursesidebar;

"use client"

import Followinglist from '@/app/_Components/Followinglist'
import { appBaseUrl } from '@/schema/appurl'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation'


const Pages = () => {
  const router=useRouter()
  const [data, setData] = useState([]); // Initialize with an empty array
 
  const [text, setText] = useState("Quest Castle");
  const [displayedText, setDisplayedText] = useState('');
  const typingSpeed = 100; // Time in milliseconds between each character

  var i = 0;
  useEffect(() => {
    const timer = setInterval(() => {
      document.getElementById("demo").innerHTML += text.charAt(i);
       i++;
      if (i >= text.length) {
        clearInterval(timer);
      }
    }, typingSpeed);
  

    return () => clearInterval(timer);
  }, []);

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${appBaseUrl}/api/gettutor/123`, {
          method: "GET",
        });
        const result = await response.json();
        // console.log("rec", result);
        setData(result.message || []); // Ensure data.message is an array
      } catch (error) {
        // console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  
  console.log("rec", data);

  return (
    <>
      <div style={{    background: 'linear-gradient(140deg, #fce2ff14, #f7cefd29)'}} className='w-full flex flex-col gap-6'>
        <div style={{background: 'linear-gradient(110deg, #e278ef, #ffa2f2)'}} className=' h-[180px] rounded-xl m-4 pl-4 text-[#1f1e1e] flex sm:gap-8 sm:flex-row justify-center sm:justify-start items-center flex-col'>
          <div className='w-[126px] mr-8 sm:w-fit sm:mr-0'>

          <img src='clip-pics-of-animated-cartoons-8-removebg-preview.png' className=' mix-blend-luminosity filter drop-shadow-md shadow-purple-500' width={164} alt="Decorative" />
          </div>
          <div className='flex flex-col justify-center'>
            <h1 className='text-[#fafafa] md:text-[36px] text-[16px] sm:text-[24px] font-semibold font-[Poppins] '>
              Welcome To { ' '} <motion.span
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                id="demo"
        className='text-[#fafafa] font-semibold font-[Poppins] '
      >
       {displayedText}
      </motion.span>
            </h1>
            <span className='font-semibold text-white font-[poppins] tracking-wide text-[8px] sm:text-[16px] '>Thunder of knowledge,wisdom and prosperity</span>
          </div>
        </div>
        <div className='flex items-center gap-10'>
          
          <h2 className='text-2xl font-semibold text-[#d42eeb] ml-4 mt-3'>Recommendation</h2>
          <div className='hidden sm:block'>

          <div style={{background: 'linear-gradient(110deg, #e278ef, #ffa2f2)'}} className=" flex gap-3 rounded-2xl px-4 h-fit py-1 items-center justify-center mt-3">
          <svg class="w-6 h-6 text-[#fff] dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m16 10 3-3m0 0-3-3m3 3H5v3m3 4-3 3m0 0 3 3m-3-3h14v-3"/>
</svg>

      <p  className="text-white text-sm font-medium font-[Poppins] ">suggestion based on your interest</p>
    </div>
          </div>
</div>
        
        <div className='flex gap-4 mt-5 justify-center items-center'>
          {data.length>0?<div className='w-full overflow-auto md:overflow-x-auto'>
           
            <div className='flex flex-col sm:flex-row gap-4 pl-4'>
              {data.map((item, idx) => (
                <Link key={idx} href={`/courses/${item.courseId}/${item?.videosrc[0]?._id}`} className='cursor-pointer'>

                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    whileHover={{ scale: 1.05 }}
                    className="rounded-lg w- overflow-hidden shadow-md border border-gray-200 dark:bg-gray-800 dark:border-gray-700 max-w-sm w-full sm:w-[300px] lg:w-[350px]"
                  >
                    <div className='w-full h-[198px] overflow-hidden'>
                      <img
                        className="w-full h-full object-cover rounded-t-lg"
                        src={item?.thumbnail || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXl6KGuzV6r5kgfQHXABWdrL9OZR1tTGMBLw&s"}
                        alt="course thumbnail"
                      />
                    </div>
                    <div className='p-5'>
                      <div className='flex flex-col gap-2'>
                        <div className='flex items-center justify-between'>
                          <h5 className="text-lg font-bold text-[#d42eeb] dark:text-white truncate capitalize">{item?.courseName}</h5>
                          <ul className='flex'>

                            {
                              [1, 2, 3, 4, 5].map((items,idx) => (
                                <svg key={idx} class="w-4 h-4 fill-yellow-500 text-yellow-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                  <path stroke="currentColor" stroke-width="2" d="M11.083 5.104c.35-.8 1.485-.8 1.834 0l1.752 4.022a1 1 0 0 0 .84.597l4.463.342c.9.069 1.255 1.2.556 1.771l-3.33 2.723a1 1 0 0 0-.337 1.016l1.03 4.119c.214.858-.71 1.552-1.474 1.106l-3.913-2.281a1 1 0 0 0-1.008 0L7.583 20.8c-.764.446-1.688-.248-1.474-1.106l1.03-4.119A1 1 0 0 0 6.8 14.56l-3.33-2.723c-.698-.571-.342-1.702.557-1.771l4.462-.342a1 1 0 0 0 .84-.597l1.753-4.022Z" />
                                </svg>

                              ))
                            }
                          </ul>
                               
                        </div>
                        {/* <p className="text-sm text-gray-700 dark:text-gray-400">{item?.courseDesc}</p> */}
                        <div className='flex justify-between items-center text-sm text-gray-600 dark:text-gray-400 gap-2'>
                          <div className='flex items-center gap-1'>

                            <svg
                              className="w-6 h-6 text-[#882096] dark:text-white"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 6.03v13m0-13c-2.819-.831-4.715-1.076-8.029-1.023A.99.99 0 0 0 3 6v11c0 .563.466 1.014 1.03 1.007 3.122-.043 5.018.212 7.97 1.023m0-13c2.819-.831 4.715-1.076 8.029-1.023A.99.99 0 0 1 21 6v11c0 .563-.466 1.014-1.03 1.007-3.122-.043-5.018.212-7.97 1.023"
                              />
                            </svg>
                            <p className='font-semibold text-sm capitalize w-full'><span className='flex font-semibold font-[Poppins] text-[#be2dd1]'>{item?.videosrc?.length} chapters</span></p>
                          </div>
                          <Link href={`/teacherprofile/${item.userId}`}>
                            <div className='flex gap-1 '>
                              <svg class="w-5 h-5 text-gray-800 fill-purple-700 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z" clip-rule="evenodd" />
                              </svg>

                              <span className='font-[Poppins] capitalize text-gray-600'>{item.tutorName}</span></div>
                          </Link>
                        </div>
                      </div>
                      <hr className='mt-3 mb-3' />
                      <span className=' capitalize font-semibold font-[Poppins] text-[#a127b2]'>{item.price != "free" ? "₹" + item?.price : item?.price}
                       
                      </span>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>:
<div role="status">
    <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-[#d42eeb]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span class="sr-only">Loading...</span>
</div>
}
          
          {/* <div className='bg-purple-600 w-[280px] ml-1 rounded-2xl'>
      
          </div> */}
        </div>
        
        <div className='flex justify-between items-center mt-8 pr-4'>
          <h2 className='ml-4 text-2xl font-semibold text-[#d42eeb]'>Your Mentor</h2>
        </div>
        
        <Followinglist />
      </div>
    </>
  )
}

export default Pages;

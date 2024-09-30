"use client"
import Follow from '@/app/_Components/Follow'
import { appBaseUrl } from '@/schema/appurl'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const Page = (content) => {

  
   const [tutorDetails, settutorDetails] = useState([])
  const [fetchTutotCourses, setfetchTutotCourses] = useState([])

  useEffect(() => {

   

    const fetching = async () => {
      try {
       
        const tutor= await fetch(`${appBaseUrl}/api/teacherprofileedit`, {
          method: "Post",
          body:JSON.stringify({profileId:content.params.userprofile})
        })

        const tutorRes = await tutor.json()

        const tutorCourses= await fetch(`${appBaseUrl}/api/gettutor`, {
          method: "Post",
          body:JSON.stringify({userId:content.params.userprofile})
        })
        const mainRes=await tutorCourses.json()

        
        if (tutorRes.success == true) {
          
          settutorDetails([...tutorRes.message])
        } else {
          settutorDetails([])
        }

        if (mainRes.success == true) {
          setfetchTutotCourses([...mainRes.message])
        } else {
          setfetchTutotCourses([])
        }

      } catch (error) {
        // console.log(error)
      }
    }
    fetching()
    
  }, [])
  const sendEmail = (email) => {
    // console.log("click")
    const gmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`;
    window.open(gmail, "_blank");
  }
  console.log(fetchTutotCourses)
  return (
      <>
      



<main class="bg-gray-100 bg-opacity-25 font-[Poppins]">

  <div class="lg:w-8/12 lg:mx-auto mb-8">

          {
            tutorDetails.map((items) => (
              <>
              <header class="flex flex-wrap items-center p-4 md:py-8">

<div class="md:w-3/12 md:ml-16">
  {/* <!-- profile image --> */}
  <img class="w-20 h-20 md:w-40 md:h-40 object-cover rounded-full
               border-2 border-[#d42eeb] p-1" src={items?.image} alt="profile"/>
</div>

{/* <!-- profile meta --> */}
<div class="w-8/12 md:w-7/12 ml-4">

  {/* <!-- post, following, followers list for medium screens --> */}
  <ul class="flex space-x-8 mb-4">
    <li>
                        <span class="font-semibold">{ fetchTutotCourses?.length}</span> courses
    </li>

    <li>
                        <span class="font-semibold">{ items?.followers?.length}</span> Student
                      </li>
                      <div className='flex justify-between'>
                        <div className='flex gap-2'>

                       
                        </div>

                      </div>
  </ul>

  {/* <!-- user meta form medium screens --> */}
  <div class="block">
                      <h1 class="font-semibold capitalize text-[12px] md:text-[16px]">{items?.name} { items?.lastname}</h1>
                      <span className=' text-gray-500 text-[12px] md:text-[16px]'>{ items?.profession}</span>
                      <p className='text-[12px] md:text-[16px]'>{ items?.bio}</p>
  </div>
                    <div className='w-full flex gap-2 h-fit mt-4'>
                      
                      <Follow data={content.userId} teacherid={ items.userId} />
                      {items?.email ? <button  onClick={() => { sendEmail(items.email) }} className=' bg-[#deecdb] text-gray-600 w-full h-fit rounded-xl flex items-center justify-center p-1 gap-2'> <svg className=" w-5 h-5 sm:w-6 sm:h-6 text-gray-600 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 0 0-2 2v4m5-6h8M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m0 0h3a2 2 0 0 1 2 2v4m0 0v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6m18 0s-4 2-9 2-9-2-9-2m9-2h.01" />
                      </svg><span className='text-gray-600 text-[12px] md:text-[16px] '>Email</span></button> : null}
</div>
</div>

{/* <!-- user meta form small screens --> */}


</header>
            <div>
                <h2 class="text-2xl font-semibold text-gray-600 mb-4">All Courses</h2>
                  {fetchTutotCourses.length!=0 ? <div class="flex flex-wrap mx-4 mb-4 gap-3">
                    {fetchTutotCourses.map((item, idx) => (
                <Link key={idx} href={`/courses/${item.courseId}/${item?.videosrc[0]?._id}`}  className='cursor-pointer' onClick={() => {
                  addCart(item.userId, item.courseId)
                
                }
                  }>

                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    whileHover={{ scale: 1.05 }}
                    className="rounded-lg  overflow-hidden shadow-md border border-gray-200 dark:bg-gray-800 dark:border-gray-700 max-w-sm w-[200px] h-[250px] sm:w-[300px] sm:h-fit lg:w-[350px]"
                  >
                    <div className='w-full h-[120px] sm:h-[198px] overflow-hidden'>
                      <img
                        className="w-full h-full object-cover rounded-t-lg"
                        src={item?.thumbnail || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXl6KGuzV6r5kgfQHXABWdrL9OZR1tTGMBLw&s"}
                        alt="course thumbnail"
                      />
                    </div>
                    <div className='p-5'>
                      <div className='flex flex-col gap-2'>
                        <div className='flex items-center justify-between'>

                          <h5 className=" font-bold text-[#d42eeb] dark:text-white truncate sm:text-[18px] text-[12px] capitalize">{item?.courseName}</h5>
                         

                          <ul className='flex'>

                            {
                              [1, 2, 3, 4, 5].map((items,idx) => (
                                <svg key={idx} className="sm:w-4 sm:h-4 w-3 h-3  fill-yellow-500 text-yellow-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
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
                            <p className='font-semibold sm:text-[14px] text-[10px] capitalize w-full'><span className='flex font-semibold font-[Poppins] text-[#be2dd1]'>{item?.videosrc?.length} chapters</span></p>
                          </div>
                          <Link href={`/teacherprofile/${item.userId}`}>
                            <div className='flex gap-1 '>
                              <svg class="w-5 h-5 text-gray-800 fill-purple-700 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z" clip-rule="evenodd" />
                              </svg>

                              <span className='font-[Poppins] capitalize sm:text-[14px] text-[10px] text-gray-600'>{item.tutorName}</span></div>
                          </Link>
                        </div>
                      </div>
                      <hr className='mt-3 mb-3' />
                      <span className=' capitalize font-semibold font-[Poppins] text-[12px] sm:text-[16px] text-[#a127b2]'>{item.price != "free" ? "₹" + item?.price : item?.price}
                       
                      </span>
                    </div>
                  </motion.div>
                </Link>
              ))}
                  </div> : <p className='text-gray-400'>No courses</p>}
</div>
              </>
            ))
    }
    
              </div>
</main>

      </>
  )
}

export default Page

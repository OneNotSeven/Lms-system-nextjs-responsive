"use client"
import Follow from '@/app/_Components/Follow'
import { appBaseUrl } from '@/schema/appurl'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'


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
                  {fetchTutotCourses.length!=0 ? <div class="flex flex-col mx-4 mb-4 gap-3">
                    {
                      fetchTutotCourses?.map((items, idx) => (
                        <>
                          <Link href={`/courses/${items.courseId}/${items.videosrc[0]._id}`}>
                          
                          <div className='w-full'>
                                
                              <div className='w-full shadow-md rounded-xl'>

                                <div id="defaultTabContent" className='bg-[#f8f0f0] p-7 rounded-3xl flex md:flex-row flex-col gap-2 md:gap-9 items-center w-full'>
                                  <div className='md:w-[10vw] md:h-[9vw] w-full h-full flex object-cover object-center overflow-hidden rounded-md'>
                                <div id="defaultTabContent" className='bg-[#f8f0f0] p-7 rounded-3xl flex gap-9 items-center w-full'>
                                  <div className='w-[200px] h-[140px] flex object-cover object-center overflow-hidden rounded-md'>

                                    <img className='flex object-cover object-center' src={items?.thumbnail || "/profiledummy.png"} width={500} height={500} alt="Picture of the author" />
                                  </div>
                                  <div className="rounded-lg dark:bg-gray-800" id="about" role="tabpanel" aria-labelledby="about-tab">
                  
                                    <h2 className="mb-3 text-[12px] md:text-[1.2vw] font-semibold tracking-tight text-gray-900 dark:text-white">{items?.courseName}</h2>
                                    <p className="mb-3 text-gray-500 text-[12px] md:text-[0.8vw] dark:text-gray-400">{items?.courseDesc}</p>

                                    <div className='tag mt-3'><span className='pl-3 pr-3 p-1 text-[8px] md:text-[0.7vw] text-[#d42eeb] rounded-full font-semibold border-2 border-[#d42eeb]'>{items?.tags}</span></div>
                                    <div className='flex items-center gap-2'>
                        
                                      <span className="inline-flex text-[8px] md:text-[0.9vw] items-center mt-3 font-medium text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-700">
                                        Learn more
                                        <svg className=" w-2.5 h-2.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                                        </svg>
                                      </span>
                      
                                    </div>
                                  </div>

      
                                </div>
                              </div>
                           
                            </div>
                              </div>
                              </div>
                          </Link>
                        </>
                          
                      ))
                    }
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

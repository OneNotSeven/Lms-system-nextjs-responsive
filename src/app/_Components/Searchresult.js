"use client";
import { appBaseUrl } from '@/schema/appurl';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';


const Searchresult = ({ query }) => {
  const router=useRouter()
    const [searchResults, setSearchResults] = useState([]);
    const [userId, setUserId] = useState("");
    const [loader, setloader] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Token verification
                const verifyResponse = await fetch(`${appBaseUrl}/api/tokengetter`, {
                    method: "POST"
                });
                const responseVerify = await verifyResponse.json();
                setUserId(responseVerify.verifytoken.userid);

                // Fetch search results
                if (query) {
                    setloader(true)
                    const resultQuery = await fetch(`${appBaseUrl}/api/getresult/${query}`, {
                        method: "GET",
                    });
                    const queryRes = await resultQuery.json();
                    if (queryRes.success) {
                        setloader(false)
                        setSearchResults(queryRes.message);
                        
                      
                    } else {
                        setloader(false)
                        // console.error('Failed to fetch search results:', queryRes.message);
                    }
                }
            } catch (error) {
                setloader(false)
                // console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [query]); // Only re-run the effect if `query` changes


    const addCart = async (teacherId, courseId) => {
        try {
            const cartRes = await fetch(`${appBaseUrl}/api/studentcart`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId: userId, teacherId: teacherId, courses: { courseId: courseId } })
            });
            const effort = await cartRes.json();
            // console.log("Cart response:", effort);
        } catch (error) {
            // console.error('Error adding to cart:', error);
        }
    };
    // console.log("get url output",searchResults)

    return (
        <>
            <div className='w-full flex flex-col items-center gap-8'>
                <div className='w-[80%] mt-11 flex justify-start items-center gap-12'>
                    <span className='font-semibold font-[Poppins] text-[#d42eeb]'>All</span>
                    <div className='flex gap-2'>
                        {["physics", "chemistry", "astrology", "engineering", "mechanics", "music", "Computer Science", "Photography"].map((item, idx) => (
                            <>
                            
                            
                            <Link key={idx} href={`/search/search?query=${item}`}>
                            <div key={idx} className="relative rounded-2xl group cursor-pointer hover:bg-pink-400 flex gap-4 items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 group border-2 border-[#d42eeb]   hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-purple-800">
                                <span className="relative px-5 py-1 text-center transition-all ease-in duration-75 text-[#d42eeb] dark:bg-gray-900 group-hover:text-white  font-[Poppins]">
                                    {item}
                                </span>
                            </div>
                            </Link>
                           
                            </>
                        ))}
                    </div>
                </div>
                <div className='w-full flex justify-center'>
                    {searchResults?.length > 0 ? <div className="w-fit mt-0 mb-0 ml-[130px] mr-[130px] pl-20 flex flex-wrap justify-start gap-4 items-center">
                        {searchResults.map((item) => (
                          <Link href={`/courses/${item.courseId}/${item?.videosrc[0]?._id}`} key={item?._id} onClick={() => {
                            addCart(item.userId, item.courseId)
                          
                          }
                            } className='cursor-pointer'>
                               <motion.div
                    key={item._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    whileHover={{ scale: 1.05 }}
                    className="rounded-lg overflow-hidden shadow-md border border-gray-200 dark:bg-gray-800 dark:border-gray-700 max-w-sm w-full sm:w-[300px] lg:w-[350px]"
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
                          <h5 className="text-lg truncate font-bold text-[#d42eeb] dark:text-white capitalize">{item?.courseName}</h5>
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

                              <span className=' capitalize text-gray-600 font-[Poppins]'>{item.tutorName}</span></div>
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
                    </div> : <>
                            {searchResults.length<=0 && loader==false?<p>no result found</p>:null}
                            { loader==true?
<div role="status">
    <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-[#d42eeb]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span class="sr-only">Loading...</span>
</div>
                                : null}
                            
                    </>}
                </div>
            </div>
        </>
    );
};

export default Searchresult

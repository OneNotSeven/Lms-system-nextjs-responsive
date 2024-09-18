"use client"
import { appBaseUrl } from '@/schema/appurl'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Link from 'next/link'


const Followinglist = () => {
    const [events, setEvents] = useState([]);
    const [userid, setUserId] = useState(null);
    const [list, setList] = useState([]);
    const [loader, setloader] = useState(false)

    useEffect(() => {
        const jwtVerify = async () => {
            try {
                const responseVerify = await fetch(`${appBaseUrl}/api/tokengetter`, {
                    method: "POST",
                });
                const data = await responseVerify.json();

                if (data.success==true) {
                    setUserId(data.verifytoken.userid);
                }
            } catch (error) {
                // console.error("Error verifying token:", error);
            }
        };

        jwtVerify();
    }, []);

    useEffect(() => {
        if (userid === null) return; 

        const fetchList = async () => {
            try {
                setloader(true)
                const response = await fetch(`${appBaseUrl}/api/getlistfollowing`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userId: userid }),
                });
                const data = await response.json();

                if (data.success) {
                    setloader(false)
                    setList(data.message);
                    setEvents(data.message.flatMap(item => item.Events))
                    
                } else {
                    setloader(false)
                    setList([]);
                }
            } catch (error) {
                setloader(false)
                console.error("Error fetching list:", error);
                setList([]);
            }
        };

        fetchList();
    }, [userid]);

    return (
        <div className='flex flex-col'>
        
        
        <div className='flex mt-4 justify-center items-center'>
               
                    <div className='flex flex-wrap gap-3 w-full'>
                    
                        <motion.div
                            className="flex flex-col items-center p-4 w-full"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="p-6 shadow-lg rounded-lg border border-gray-200 flex w-full">
                                <div className="flex items-center space-x-4 mb-6 w-full">
                                    <div className="relative w-28 h-28">
                                        <Image
                                            src="/profiledummy.png"
                                            alt="Profile picture"
                                            layout="fill"
                                            className="rounded-full border-4 border-[#d42eeb]"
                                        />
                                
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-semibold text-[#d42eeb] font-[Poppins]">Welcome</h2>
                                        <p className="text-sm text-[#ae29c0] font-[Poppins]">Continue Your Journey And Achieve Your Target</p>
                                    </div>
                                </div>
                             
                                <div className='w-full'>
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-lg font-semibold  text-[#d42eeb]">Your Mentor</h3>
                                        <Link href="/following">
                                            <button className="text-[#d42eeb] hover:underline font-[poppins]">
                                                See All
                                            </button>
                                        </Link>
                                    </div>
                                {list.length > 0 ? <div className="space-y-4">
                                    {list.map((mentor, index) => (
                                        <div key={index} className="flex items-center justify-between">
                                            <div className="flex items-center space-x-3 ">
                                                <div className='rounded-full border-2 border-[#d42eeb] overflow-hidden p-[2px]'>


                                                <Image
                                                    src="/profiledummy.png"
                                                    alt={`${mentor.name}'s profile picture`}
                                                    width={40}
                                                    height={40}
                                                    className="object-cover rounded-full"
                                                />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-[#d42eeb] capitalize font-[Poppins]">{mentor.name}</p>
                                                    <p className="text-sm text-[#a829b9] font-['SUSE']">{mentor.profession}</p>
                                                </div>
                                            </div>
                                            <Link href={`/teacherprofile/${mentor.userId}`}>
                                                <button className="rounded-full hover:bg-[#d42eeb] hover:text-white text-[#d42eeb] border border-[#c43dd5] font-[Poppins] text-[14px] py-1 px-3">
                                                    Profile
                                                </button>
                                            </Link>
                                        </div>
                                    ))}
                                </div> :<>
                    {list.length<=0 && loader==false?<p>No mentor available</p>:null}
                    {loader==true?
                        <div role="status">
                            <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-[#d42eeb]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                            </svg>
                            <span className="sr-only">Loading...</span>
                        </div>
                        :null}
                    </> }
                                </div>
                            </div>
                        </motion.div>
                
                    </div>
               
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
  <h1 className="text-3xl font-[Poppins] text-[#d42eeb] font-semibold mb-8">Upcoming Events</h1>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    
          { 

            events.map((items,idx) => (
              <div key={idx} className="font-[Poppins] shadow-md rounded-lg overflow-hidden">
              <div className="p-6">
                        <h2 className="text-xl font-semibold capitalize text-[#d42eeb] mb-2">{items?.title}</h2>
                        <div className="flex items-center mb-4">
                  <svg className=" w-6 h-6 text-[#e64cfb] dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m7 16 4-4-4-4m6 8 4-4-4-4"/>
</svg>

                    <span className="text-muted-foreground">{ items?.category}</span>
                </div>
                <div className="flex items-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5 mr-2 text-[#e64cfb]"
                  >
                    <path d="M8 2v4"></path>
                    <path d="M16 2v4"></path>
                    <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                    <path d="M3 10h18"></path>
                  </svg>
                    <span className="text-muted-foreground">{ items?.Date}</span>
                  </div>
                  
                
                <div className="flex items-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5 mr-2 text-[#e64cfb]"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                    <span className="text-muted-foreground">{ items?.location}</span>
                </div>
                <p className="text-muted-foreground">
                    { items?.description}
                </p>
              </div>
              
            </div>
           )) 
          }
  </div>
</div>
            </div>
    );
}

export default Followinglist;

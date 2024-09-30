"use client"
import { appBaseUrl } from '@/schema/appurl'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const Page = () => {
    const [userid, setUserId] = useState(null);
    const [list, setList] = useState([]);

    useEffect(() => {
        const jwtVerify = async () => {
            try {
                const responseVerify = await fetch(`${appBaseUrl}/api/tokengetter`, {
                    method: "POST",
                });
                const data = await responseVerify.json();

                if (data.success) {
                    setUserId(data.verifytoken.userid);
                }
            } catch (error) {
                // console.error("Error verifying token:", error);
            }
        };

        jwtVerify();
    }, []);

    useEffect(() => {
        if (userid === null) return; // Prevent fetching if userid is not available

        const fetchList = async () => {
            try {
                const response = await fetch(`${appBaseUrl}/api/getlistfollowing/getallfollowing`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userId: userid }),
                });
                const data = await response.json();

                if (data.success==true) {
                    setList(data.message);
                } else {
                    setList([]);
                }
            } catch (error) {
                // console.error("Error fetching list:", error);
                setList([]);
            }
        };

        fetchList();
    }, [userid]);

    return (
        <div style={{    background: 'linear-gradient(140deg, #d357e414, #c75fd529)'}} className='flex flex-col w-full p-6 font-[Poppins] '>
            <h2 className=' text-2xl mb-3 font-semibold text-[#d42eeb]'>All Following</h2>
            {list.length > 0 ? (
                <div className='flex gap-2 flex-col w-full'>
                    {list.map((items,idx) => (
                      <Link key={idx} href={`/teacherprofile/${items.userId}`}>
                      <div className='w-full'>
                            <div className='flex gap-5 p-3 bg-[#d357e414] rounded-xl w-full sm:w-[90%]'>
                                <img className='w-24 h-24 mb-3 rounded-full shadow-lg"' src={items?.image} alt="profile" />
                                <div>
                                    <span className='font-semibold text-[#d42eeb] text-[12px] sm:text-[16px]'>{items?.name} { items?.lastname}</span>
                                    <p className='text-gray-400 text-[12px] sm:text-[16px]'>{items.profession}</p>
                                    <p className=' text-gray-700 text-[12px] sm:text-[16px]'>{ items?.bio}</p>
                                </div>
                            </div>
                       </div>
                      </Link> 
                       
                    ))}
                </div>
            ) : (
                <p>empty</p>
            )}
        </div>
    );
}

export default Page;

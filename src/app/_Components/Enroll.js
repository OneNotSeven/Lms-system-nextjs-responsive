"use client";
import React, { useState } from 'react';
import PaymentComponent from './Payment';
import { motion } from 'framer-motion';

const Enroll = ({ enroll }) => {
    const [modal, setmodal] = useState(false)
    // console.log("enroll", enroll);
    

    
    

    return (
        <>
        <motion.div initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }} className="max-w-sm w-full mt-8 mr-14 shadow-lg rounded-lg overflow-hidden h-fit">
            <div className='w-full h-[198px] overflow-hidden'>
                <img
                    className="w-full h-full object-cover rounded-t-lg"
                    src={enroll.thumbnail}
                    alt="course thumbnail"
                    width={400}
                    height={198}
                />
            </div>
            <div className="p-4 font-[Poppins]">
                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-xl font-bold text-gray-600 capitalize">{enroll.title}</h2>
                </div>
                <div className="flex items-center text-sm text-gray-500 mb-2">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
                    </svg>
                    Beginner
                </div>
                <p className="text-sm mb-2 flex gap-1">
                    <svg className="w-5 h-5 text-gray-800 fill-purple-700 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z" clipRule="evenodd"/>
                    </svg>
                    <span className='capitalize text-gray-600'>{enroll.tutor}</span>
                </p>
                <p className="text-lg font-bold mb-1 capitalize">
                    {enroll.price === "free" ? `${enroll.price}` : `₹${enroll.price}`}
                </p>
            </div>
            <div className="p-4 pt-0 flex flex-col gap-2">
                {enroll.price != "free" ? <button style={{background: 'linear-gradient(110deg, #e278ef, #ffa2f2)'}}
                    className="w-full font-[Poppins] bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded"
                    onClick={()=>{setmodal(true)}}
                >
                    Enroll Now
                </button> : <button style={{background: 'linear-gradient(110deg, #e278ef, #ffa2f2)'}}
                    className="w-full font-[Poppins] bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded"
                    disabled
                >
                    Enroll Now
                </button>}
            </div>

            </motion.div>
            <div className='relative'>
                {modal == true ? <div className='w-full h-fit flex cursor-pointer fixed left-[-12px] justify-end float-left'>
                    <svg onClick={() => { setmodal(false) }} className="w-6 h-6 cursor-pointer text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6" />
                    </svg>
                </div> : null}
                
            { modal == true ? <PaymentComponent info={enroll} /> : null }
         </div>
    </>
    );
};

export default Enroll;

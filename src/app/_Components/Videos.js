"use client"
import { motion } from 'framer-motion'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import Filesattachment from '@/app/_Components/Filesattachment';
import Comment from '@/app/_Components/Comment';
import 'video.js/dist/video-js.css';
import videojs from 'video.js';

const Videos = (data) => {
    
    const [activeTab, setActiveTab] = useState(1);
    const [isExpanded, setIsExpanded] = useState(false);
    const [loader, setloader] = useState(false)
    const videoRef = useRef(null);
  const playerRef = useRef(null);

    useEffect(() => {
        if (data.link) {
          if (!playerRef.current && videoRef.current) {
            playerRef.current = videojs(videoRef.current, {
              controls: true,
              autoplay: false,
              preload: 'auto',
              responsive: true,
              fluid: true,
            });
            
          }
    
          if (playerRef.current) {
            playerRef.current.src({ src: data.link });
          }
    
          return () => {
            if (playerRef.current) {
              playerRef.current.dispose();
              playerRef.current = null;
            }
          };
        }
      }, [data.link]);

    
    console.log(data)
  return (
    <div className="flex flex-col custom-scrollbar h-screen overflow-auto items-center relative gap-6 w-full p-4">
      {data.price!="free" && data.price ? <motion.div initial={{ opacity: 0,scale:0, y: 20 }}
                    animate={{ opacity: 1,scale:1, y: 0 }}
                    transition={{ duration:1, ease: 'easeOut' }} className="bg-[#ffffc3] hidden lg:block rounded-xl w-full text-[#cbaa01] py-3 px-4 md:px-6 items-center justify-between">
      <div className="flex items-center gap-2">
      <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 17.345a4.76 4.76 0 0 0 2.558 1.618c2.274.589 4.512-.446 4.999-2.31.487-1.866-1.273-3.9-3.546-4.49-2.273-.59-4.034-2.623-3.547-4.488.486-1.865 2.724-2.899 4.998-2.31.982.236 1.87.793 2.538 1.592m-3.879 12.171V21m0-18v2.2"/>
</svg>

        <p className="text-sm font-medium text-muted-foreground">This content is paid,You need to Enroll Now!</p>
      </div>
     </motion.div>:null}
        <motion.div
          className="w-full flex flex-col rounded-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="relative rounded-lg overflow-hidden"
          >
           
              {data.link ? (
                <motion.div initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeIn' }}>

                  <video
                    ref={videoRef}
                    className="video-js w-full h-72"
                    controls
                    />
                    </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }} className="flex items-center justify-center w-full h-[28rem] bg-gray-200 rounded-lg text-gray-600 font-semibold">
                
                  <div className="text-center">
                 {loader==true? <svg aria-hidden="true" class="w-4 h-4 animate-spin dark:text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>:null}
                    {loader==false?"something went wrong":null}
                  </div>
                
              </motion.div>
            )}
          </motion.div>
          
          <div className='mt-3 mb-2'>
          <span className='font-[Poppins] font-semibold sm:text-[24px]'>A course by</span>  <Link href={`/teacherprofile/${data?.tutor?.tutorid}`}>
                  <span className=" sm:text-[24px] font-semibold font-[Poppins] text-[#d42eeb] capitalize hover:text-green-500 truncate">{data?.tutor?.tutname}</span>
              </Link>
              <div className="max-w-full font-[Poppins] ">
      <p className={`text-gray-600 ${isExpanded ? '' : 'line-clamp-3'}`}>
        {data.tutor?.courseDesc}
      </p>
      <button
        className="text-[#d42eeb]  mt-2"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? 'Show Less' : '... Show More'}
      </button>
    </div>
          </div>

          <motion.div
            className="flex gap-6 mt-4 overflow-auto border-b border-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <span
              className={`flex gap-1 font-[Poppins] cursor-pointer font-semibold ${activeTab === 1 ? 'border-b-2 transition text-[#d42eeb] border-[#d42eeb]' : 'text-gray-600'}`}
              onClick={() => setActiveTab(1)}
            >
              <svg
                className="w-6 h-6 text-gray-800"
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
                  strokeWidth="1.3"
                  d="M12 13V8m0 8h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              Details
            </span>
            <span
              className={`flex gap-1 cursor-pointer font-semibold ${activeTab === 2 ? 'border-b-2 transition text-[#d42eeb] border-[#d42eeb]' : 'text-gray-600'}`}
              onClick={() => setActiveTab(2)}
                  >
                    
              <svg
                className="w-6 h-6 text-gray-800"
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
                  strokeWidth="1.3"
                  d="M5 7h14M5 12h14M5 17h10"
                />
              </svg>
              Attachments
            </span>
            <span
              className={`flex gap-1 cursor-pointer font-semibold ${activeTab === 3 ? 'border-b-2 transition text-[#d42eeb] border-[#d42eeb]' : 'text-gray-600'}`}
              onClick={() => setActiveTab(3)}
            >
              <svg
                className="w-6 h-6 text-gray-800"
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
                  strokeWidth="1.3"
                  d="M9 17h6l3 3v-3h2V9h-2M4 4h11v8H9l-3 3v-3H4V4Z"
                />
              </svg>
              Comment
            </span>
          </motion.div>

          {activeTab === 1 && (
            <motion.div
              className="flex flex-col mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col gap-2 font-[Poppins]">
                <span className="text-xl text-gray-600 font-semibold">Title</span>
                <p className="text-xl text-gray-700">{data.videoDesc.title}</p>
              </div>
              <div className="mt-3 font-[Poppins]">
                <span className="text-xl font-semibold text-gray-600">Description</span>
                <p className="text-base text-gray-500 mt-2">
                  {data.videoDesc.desc || 'No description available.'}
                </p>
              </div>
            </motion.div>
          )}
            {activeTab === 2 && <Filesattachment attachments={ data.attachment} />}
            {activeTab === 3 && <Comment courseid={data.courseId} commentsList={ data.commentArray} />}
        </motion.div>

              </div>
      
  )
}

export default Videos

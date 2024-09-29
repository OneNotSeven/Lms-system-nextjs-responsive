"use client";

import Coursesidebar from '@/app/_Components/Coursesidebar';
import Filesattachment from '@/app/_Components/Filesattachment';
import { appBaseUrl } from '@/schema/appurl';
import React, { useEffect, useRef, useState } from 'react';
import 'video.js/dist/video-js.css';
import videojs from 'video.js';
import Comment from '@/app/_Components/Comment';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Enroll from '@/app/_Components/Enroll';

const Page = ({ params }) => {
  const [items, setItems] = useState({});
  const [link, setLink] = useState('');
  const [activeTab, setActiveTab] = useState(1);
  const [sideList, setSideList] = useState([]);
  const [price, setPrice] = useState(null);
  const [tutor, setTutor] = useState(null);
  const [tutorId, setTutorId] = useState(null);
  const [enrollDetails, setEnrollDetails] = useState(null);
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const [UserId, setUserId] = useState()
  const [loader, setloader] = useState(false)
  const [commentsArr, setcomments] = useState([])
  const [attachmentList, setattachmentList] = useState([])
  

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



// Example usage




  

  useEffect(() => {

    if (!UserId) return
    const fetchSideBar = async () => {
      try {
        const sideDetails = await fetch(`${appBaseUrl}/api/checkenroll`, {
          method: 'POST',
          body: JSON.stringify({ courseId: params.coursename[0],userid:UserId }),
        });
        const sideRes = await sideDetails.json();
        // console.log('Sidebar Response:', sideRes);

        if (sideRes.success==true) {
          setSideList(sideRes.message[0].videosrc);
          setPrice(() => sideRes.enrolled == true ? "free" : sideRes.message[0].price );
          setTutorId(sideRes.message[0].userId);
          setTutor(sideRes.message[0].tutorName);
          setEnrollDetails({
            title: sideRes.message[0].courseName,
            tutor: sideRes.message[0].tutorName,
            price:  sideRes.enrolled == true ? "free" : sideRes.message[0].price ,
            thumbnail: sideRes.message[0].thumbnail,
            courseId: sideRes.message[0].courseId,
            userId: sideRes.message[0].userId,
            videoid: params.coursename[1]
          });
          setcomments(sideRes.message[0].comments)
          setattachmentList(sideRes.message[0].fileattachment)
        }
      } catch (error) {
        // console.error('Error fetching sidebar data:', error);
      }
    };

    fetchSideBar();
  }, [params.coursename,UserId]);

  useEffect(() => {
    const fetchVideos = async () => {
      setloader(true)
      try {
        const details = await fetch(`${appBaseUrl}/api/videoslist`, {
          method: 'POST',
          body: JSON.stringify({
            courseid: params.coursename[0],
            videoid: params.coursename[1],
          }),
        });

        const videoRes = await details.json();
        // console.log('Videos Response:', videoRes);

        if (videoRes.success) {
          setloader(false)
          setItems(videoRes.message);
          setLink(videoRes.message.link);
        }
      } catch (error) {
        // console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, [params.coursename]);

  useEffect(() => {
    if (link) {
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
        playerRef.current.src({ src: link });
      }

      return () => {
        if (playerRef.current) {
          playerRef.current.dispose();
          playerRef.current = null;
        }
      };
    }
  }, [link]);

  return (
    <>
    
      
      
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className=' z-40'
      >
        <Coursesidebar
          courselist={sideList}
          price={price}
          courseid={params.coursename[0]}
          videoid={ params.coursename[1]}
        />
      </motion.div>
      <div className='flex w-full lg:flex-row flex-col-reverse'>
        
      <div className="flex flex-col justify-center items-center relative gap-6 w-full p-4">
      {price=="free"? null:<motion.div initial={{ opacity: 0,scale:0, y: 20 }}
                    animate={{ opacity: 1,scale:1, y: 0 }}
                    transition={{ duration:1, ease: 'easeOut' }} className="bg-[#ffffc3] hidden lg:block rounded-xl w-full text-[#cbaa01] py-3 px-4 md:px-6 items-center justify-between">
      <div className="flex items-center gap-2">
      <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 17.345a4.76 4.76 0 0 0 2.558 1.618c2.274.589 4.512-.446 4.999-2.31.487-1.866-1.273-3.9-3.546-4.49-2.273-.59-4.034-2.623-3.547-4.488.486-1.865 2.724-2.899 4.998-2.31.982.236 1.87.793 2.538 1.592m-3.879 12.171V21m0-18v2.2"/>
</svg>

        <p className="text-sm font-medium text-muted-foreground">This content is paid,You need to Enroll Now!</p>
      </div>
     </motion.div>}
        <motion.div
          className="w-full flex flex-col rounded-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="relative rounded-lg overflow-hidden"
            // initial={{ opacity: 0 }}
            // animate={{ opacity: 1 }}
            // transition={{ duration: 0.5 }}
          >
           
              {link ? (
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
          <div>
            <ul className="flex p-6 gap-3 justify-evenly items-center font-[Poppins]">
              <li className="flex gap-1 truncate text-[14px] sm:text-[16px]">
                <svg
                  className="w-5 sm:w-6 sm:h-6 text-gray-600"
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
                    d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                  <span className="lg:font-semibold text-gray-500 truncate">{ enrollDetails?.title}</span>
                  
              </li>
              <li className="flex gap-1 truncate text-[14px] sm:text-[16px]">
                <svg
                  className=" w-5 sm:w-6 sm:h-6 text-gray-600"
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
                    d="M8 7H5a2 2 0 0 0-2 2v4m5-6h8M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m0 0h3a2 2 0 0 1 2 2v4m0 0v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6m18 0s-4 2-9 2-9-2-9-2m9-2h.01"
                  />
                </svg>
                <span className=" lg:font-semibold text-gray-500 truncate">Beginner</span>
              </li>
              <li className="flex gap-1 truncate text-[14px] sm:text-[16px]">
                <svg
                  className="w-5 sm:w-6 sm:h-6 text-gray-600"
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
                    d="m8.032 12 1.984 1.984 4.96-4.96m4.55 5.272.893-.893a1.984 1.984 0 0 0 0-2.806l-.893-.893a1.984 1.984 0 0 1-.581-1.403V7.04a1.984 1.984 0 0 0-1.984-1.984h-1.262a1.983 1.983 0 0 1-1.403-.581l-.893-.893a1.984 1.984 0 0 0-2.806 0l-.893.893a1.984 1.984 0 0 1-1.403.581H7.04A1.984 1.984 0 0 0 5.055 7.04v1.262c0 .527-.209 1.031-.581 1.403l-.893.893a1.984 1.984 0 0 0 0 2.806l.893.893c.372.372.581.876.581 1.403v1.262a1.984 1.984 0 0 0 1.984 1.984h1.262c.527 0 1.031.209 1.403.581l.893.893a1.984 1.984 0 0 0 2.806 0l.893-.893a1.985 1.985 0 0 1 1.403-.581h1.262a1.984 1.984 0 0 0 1.984-1.984V15.7c0-.527.209-1.031.581-1.403Z"
                  />
                </svg>
                <Link href={`/teacherprofile/${tutorId}`}>
                  <span className=" lg:font-semibold text-gray-500 capitalize hover:text-green-500 truncate">{tutor}</span>
                </Link>
              </li>
            </ul>
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
                <p className="text-xl text-gray-700">{items?.title}</p>
              </div>
              <div className="mt-3 font-[Poppins]">
                <span className="text-xl font-semibold text-gray-600">Description</span>
                <p className="text-base text-gray-500 mt-2">
                  {items?.desc || 'No description available.'}
                </p>
              </div>
            </motion.div>
          )}
            {activeTab === 2 && <Filesattachment attachments={ attachmentList} />}
            {activeTab === 3 && <Comment courseid={params.coursename[0]} commentsList={ commentsArr} />}
        </motion.div>

      </div>
        {enrollDetails && <Enroll enroll={enrollDetails} />}
</div>
    </>
  );
};

export default Page;

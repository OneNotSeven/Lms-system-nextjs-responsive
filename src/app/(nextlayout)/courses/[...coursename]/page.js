"use client";

import Coursesidebar from '@/app/_Components/Coursesidebar';
import { appBaseUrl } from '@/schema/appurl';
import React, { useEffect, useRef, useState } from 'react';
import 'video.js/dist/video-js.css';
import { motion } from 'framer-motion';
import Enroll from '@/app/_Components/Enroll';
import Videos from '@/app/_Components/Videos';

const Page = ({ params }) => {
  const [items, setItems] = useState({});
  const [isExpanded, setIsExpanded] = useState(false);
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
            videoid: params.coursename[1],
            courseDesc:sideRes.message[0].courseDesc
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

        {Coursesidebar? <Videos price={price} link={link} videoDesc={{ "title": items.title, "desc": items.desc }} tutor={{ "tutorid": tutorId, "tutname": tutor, "courseDesc": enrollDetails?.courseDesc }} commentArray={commentsArr} attachment={attachmentList} ref={videoRef} courseId={params.coursename[0]} />:null}
        
        

        {enrollDetails && <Enroll enroll={enrollDetails} />}
       
</div>
    </>
  );
};

export default Page;

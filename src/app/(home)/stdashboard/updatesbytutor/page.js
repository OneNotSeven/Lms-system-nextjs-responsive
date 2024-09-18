"use client"
import { appBaseUrl } from '@/schema/appurl';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
const Page = () => {

  const [userId, setUserId] = useState(null)
  const [showCase, setshowCase] = useState([])
  const [unread, setunread] = useState()
  const [loader, setloader] = useState(false)
  
  useEffect(() => {
    setloader(true)

    const jwtVerify = async () => {
        try {
            const responseVerify = await fetch(`${appBaseUrl}/api/tokengetter`, {
                method: "POST"
            }).then(res => res.json());

            if (responseVerify.success == true) {
              setUserId(responseVerify.verifytoken.userid);
              
          
            }
        } catch (error) {
            // console.error("Error verifying token:", error);
        }
    };

    jwtVerify();
  }, []);
  
  
  useEffect(() => {
    const fetchAnnouncements = async () => {
      // console.log("ready to go")
      if (!userId) { return }
      try {
         setloader(true)
          const response = await axios.get(`${appBaseUrl}/api/notify?userId=${userId}`);
        //  console.log("notifyy", response)

        //  console.log("working",response.data.wholeData)
         if (response.data.success == true) {
           
          const sortedData = response.data.wholeData
          .filter(item => item.announcement && item.announcement.addedAt) 
          .sort((a, b) => {
            const dateA = new Date(a.announcement.addedAt);
            const dateB = new Date(b.announcement.addedAt);
            return dateA - dateB; 
          });

           setshowCase(sortedData);
           setloader(false)
           setunread([response.data.data.map((items)=>items._id)])
          
          setshowCase(sortedAnnouncements);
         }
         
      } catch (err) {
         console.log('Failed to load announcements.');
      }
  };
  fetchAnnouncements();
  }, [userId])

  useEffect(() => {
    const updating = async () => {
      if (!userId || !unread) { return }
     const res= await axios.post(`${appBaseUrl}/api/notify`, {
        userId:userId,
       unread: unread
    });
    }
    updating()
  }, [unread])
  

  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    const optionsDate = { year: 'numeric', month: 'long', day: 'numeric' };
    const optionsTime = { hour: '2-digit', minute: '2-digit'};

    const formattedDate = date.toLocaleDateString(undefined, optionsDate);
    const formattedTime = date.toLocaleTimeString(undefined, optionsTime);

    return { formattedDate, formattedTime };
  };

  // console.log("showcase",unread)
  return (
    <>
      <motion.div className='flex flex-col gap-8 p-4 font-[Poppins]'>

        <div className='w-full text-xl '>Notification</div>
        {showCase.length > 0 && loader == false ? <motion.div initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }} className='flex flex-col gap-3 '>

          {
            showCase.map((items, idx) => {
            
              const { formattedDate, formattedTime } = formatDateTime(items.announcement.addedAt);
              return (
                <div key={idx} className="flex items-start gap-2.5">
                  <img className="w-8 h-8 rounded-full" src={items?.image} alt="Jese image" />
                  <div className="flex flex-col gap-1 w-full max-w-[320px]">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">{items.name}</span>
                      <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{formattedDate}</span>
                    </div>
                    <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                      <p className="text-sm font-normal text-gray-900 dark:text-white"> {items.announcement.description}</p>
                      <span className='flex justify-end text-xs  text-gray-500 dark:text-gray-400'>{formattedTime}</span>
                    </div>
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Delivered</span>
                  </div>
                </div>
              )
            }
            )
          }
        </motion.div> : <div>{loader==false && showCase.length<=0 ?<span className='font-[Poppins]'>No Notification</span>:null} 
            {loader == true && <div role="status" className='w-full justify-start items-center'>
              <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
              </svg>
              <span class="sr-only">Loading...</span>
            </div>}
</div>}
        
        
      </motion.div>
    
    </>
  )
}

export default Page
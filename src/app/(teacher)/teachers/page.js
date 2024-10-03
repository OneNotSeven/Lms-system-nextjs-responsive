"use client"
import FinanceChart from "@/app/_Components/FinanceChart";
import "@/app/global.css"
import { appBaseUrl } from "@/schema/appurl";
import axios from "axios";
import { useEffect, useState } from "react";


const AdminPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [days, setdays] = useState(["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"])
  const [finance, setfinance] = useState()

  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const jwtVerify = async () => {
        try {
            const responseVerify = await fetch(`${appBaseUrl}/api/tokengetter`, {
                method: "POST"
            }).then(res => res.json());

            if (responseVerify.success==true) {
                setUserId(responseVerify.verifytoken.userid);
            }
        } catch (error) {
            // console.error("Error verifying token:", error);
        }
    };

    jwtVerify();
  }, []);

  useEffect(() => {

    if(!userId) return
    const fetchFinance = async () => {
      const tutor= await fetch(`${appBaseUrl}/api/teacherprofileedit`, {
        method: "Post",
        body:JSON.stringify({profileId:userId})
      })
      const tutorRes = await tutor.json()
      setfinance(tutorRes.message[0])
      // console.log("finance",tutorRes)
    }
    fetchFinance()
  }, [userId])
  

  useEffect(() => {
    console.log("jii dosto",userId)
    const fetchTodayEvents = async () => {
      try {
      
        const response = await axios.get(`${appBaseUrl}/api/events/todayevents?userId=${userId}`);
        if (response.data.success==true) {
          setEvents(response.data.data.Events || []);
          
          // console.log("ttday events",response)
        } else {
          setError('Failed to load events.');
        }
      } catch (err) {
        setError('Failed to load events.');
        // console.error('Error fetching events:', err);
      } finally {
        setLoading(false);
      }
    };
    if (userId) {
  
      fetchTodayEvents();
}
  }, [userId]);
  // console.log("todays eventy", events)
  // console.log("finance",finance)
  return (
    <>
    
    <div  className="p-4  gap-4 md:flex-row w-full font-[Poppins]">
    <div class="flex items-center w-full p-4 mb-4 text-sm text-[#d42eeb] rounded-lg bg-green-50" role="alert">
  <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
  </svg>
  <span class="sr-only">Info</span>
  <div className="text-[#d42eeb] font-[Poppins]">
    <span class="font-medium text-[#d42eeb] font-[Poppins]">Analytics Info!</span> Showing based on Revenue generating in month.
  </div>
</div>
        <div className="flex lg:flex-row flex-col">
          
        <div className="w-full lg:w-2/3 flex flex-col gap-8">
      
      <div className="w-full h-[500px]">
      
              <FinanceChart data={finance } />
      </div>
    </div>
    {/* RIGHT */}
    <div className="w-full lg:w-1/3 flex flex-col gap-8">
      <h2 className="text-lg font-semibold font-[Poppins] text-gray-600">Todays Events</h2>
      {
        events.map((items,idx) => (
          <div key={idx} className="flex sm:flex-row flex-col gap-4 font-[Poppins]">
        <div style={{background: 'linear-gradient(110deg, #e278ef, #ffa2f2)'}} className="w-20 h-20 rounded-xl">
          <div  className="flex flex-col items-center">
                <span className=" text-2xl text-white font-sans font-semibold">{
                  days[new Date(items.Date).getDay()]
                  
                }</span>
                <span className="text-2xl text-white font-[Poppins] font-semibold">{ items.Date.split("-")[2]}</span>
          </div>
        </div>
        <div className="w-72 bg-[#b924c7] text-[#b029bd] h-full rounded-xl">
          <div style={{background: 'linear-gradient(110deg, rgb(249 241 250), rgb(238 229 237))'}} className="w-full p-[6px] h-full ml-[6px] rounded-md">
            <div>
                  <p className="text-sm font-semibold ml-2 pt-2">{ items.title}</p>
                  <p className=" ml-2 pt-2 mb-1 text-[12px] text-[#3d3b3b] font-semibold">{items.description}</p>
                  <p className=" ml-2 pt-2 mb-1 text-[12px] text-[#3d3b3b]"><span className="font-semibold">Location:</span>{ items?.location}</p>
                  <p className=" ml-2 pt-2 mb-1 text-[12px] text-[#3d3b3b]"><span className="font-semibold">Category:</span>{ items?.category}</p>
                </div>
                
          </div>
        </div>
      </div>
        ))
      }
      
    </div>
      </div>
    </div>
    </>
  );
};

export default AdminPage;

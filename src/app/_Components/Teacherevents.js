"use client"
import React, { useState } from 'react'

const Teacherevents = ({ data }) => {
  const [events, setEvents] = useState(data.flatMap(item => item.Events));

  // console.log("teacher events", events)
  // console.log("teacher",data)

  return (
    <>
  

<div class="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
  <h1 class="text-3xl font-bold mb-8">Upcoming Events</h1>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    
          { 

            events.map((items,idx) => (
              <div key={idx} class="bg-white shadow-md rounded-lg overflow-hidden">
              <div class="p-6">
                  <h2 class="text-xl font-bold mb-2">{ items?.title}</h2>
                <div class="flex items-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="w-5 h-5 mr-2 text-primary"
                  >
                    <path d="M8 2v4"></path>
                    <path d="M16 2v4"></path>
                    <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                    <path d="M3 10h18"></path>
                  </svg>
                    <span class="text-muted-foreground">{ items?.Date}</span>
                  </div>
                  <div class="flex items-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="w-5 h-5 mr-2 text-primary"
                  >
                    <path d="M8 2v4"></path>
                    <path d="M16 2v4"></path>
                    <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                    <path d="M3 10h18"></path>
                  </svg>
                    <span class="text-muted-foreground">{ items?.category}</span>
                </div>
                
                <div class="flex items-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="w-5 h-5 mr-2 text-primary"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                    <span class="text-muted-foreground">{ items?.location}</span>
                </div>
                <p class="text-muted-foreground">
                    { items?.description}
                </p>
              </div>
              
            </div>
           )) 
          }
  </div>
</div>
    </>
  )
}

export default Teacherevents
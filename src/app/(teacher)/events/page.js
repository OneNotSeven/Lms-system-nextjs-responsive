import AddEventForm from '@/app/_Components/Events'
import TutorAnnouncements from '@/app/_Components/TutorAnnouncements'
import React from 'react'

const page = () => {
  return (
      <>
          <div className='flex flex-col gap-4 w-full p-2 md:p-9'>
              
            <h2 className='font-semibold text-xl text-gray-500 mb-4'>Updates</h2>  
          <div className='flex md:flex-row flex-col gap-3 w-full'>
          <AddEventForm />
          <TutorAnnouncements/>
          </div>
          </div>
      </>
  )
}

export default page
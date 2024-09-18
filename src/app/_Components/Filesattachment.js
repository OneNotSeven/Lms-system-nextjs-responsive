import React from 'react'
import { motion } from 'framer-motion';

const Filesattachment = ({ attachments}) => {
  // console.log("Attachments",attachments)
  return (
      <>
         
         {attachments?.length > 0 ?   <motion.div
             className="card-body h-fit w-full  border-2 border-[#f843ec] mt-8 rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}>
         <div className="row font-[Poppins]">
                      
          <div className="col-md-12 p-4 border-b-2 border-dashed border-[#f843ec]">
            <span className='text-[#f843ec] text-2xl'>Attachments</span>
          </div>
          <div className=' mt-3 w-full'>
            <ul className=' flex flex-col gap-2 '>
              
              {
                attachments.map((items, idx) => (
                  <li key={idx} className=' flex justify-between gap-2 p-3'>
                    <div className=' flex gap-1'>
                                  
                      <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 3v4a1 1 0 0 1-1 1H5m4 8h6m-6-4h6m4-8v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1Z" />
                      </svg>


                      <span>{items.filename}</span>
                    </div>
                            
                              
                    <a href={items.filesrc} download={items.filesrc} className='cursor-pointer rounded-full border-2 border-white'><svg class="w-6 h-6 text-[#d42eeb] dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19V5m0 14-4-4m4 4 4-4" />
                    </svg>

                    </a>
                  </li>
                ))
              }
                          
                         
            </ul>
          </div>
        </div> 
              </motion.div>: <span className='font-[Poppins] mt-6 text-gray-600'>No Attachments</span>}
     
      </>
  )
}

export default Filesattachment
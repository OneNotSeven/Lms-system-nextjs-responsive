"use client";
import { appBaseUrl } from '@/schema/appurl';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
const Page = ({ params }) => {
  const [courseId, setCourseId] = useState(params.edit);
  const [available, setAvailable] = useState([]);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [loader, setloader] = useState(false)
  const [removeloader, setremoveloader] = useState(false)

 

  useEffect(() => {
    const getCourseData = async () => {
      if (!courseId) return; // Exit if no courseId

     
      try {
        setloader(true)
        const response = await fetch(`${appBaseUrl}/api/editcourse`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ courseId }),
        });

        const result = await response.json();
        setloader(false)
        setAvailable(result.message[0].videosrc || []);
        setFiles(result.message[0].fileattachment || []);
      } catch (error) {
        console.error('Error fetching course data:', error);
      } finally {
        
      }
    };

    getCourseData();
  }, []);

  const deleteDetails = async (id) => {
   
    try {
      setremoveloader(true)
      const response = await fetch(`${appBaseUrl}/api/deleteandupdate/${courseId}/${id}`, {
        method: 'DELETE',
      });
      const result = await response.json();
      setAvailable(result.message[0].videosrc || []);
      setShowDeleteConfirm(false);
    } catch (error) {
      // console.error('Error deleting video:', error);
    } finally {
     setremoveloader(false)
    }
  };

  const updateDetails = async (id, updatedData) => {
    setLoading(true)
    try {
      const response = await fetch(`${appBaseUrl}/api/updatecourse`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ courseId, data: updatedData }),
      });
      const result = await response.json();
      if (result.success == true) {
        
        setAvailable(result.message[0].videosrc || []);
      }
    } catch (error) {
      // console.error('Error updating video:', error);
    } finally {
      setLoading(false)
    }
  };

  const removeFiles = async (fileId) => {
   
    try {
      const response = await fetch(`${appBaseUrl}/api/filesdelete/${courseId}/${fileId}`, {
        method: 'DELETE',
      });
      const result = await response.json();
      if (result.success) {
        setFiles(result.message[0].fileattachment || []);
      }
    } catch (error) {
      console.error('Error deleting file:', error);
    } finally {
     
    }
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDeleteConfirm(true);
  };



  return (
    <div style={{    background: 'linear-gradient(140deg, #d357e414, #c75fd529)'}} className='w-full h-full'>
      <div className='flex flex-col overflow-auto font-[Poppins]'>
      <Link href="/teachers/upload" > <div className='px-14 flex gap-4 mt-8 text-2xl text-[#d42eeb] font-semibold'><svg class="w-8 h-8 font-bold text-[#d42eeb] dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12l4-4m-4 4 4 4"/>
</svg>
Edit Videos</div></Link>
        {available.length > 0 && <ul className='flex gap-4 flex-col p-8'>
          {available.map((item, index) => (
            <div key={item._id} className='flex gap-11 p-9 rounded-2xl '>
              <div>
                <label
                  htmlFor={`video-${item._id}`}
                  className="flex group w-[483px] h-[256px] max-w-[483px] max-h-[256px] relative overflow-hidden object-cover object-center flex-col items-center justify-center border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500"
                >
                  <div className='relative'>
                    <video id={`video-${item._id}`} className='rounded-md' width="full" height="full" controls>
                      <source src={item.link} type="video/mp4" />
                    </video>
                    
                  </div>
                </label>
              </div>
              <div className='w-full'>
                <div className='flex w-full gap-4'>
                  <div className="mb-6 w-full">
                    <label
                      htmlFor={`title-${item._id}`}
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Title
                    </label>
                    <input
                      value={item.title}
                      type="text"
                      id={`title-${item._id}`}
                      onChange={(e) => setAvailable(available.map((video) => (video._id === item._id ? { ...video, title: e.target.value } : video)))}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Gravity"
                      required
                    />
                  </div>

                  <div className="mb-6 w-full">
                    <label
                      htmlFor={`chaptername-${item._id}`}
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Chapter Name
                    </label>
                    <input
                      value={item.chaptername}
                      type="text"
                      id={`chaptername-${item._id}`}
                      onChange={(e) => setAvailable(available.map((video) => (video._id === item._id ? { ...video, chaptername: e.target.value } : video)))}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Chapter 1: Gravity"
                      required
                    />
                  </div>
                </div>
                <div className="mb-6">
                  <label
                    htmlFor={`description-${item._id}`}
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Description
                  </label>
                  <textarea
                    value={item.desc}
                    id={`description-${item._id}`}
                    onChange={(e) => setAvailable(available.map((video) => (video._id == item._id ? { ...video, desc: e.target.value } : video)))}
                    rows="4"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Write a description..."
                  ></textarea>
                </div>
                <div className='w-full flex gap-2'>
                  <button style={{ background: 'linear-gradient(110deg, #e278ef, #ffa2f2)' }} onClick={() => updateDetails(item._id, available.filter((video) => video._id == item._id))} className='p-2 w-full text-white rounded-full font-semibold'>
                    {loading && available[index]._id == item._id ? 'Update' : 'Update'}
                  </button>
                  <button onClick={() => handleDeleteClick(item._id)} className='bg-red-500 p-2 w-full text-white rounded-full font-semibold'>
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </ul>}
        
          { loader== true ? <div role="status" className='w-full flex justify-center items-center'>
            <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-[#d42eeb]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <span class="sr-only">Loading...</span>
          </div> :null}
          

      </div>

      {/* File attachments */}
      <div className='w-full pb-8'>
        <div className='w-full px-14 flex gap-4 mt-8 text-2xl text-[#d42eeb]'>
          <svg className="w-8 h-8 text-[#d42eeb] dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.213 9.787a3.391 3.391 0 0 0-4.795 0l-3.425 3.426a3.39 3.39 0 0 0 4.795 4.794l.321-.304m-.321-4.49a3.39 3.39 0 0 0 4.795 0l3.424-3.426a3.39 3.39 0 0 0-4.794-4.795l-1.028.961" />
          </svg>
          <h2 className='text-2xl font-semibold font-[Poppins]'>Attachments</h2>
        </div>
        {files.length > 0 && (
          <ul className='mt-6 flex ml-14 gap-5 font-[Poppins]'>
            {files.map((file) => (
              <li key={file._id} className='flex gap-1 w-fit bg-[#d42eeb] text-white items-center rounded-3xl pr-4 pl-4'>
                <span className='p-2 rounded-2xl'>{file.filename}</span>
                <svg onClick={() => removeFiles(file._id)} className="w-6 h-6 text-white cursor-pointer dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                </svg>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Confirmation Modal for Delete */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
            <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
            <p className="mb-4">Are you sure you want to delete this item? This action cannot be undone.</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="bg-gray-300 p-2 text-gray-700 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteDetails(deleteId)}
                className="bg-red-500 p-2 text-white rounded-lg"
              >
                {removeloader ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;

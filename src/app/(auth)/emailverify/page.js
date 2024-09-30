"use client";

import { emailVerifySchema } from '@/schema/yupschema';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { appBaseUrl } from '@/schema/appurl';

const Page = () => {
  const [progress, setprogress] = useState(false)
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: emailVerifySchema,
    onSubmit: async (values) => {
      try {
        setprogress(true)
        const response = await fetch(`${appBaseUrl}/api/emailverify`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: values.email }),
        });
        
        const result = await response.json();

        if (result.success) {
          setprogress(false)
          toast.success("Link sent successfully", {
            style: {
              backgroundColor: 'black',
              color: '#ffffff',
              fontFamily: 'Arial, sans-serif',
            },
          });
        } else {
          setprogress(false)
          toast.error("Email not found", {
            style: {
              backgroundColor: 'black',
              color: '#ffffff',
              fontFamily: 'Arial, sans-serif',
            },
          });
        }
      } catch (error) {
        setprogress(false)
        toast.error("An unexpected error occurred", {
          style: {
            backgroundColor: 'black',
            color: '#ffffff',
            fontFamily: 'Arial, sans-serif',
          },
        });
      }
    },
  });

  return (
    <>
      <ToastContainer />
      <div className='w-full h-screen flex justify-center items-center font-[Poppins]'>
        <div className='sm:w-[30%] w-full sm:p-0 p-3 flex flex-col gap-2'>
          <p>Email</p>
          <input
            type="email"
            className="block w-full p-4 text-gray-700 border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            placeholder="Email address"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.email && formik.touched.email && (
            <p className="text-red-400 text-sm">{formik.errors.email}</p>
          )}
          <button style={{background: 'linear-gradient(110deg, #e278ef, #ffa2f2)'}}
            className=' font-[Poppins] text-white mt-4 p-2 rounded-md'
            onClick={formik.handleSubmit}
          >
            {progress ? "processing..." : "Submit"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Page;

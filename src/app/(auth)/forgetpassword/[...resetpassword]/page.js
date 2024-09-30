"use client"
import { appBaseUrl } from '@/schema/appurl';
import { passwordChecking } from '@/schema/yupschema';
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Page = (content) => {
// console.log("content",content)
  const [progress, setprogress] = useState(false)
  const [userid, setuserid] = useState()
  const [reminder, setreminder] = useState(false)
  var password
  var myiduser
    useEffect(() => {
        try {
            const jwtverify = async () => {
                const verifydone= await fetch(`${appBaseUrl}/api/tokengetter`, {
                 method: "Post"
                })
              const responseVerify = await verifydone.json()
              
                 return responseVerify
              }
          myiduser = jwtverify().then((response) => {
            // console.log("res",response)
            if (response.success != false) {
              return response.verifytoken.userId;
                }
              })
            // console.log("ben10",myiduser)
              
          setuserid(myiduser)
        } catch (error) {
            // console.log("something went wrong...edit")
        }
    // EditPageInfo()
    }, [])
  
  const changedPassword = async () => {
    const resUserId = await userid.then((res) => {
     return res
   })
    // console.log("tree", userid)
    
    if (Object.keys(errors).length === 0) {
      setprogress(true)
      const resetpassword = await fetch(`${appBaseUrl}/api/forgotpassword`, {
        method: "Post",
        body: JSON.stringify({resUserId,password})
      })
      const resetRes = await resetpassword.json()
      if (resetRes.success == true) {
        setreminder(true)
        setprogress(false)
        
      } else {
        setreminder(false)
        setprogress(false)
      }
      // console.log("resetres",resetRes)
    }
    
  }

  if (reminder == true) {
    toast.success("password changed", {
      style: {
        backgroundColor: 'black', // Set your desired background color
        color: '#ffffff',        // Set your desired text color
        fontFamily: 'Arial, sans-serif'  // Set your desired font
      }
    })
  } 

  const initialvalue = {
    password: "",
    c_password: "",
  };
const formik =useFormik({})
  const { errors, touched, handleBlur, handleChange, values } = useFormik({
    initialValues: initialvalue,
    validationSchema: passwordChecking,
    onSubmit: (values) => {},
  });

  password=values.password

  // console.log(touched)
  return (
    <>
      <ToastContainer />
      <div className='w-full h-screen flex justify-center items-center flex-col gap-2 font-[Poppins]'>
      <h2 className='font-bold text-[32px] text-[#d42eeb] mb-2'>Quest Castle</h2>
    <div className=' sm:w-[30%] w-full sm:p-0 p-3 flex flex-col gap-2'>
          <p>password</p>
        <input  id="name" type="password" value={values.password} placeholder='new password' name="password" className="block w-full p-4 text-gray-700 border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                   onChange={handleChange} onBlur={handleBlur} />
        {errors.password && touched.password ? (
                  <p className="text-red-400 text-sm">{errors.password}</p>
                ) : null}
          </div>
          <div className=' sm:w-[30%] w-full sm:p-0 p-3 flex flex-col gap-2'>
          <p>confirm password</p>
        <input type="password" id="name" value={values.c_password} placeholder='confirm password' name="c_password" className="block w-full p-4 text-gray-700 border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" onChange={handleChange} onBlur={handleBlur} />
        {errors.c_password && touched.c_password ? (
                  <p className="text-red-400 text-sm">{errors.c_password}</p>
                ) : null}
          <button style={{ background: 'linear-gradient(110deg, #e278ef, #ffa2f2)' }} className='text-white w-full mt-4 p-2 rounded-md' onClick={() => changedPassword()}>{progress ? "processing..." : "submit"}</button>
      </div>
        </div>
      </>
  )
}

export default Page
"use client";
import { appBaseUrl } from "@/schema/appurl";
import { LoginSchema } from "@/schema/yupschema";

import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const LoginUser = () => {
  const [errorlogin, seterrorlogin] = useState(false)
  const [loader, setloader] = useState(false)
  const redirection=useRouter()
  
  const verifyDetails = async () => {

    if ( Object.values(values).some(value=> value=="")) {
      toast.error("fill all details", {
        style: {
          backgroundColor: 'black', // Set your desired background color
          color: '#ffffff',        // Set your desired text color
          fontFamily: 'Arial, sans-serif'  // Set your desired font
        }
      })
    }
    
    if (Object.keys(errors).length === 0 && Object.values(values).some(value => value != "")) {
      setloader(true)
        const loginRes = await fetch(`${appBaseUrl}/api/login`, {
            method: "Post",
            body:JSON.stringify(values)
        })
         
    const res_login = await loginRes.json()
    // console.log(res_login)
      if (res_login.success == false) {
      setloader(false)
      errors.password = res_login.message
      seterrorlogin(!errorlogin)
      } else {
        setloader(false)
      toast.success("successfully logged in", {
        style: {
          backgroundColor: 'black', // Set your desired background color
          color: '#ffffff',        // Set your desired text color
          fontFamily: 'Arial, sans-serif'  // Set your desired font
        }
      })

      setTimeout(() => {
        
        redirection.push("/stdashboard")
      }, 1000);
      }
      
    }
    
  }
  const initialvalue = {
    email: "",
    password: "",
  };

  const { errors, touched, handleBlur, handleChange, values } = useFormik({
    initialValues: initialvalue,
    validationSchema: LoginSchema,
    onSubmit: (values) => {},
  });

  
  return (
    <>
      <div>
        <section className="bg-white dark:bg-gray-900 font-[Poppins]">
          <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
            <div className="w-full max-w-md">
              <h1 className="mt-3 text-2xl font-semibold text-gray-800 capitalize sm:text-3xl dark:text-white">
                sign In
              </h1>

              <div className="flex flex-col">
                <div className="relative flex items-center mt-4">
                  <span className="absolute">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </span>

                  <input
                    type="email"
                    className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Email address"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                {errors.email && touched.email ? (
                  <p className="text-red-400 text-sm">{errors.email}</p>
                ) : null}
              </div>

              <div className="flex flex-col">
                <div className="relative flex items-center mt-4">
                  <span className="absolute">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </span>

                  <input
                    type="password"
                    className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                {errorlogin==true || errors.password && touched.password ? (
                  <p className="text-red-400 text-sm">{errors.password}</p>
                ) : null}
              </div>

              <div className="mt-6">
                <button style={{background: 'linear-gradient(110deg, #e278ef, #ffa2f2)'}} onClick={() => {
                  verifyDetails();
                } } className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform  rounded-lg  focus:outline focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                  {loader ? "Verifying..." : "Sign in"}
                </button>

              <Link href="/emailverify"> <div className=" mt-2 text-blue-700">forgot password?</div>
              </Link> 
                <div className="mt-6 text-center ">
                  <Link
                    href="/signup"
                    className="text-sm text-blue-500 hover:underline dark:text-blue-400"
                  >
                    Don’t have an account yet? Sign up
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <ToastContainer/>
    </>
  );
};

export default LoginUser;

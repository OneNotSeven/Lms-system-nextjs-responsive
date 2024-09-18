"use client";
import { appBaseUrl } from "@/schema/appurl";
import { formSignUpSchema } from "@/schema/yupschema";

import { useFormik } from "formik";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [presentEmailError, setpresentEmailError] = useState(false);
  const [loader, setloader] = useState(false)
  const redirection=useRouter()

  const saveData = async () => {
    try {
      if (Object.values(values).some(value=> value=="")) {
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
          const dataSendApi = await fetch(`${appBaseUrl}/api/signup`, {
            method: "Post",
            body: JSON.stringify(values)
        })
          

        const res = await dataSendApi.json();
       

        // console.log(res);
        if (res.success === false) {
          setloader(false)
          errors.email = res.message;
          
          setpresentEmailError(!presentEmailError);
          // console.log("how its going")
        } else {
          setloader(false)
          toast.success("successfully logged in", {
            style: {
              backgroundColor: 'black', // Set your desired background color
              color: '#ffffff',        // Set your desired text color
              fontFamily: 'Arial, sans-serif'  // Set your desired font
            }
          });
          setTimeout(() => {
          
            redirection.push("/stdashboard")
          }, 2000);
        }
      } 
     

     
    } catch (error) {
      error.message = "fill proper details";
      // console.log("error")
    }
    
    
  };

  const initialvalue = {
    name: "",
    email: "",
    password: "",
    c_password: "",
  };

  const { errors, touched, handleBlur, handleChange, values } = useFormik({
    initialValues: initialvalue,
    validationSchema: formSignUpSchema,
    onSubmit: (values) => {},
  });

  return (
    <>
      <div>
        <section className="bg-white dark:bg-gray-900 font-[Poppins]">
          <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
            <div className="w-full max-w-md">
              <div className="flex justify-center mx-auto"></div>

              <div className="flex items-center justify-center mt-6">
                <a
                  href="#"
                  className="w-1/3 pb-4 font-medium text-center text-gray-800 capitalize border-b-2 border-blue-500 dark:border-blue-400 dark:text-white"
                >
                  sign up
                </a>
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
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </span>

                  <input
                    type="text"
                    className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Enter Your name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                {errors.name && touched.name ? (
                  <p className="text-red-400 text-sm">{errors.name}</p>
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
                {presentEmailError === true ||
                (errors.email && touched.email) ? (
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
                    name="password"
                    placeholder="Password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                {errors.password && touched.password ? (
                  <p className="text-red-400 text-sm">{errors.password}</p>
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
                    name="c_password"
                    placeholder="Confirm Password"
                    value={values.confirmpassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                {errors.c_password && touched.c_password ? (
                  <p className="text-red-400 text-sm">{errors.c_password}</p>
                ) : null}
              </div>

              <div className="mt-6">
                <button style={{background: 'linear-gradient(110deg, #e278ef, #ffa2f2)'}}
                  onClick={() => {
                    saveData();
                  }}
                  className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform  rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                >
                  {loader ? "Processing..." : "Sign Up"}
                </button>

                <div className="mt-6 text-center ">
                  <Link
                    href="/login"
                    className="text-sm text-blue-500 hover:underline dark:text-blue-400"
                  >
                    Already have an account?
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default SignUp;

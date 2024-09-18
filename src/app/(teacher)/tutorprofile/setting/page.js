"use client"
import { appBaseUrl } from '@/schema/appurl'
import { useFormik } from 'formik'
import React, { useEffect, useRef, useState } from 'react'
import { storage } from "@/app/config";
import Image from 'next/image'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { teacherYupProfiles } from '@/schema/yupschema';

const Page = () => {
    const [imgPro, setimgPro] = useState()
    const [saved, setsaved] = useState()
const [change, setchange] = useState(0)
    const [populateInfo, setpopulateInfo] = useState({})
    const [userEditId, setuserEditId] = useState()
    const [formerr, setformerr] = useState({ nameerr: false, contacterr: false })
    const [saveload, setsaveload] = useState(false)
    const [username, setusername] = useState()
    const [progresses, setProgresses] = useState({});
    const [videoPro, setvideoPro] = useState({});
  const [imageUrl, setimageUrl] = useState("")
  const [loader, setloader] = useState(false)
    var myiduser

    const imageTaskRef = useRef(null);
    const imageRef = useRef(null);

    const profileImage = async (e) => {
        console.log(imageRef.current.files);
    
        const imageFile = imageRef.current.files[0];
        if (imageFile) {
            setimgPro(true)
        }
        console.log(imageFile.name);
    
        // Create an upload task and progress tracker for each file
    
        const fileimageRef = ref(storage, `profile/${imageFile.name}`);
        const uploadVideoTask = uploadBytesResumable(fileimageRef, imageFile);
        imageTaskRef.current = uploadVideoTask;
    
        // Update progress state for each file during upload
        uploadVideoTask.on("state_changed", (snapshot) => {
          const videoprogress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
    
          setvideoPro({
            name: [imageFile.name],
            pro: videoprogress,
          });
    
        });
    
        // Handle successful upload and retrieve download URL
        try {
          await uploadVideoTask;
          const downloadURL = await getDownloadURL(fileimageRef);
          // Handle the download URL (e.g., store it in a database)
            if (downloadURL) {
              setimgPro(false)
          }
          setimageUrl(downloadURL)
          console.log("File uploaded successfully:", downloadURL);
        } catch (error) {
          console.error("Error uploading file:", error);
        }
    
        // Wait for all uploads to finish before proceeding (optional)
    
        console.log("ppp", videoPro);
        // Reset state after successful upload
      };

  useEffect(() => {
      console.log("one more time")
        try {
            const jwtverify = async () => {
                const verifydone= await fetch(`${appBaseUrl}/api/tokengetter`, {
                 method: "Post"
                })
                 const responseVerify = await verifydone.json()
                 return responseVerify
              }
              myiduser = jwtverify().then((response) => {
                return response.verifytoken.userid;
              })
            console.log("ben10",myiduser)
              
          setuserEditId(myiduser)
        } catch (error) {
            // console.log("something went wrong...edit")
        }
    EditPageInfo()
    }, [change])
    
    async function EditPageInfo(){
        const profileId = await myiduser
        console.log("profileid",profileId)
        const Populateres = await fetch(`${appBaseUrl}/api/teacherprofileedit`, {
            method: "Post",
            body: JSON.stringify({ profileId })
        });
        const populateResDone = await Populateres.json()
      // console.log("popopo", populateResDone)
        setusername(populateResDone.message[0].name)
        
        
        const objPopulate={name:populateResDone.message[0].name,lastname:populateResDone.message[0].lastname,email:populateResDone.message[0].email,bio:populateResDone.message[0].bio,profession:populateResDone.message[0].profession,image:populateResDone.message[0].image}
        setpopulateInfo(objPopulate)
    }
    console.log("inff",populateInfo)

  const changesSaved = async () => {
   console.log("click")
      const resId = await userEditId.then((response) => { return response })
    try {
      
      if (Object.keys(errors).length === 0 && populateInfo.name!="") { 
          setloader(true)
          // setsaveload(true)
          const copyobj = { ...populateInfo }
          const remove = ["image"]
          
          for (const field of remove) {
            delete copyobj[field]
          }
        
          const newobj = { ...copyobj,image:imageUrl || populateInfo.image || "/profiledummy.png" }
          // console.log("reqqq",newobj)
          console.log("new obj",newobj)
         try {
          const editSaved = await fetch(`${appBaseUrl}/api/teacherprofileupdate`, {
            method: "Post",
            body: JSON.stringify({ myiduser: resId,...newobj })
        })
           const saveres = await editSaved.json()
           console.log("teacher setting",saveres)
           if (saveres.success == true) {
               setloader(false)
                 setsaved(false)
                 setchange(2)
             }
         } catch (error) {
          // console.log("error")
         } finally {
       setloader(false)
          }
        
          
        }
      } catch (error) {
        console.log("invalid edit details")
      }
      
        
    }
  
  
    const deleteImage = async () => {
        const secondresId = await userEditId.then((response) => { return response })
        const imageasset = await fetch(`${appBaseUrl}/api/teacherprofileupdate/deleteprofileimage`, {
            method: "Post",
            body: JSON.stringify({  myiduser: secondresId })
        })
        const imageRes = await imageasset.json()
        
      if (imageRes.success == true) {
          setimageUrl()
          setchange(1)
          
        }
    }
    
  const initialvalue = {
    name: "",
    contact:""
  };

  const { errors, touched, handleBlur, handleChange, values } = useFormik({
    initialValues: initialvalue,
    validationSchema: teacherYupProfiles,
    onSubmit: (values) => {},
  });

  values.name = populateInfo.name
 
  console.log("hari", values)
  return (
      <>
         
        
          <div className='flex flex-col w-full'>
              
          <div id="alert-4" className="flex items-center p-4 mb-4 text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300" role="alert">
  <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
  </svg>
  <span className="sr-only">Info</span>
  <div className="ms-3 text-sm font-medium">
   By default your tutor name is taken as your student profile name, you can change it here
  </div>
</div>
      <div className="bg-white w-full flex flex-col gap-5 px-3 md:px-16 lg:px-28 md:flex-row text-[#161931]">

    <main className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
        <div className="p-2 md:p-4">
            <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
                <h2 className="pl-6 text-2xl font-bold sm:text-xl">Public Profile</h2>

                <div className="grid max-w-2xl mx-auto mt-8">
                    <div className="flex relative flex-col items-center space-y-5 sm:flex-row sm:space-y-0 ">
                                      <div className='object-cover relative w-40 h-40 rounded-full overflow-hidden border-2 border-indigo-300 ring-offset-2 dark:ring-indigo-500'>
                                          
                                      <img className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
                                              src={imageUrl || populateInfo.image} />
                                          {imgPro==true?<div role="status" className="w-full h-full flex justify-center items-center bg-slate-500 opacity-80 absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">
        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
        <span className="sr-only">Loading...</span>
    </div>:null}
                         </div>

                        <div className="flex flex-col space-y-5 sm:ml-8">
                                          <button type="button" onClick={() => {
                                              const image = document.querySelector(".inputimage")
                                              image.click()
                            }}
                                className="py-3.5 px-7 text-base font-medium text-indigo-100 focus:outline-none bg-[#202142] rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200 ">
                                Change picture
                                          </button>
                                          <input ref={imageRef} type='file' className='inputimage hidden' onChange={(event) => {
                                              profileImage();
                                              
                  }}/>
                            <button type="button" onClick={()=>{deleteImage()}}
                                className="py-3.5 px-7 text-base font-medium text-indigo-900 focus:outline-none bg-white rounded-lg border border-indigo-200 hover:bg-indigo-100 hover:text-[#202142] focus:z-10 focus:ring-4 focus:ring-indigo-200 ">
                                Delete picture
                            </button>
                                      </div>
                                     
                    </div>

                    <div className="items-center mt-8 sm:mt-14 text-[#202142]">

                        <div
                            className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                            <div className="w-full">
                                <label for="first_name"
                                    className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">Your
                                    first name</label>
                                <input type="text" name='name' id="first_name"
                                    className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                                    placeholder="Your first name"
                                    value={populateInfo.name} onChange={(e)=>{setpopulateInfo({...populateInfo,name:e.target.value})}}/>
                            </div>

                            <div className="w-full">
                                <label for="last_name"
                                    className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">Your
                                    last name</label>
                                <input type="text" id="last_name" name='lastname'
                                    className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                                    placeholder="Your last name" value={populateInfo.lastname} onChange={(e)=>{setpopulateInfo({...populateInfo,lastname:e.target.value})}}/>
                            </div>

                        </div>

                        <div className="mb-2 sm:mb-6">
                            <label for="email"
                                className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">Your
                                email</label>
                            <input type="email" id="email" name='email'
                                className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                                placeholder="your.email@mail.com"value={populateInfo.email} onChange={(e)=>{setpopulateInfo({...populateInfo,email:e.target.value})}}/>
                        </div>

                        <div className="mb-2 sm:mb-6">
                            <label for="profession"
                                className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">Profession</label>
                            <input type="text" id="profession" name='profession'
                                className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                                placeholder="your profession" value={populateInfo.profession} onChange={(e)=>{setpopulateInfo({...populateInfo,profession:e.target.value})}}/>
                        </div>

                        <div className="mb-6">
                            <label for="message"
                                className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">Bio</label>
                            <textarea id="message" rows="4" name='bio'
                                className="block p-2.5 w-full text-sm text-indigo-900 bg-indigo-50 rounded-lg border border-indigo-300 focus:ring-indigo-500 focus:border-indigo-500 "
                                placeholder="Write your bio here..." value={populateInfo.bio} onChange={(e)=>{setpopulateInfo({...populateInfo,bio:e.target.value})}} ></textarea>
                        </div>

                        <div className="flex justify-end">
                            <button type="submit" onClick={()=>{changesSaved()}}
                        className="text-white bg-indigo-700  hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800">{loader == true ?
                          <div role="status">
                            <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                            <span class="sr-only">Loading...</span>
                          </div>
                          : <span>save</span>}</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </main>
</div>
          </div>
      </>
  )
}

export default Page
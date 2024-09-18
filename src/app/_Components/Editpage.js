"use client"
import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { appBaseUrl } from '@/schema/appurl'
import { editinfoSchema } from '@/schema/yupschema';
import Navbar from './Navbar';
import Link from 'next/link';

const Editpage = ({ data }) => {
    const [populateInfo, setpopulateInfo] = useState({})
    const [userEditId, setuserEditId] = useState()
  const [formerr, setformerr] = useState({ nameerr: false, contacterr: false })
  const [saveload, setsaveload] = useState(false)
  const [username, setusername] = useState()
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
                return response.verifytoken.userid;
              })
            // console.log("ben10",myiduser)
              
          setuserEditId(myiduser)
        } catch (error) {
            // console.log("something went wrong...edit")
        }
    EditPageInfo()
    }, [])
    
    async function EditPageInfo(){
        const profileId = await myiduser
        // console.log("profileid",profileId)
        const Populateres = await fetch(`${appBaseUrl}/api/editprofile`, {
            method: "Post",
            body: JSON.stringify({ profileId })
        });
        const populateResDone = await Populateres.json()
      // console.log("popopo", populateResDone)
      setusername(populateResDone.message[0].name)
        const objPopulate={name:populateResDone.message[0].name,email:populateResDone.message[0].email,address:populateResDone.message[0].address,contact:populateResDone.message[0].contact}
        setpopulateInfo(objPopulate)
}

  const changesSaved = async () => {
   
      const resId = await userEditId.then((response) => { return response })
      try {
       
        if (Object.keys(errors).length === 0 && username!="") { 
          setsaveload(true)
          const copyobj = { ...populateInfo }
          const remove = ["name"]
          
          for (const field of remove) {
            delete copyobj[field]
          }
        
          const newobj = { ...copyobj, name: username }
          // console.log("reqqq",newobj)

         try {
          const editSaved = await fetch(`${appBaseUrl}/api/updateedit`, {
            method: "Post",
            body: JSON.stringify({ myiduser: resId,...newobj })
        })
        const saveres=await editSaved.json()
         } catch (error) {
          // console.log("error")
         } finally {
           setsaveload(false)
       
          }
        
          
        }
      } catch (error) {
        // console.log("invalid edit details")
      }
      
        
    }
  // console.log("hari", populateInfo)
  

  const initialvalue = {
    name: "",
    contact:""
  };

  const { errors, touched, handleBlur, handleChange, values } = useFormik({
    initialValues: initialvalue,
    validationSchema: editinfoSchema,
    onSubmit: (values) => {},
  });

  values.name = populateInfo.name
  values.contact = populateInfo.contact
 
  // console.log(values)
  // console.log("formikerr",errors)
  return (
    <>
      <Navbar/>
      
      <div class="container mx-auto px-4 py-8 font-[Poppins] ">
        <div className='mx-64 flex gap-4 items-center'>
          <Link href="/stdashboard">
          
        <svg class="w-9 h-9 text-[#d42eeb] dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12l4-4m-4 4 4 4"/>
</svg>
          </Link>

<h2 className='text-[#d42eeb] text-2xl font-[Poppins] font-semibold'>Profile</h2>
        </div>
    <div class="flex flex-col justify-center items-center md:space-x-8">
      <div class="w-full md:w-1/3">
        <div class="flex items-center justify-center p-4 ">
          <img class="w-32 h-32 rounded-full object-cover border-4 border-[#d42eeb] mx-auto" src="/profiledummy.png" alt="Profile picture"/>
          
        </div>
      </div>

      <div class="w-full md:w-2/3">
        <div class="rounded-lg shadow-md p-4">
          <h2 class="text-lg  mb-4">Edit Profile</h2>
          
            <div class="mb-4">
              <label for="name" class="block text-gray-400  mb-2">Name</label>
              <input type="text" id="name" name="name" class="w-full px-4 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none" value={values.name}
                  onChange={(e) => {
                    handleChange,
                    
                      setpopulateInfo({ ...populateInfo, name: e.target.value });
                      setusername(e.target.value)
                  }}
                  onBlur={handleBlur} />
                 {errors.name && touched.name ? <p className="text-red-400 text-sm">{errors.name }</p>:null}
            </div>
            <div class="mb-4">
              <label for="email" class="block text-gray-400  mb-2">Email</label>
              <input type="email" id="email" name="email" value={populateInfo.email} class="w-full px-4 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none" disabled/>
            </div>
            <div class="mb-4 flex flex-col">
              <label for="bio" class="block text-gray-400  mb-2">Address</label>
                              <input id="bio" name="address"  rows="4" class="w-full px-4 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none" value={populateInfo.address} onChange={(e)=>{setpopulateInfo({...populateInfo,address:e.target.value})}}/>
                          </div>
                         
                          <div class="mb-4">
              <label for="bio" class="block text-gray-400  mb-2">contact</label>
                              <input id="bio" name="contact"  rows="4" class="w-full px-4 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none" value={values.contact}
                  onChange={(e) => {
                    handleChange,
                    setpopulateInfo({...populateInfo,contact:e.target.value})
                    }}
                    onBlur={handleBlur} />
                {errors.contact && touched.contact ? <p className="text-red-400 text-sm">{errors.contact }</p>:null}
              </div>
            <button onClick={()=>changesSaved()} type="submit" class="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none">{saveload==false?"save":<div role="status">
                            <svg aria-hidden="true" class="w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                            </svg>
                            <span class="sr-only">Loading...</span>
                        </div>}</button>

        </div>
      </div>
    </div>
      </div>
      <ToastContainer />
      </>
  )
}

export default Editpage
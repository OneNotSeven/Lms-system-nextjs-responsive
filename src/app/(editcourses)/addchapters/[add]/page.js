"use client"
import Link from "next/link";
import React, { useRef, useState } from "react";
import { storage } from "@/app/config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { appBaseUrl } from "@/schema/appurl";
import { chaptersSchemaSecond } from "@/schema/yupschema";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";

const Page = ({ params }) => {
 const [dynamic, setdynamic] = useState(params.add)

  const [videoid, setvideoid] = useState("")
  const [details, setdetails] = useState({title:"",})
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fileurl, setfileurl] = useState("")
  const [attachementDetails, setattachementDetails] = useState([{}])
  const [progresses, setProgresses] = useState({}); // Object to store progress for each file
  const [videoPro, setvideoPro] = useState({});
  const [thumbPro, setthumbPro] = useState({});
  const [thumbUrl, setthumbUrl] = useState("");
  const [videoUrl, setvideoUrl] = useState("")
  const [uploadState, setuploadState] = useState("");
  const [loader, setloader] = useState(false)

  const router = useRouter()
  

  const uploadTaskRef = useRef(null);
  const uploadVideoTaskRef = useRef(null);
  const thumbTaskRef = useRef(null);

  const inputRef = useRef(null);
  const videoRef = useRef(null);
  const thumbRef = useRef(null);
  

  const submitFiles = async (e) => {
    const fileArray = Array.from(inputRef.current.files);

    // Create an upload task and progress tracker for each file
    for (let i = 0; i <= fileArray.length - 1; i++) {
      const fileRef = ref(storage, `files/${fileArray[i].name}`);
      const uploadTask = uploadBytesResumable(fileRef, fileArray[i]);
      uploadTaskRef.current = uploadTask;

      // Update progress state for each file during upload
      uploadTask.on("state_changed", (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgresses({
          name: [fileArray[i].name],
          pro: progress,
        });

        switch (snapshot.state) {
          case "paused":
            setuploadState("paused");
            break;
          case "running":
            setuploadState("running");
            break;
          case "success":
            setuploadState("success");
            break;
          case "canceled":
            setuploadState("canceled");
            break;
          default:
            break;
        }
      });

      // Handle successful upload and retrieve download URL
      try {
        await uploadTask;
        const downloadURL = await getDownloadURL(fileRef);
        setfileurl((pre) => [...pre, { filename: fileArray[i].name, filesrc: downloadURL }])

        // console.log("File uploaded successfully:", downloadURL);
      } catch (error) {
        // console.error("Error uploading file:", error);
      }
    }

    
    
    // Wait for all uploads to finish before proceeding (optional)

    // Reset state after successful upload
    
  };

 

  // console.log("attachement", attachementDetails)
  // console.log("url",fileurl)

  const videoFiles = async (e) => {
    // console.log(videoRef.current.files);

    const videofile = videoRef.current.files[0];
    // console.log(videofile.name);

    // Create an upload task and progress tracker for each file

    const fileVideoRef = ref(storage, `videos/${videofile.name}`);
    const uploadVideoTask = uploadBytesResumable(fileVideoRef, videofile);
    uploadVideoTaskRef.current = uploadVideoTask;

    // Update progress state for each file during upload
    uploadVideoTask.on("state_changed", (snapshot) => {
      const videoprogress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );

      setvideoPro({
        name: [videofile.name],
        pro: videoprogress,
      });

      switch (snapshot.state) {
        case "paused":
          setuploadState("paused");
          break;
        case "running":
          setuploadState("running");
          break;
        case "success":
          setuploadState("success");
          break;
        case "canceled":
          setuploadState("canceled");
          break;
        default:
          break;
      }
    });

    // Handle successful upload and retrieve download URL
    try {
      await uploadVideoTask;
      const downloadURL = await getDownloadURL(fileVideoRef);
      // Handle the download URL (e.g., store it in a database)
      const videoids=v4()
      setvideoid(videoids)
      setvideoUrl(downloadURL)
      // console.log("File uploaded successfully:", downloadURL);
    } catch (error) {
      // console.error("Error uploading file:", error);
    }

    // Wait for all uploads to finish before proceeding (optional)

    // console.log("ppp", videoPro);
    // Reset state after successful upload
  };


  const submitDetails = async () => {
    const free = [{ filename: selectedFiles, filesrc: [...fileurl] }]
    const filearr = selectedFiles.map((items) => items.name)
    // console.log("ftre", free)
    if (Object.keys(errors).length === 0 && videoUrl) {
setloader(true)
      const upload = await fetch(`${appBaseUrl}/api/addnewchapter`, {
        method: "POST",
        body: JSON.stringify({
          courseid: dynamic,fileattachment: [ ...fileurl], videosrc: [{videoId:videoid, chaptername: values.chaptername, title: values.title, desc: values.desc, fee: "0", link: videoUrl }]
        })
      });

      const responseAdd = await upload.json()
      if (responseAdd.success == true) {
        setloader(false)
        router.push("/teachers/upload")
        console.log("video added successfully")
      } else {
        setloader(false)
    }
     }

    
  }

  const initialvalue = {
    title: "",
    desc: "",
    chaptername:"",

    
}
  const { errors, touched, handleBlur, handleChange, values } = useFormik({
    initialValues: initialvalue,
    validationSchema: chaptersSchemaSecond,
    onSubmit: (values) => {},
  });
    return (
    
    <>
      <div className="w-full p-7 flex flex-col font-[Poppins]">
        <h5
          id="drawer-label"
          className="inline-flex w-full gap-3 items-center mb-6 text-base font-semibold text-gray-500 uppercase"
        >
          <Link href="/teachers/upload">
            <svg
              className="w-6 h-6 text-gray-800"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 12h14M5 12l4-4m-4 4 4 4"
              />
            </svg>
          </Link>
          Add Chapters to your Course
        </h5>
        <div className=" flex lg:flex-row flex-col">
            <div className="flex flex-col w-full">
            <div className="mb-6">
              <label
                for="chaptername"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Chapter name
              </label>
              <input
                type="text"
                  id="chaptername"
                  value={values.chaptername}
                  name="chaptername"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Chapter 1: Gravity"
                required
                onChange= {handleChange}
                onBlur={handleBlur}
              />
               {errors.chaptername && touched.chaptername ? (
                  <p className="text-red-400 text-sm">{errors.chaptername}</p>
                ) : null}
            </div>
        
            <div className="mb-6">
              <label
                for="title"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Title
              </label>
              <input
                type="text"
                  id="title"
                  name="title"
                  value={values.title}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Gravity"
                required
                onChange= {handleChange}
                onBlur={handleBlur}
              />
               {errors.title && touched.title ? (
                  <p className="text-red-400 text-sm">{errors.title}</p>
                ) : null}
            </div>

            
            <div className="mb-6">
              <label
                for="description"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Description
              </label>
              <textarea
                id="description"
                  rows="4"
                  name="desc"
                  value={values.desc}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Write a description..."
                  onChange= {handleChange}
                onBlur={handleBlur}
        
                ></textarea>
                {errors.desc && touched.desc ? (
                   <p className="text-red-400 text-sm">{errors.desc}</p>
                 ) : null}
            </div>

      

            

            {/* files uploading */}

            <div>
              <h1>Upload Multiple Files</h1>
              <label for="fileInput">
                <div className="flex items-center justify-start p-4 gap-3  border border-gray-700 border-dashed rounded-lg">
                  <svg
                    className="w-6 h-6 text-gray-400 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="text-sm font-semibold text-gray-400">
                    Click to upload
                  </p>
                </div>
                <input
                  type="file"
                  ref={inputRef}
                  id="fileInput"
                  className="hidden"
                  multiple
                  onChange={(event) => {
                    setSelectedFiles((pre) => [...pre, ...event.target.files]);

                    submitFiles();
                  }}
                />
              </label>

              <ul className={`filelist flex rounded-xl flex-col gap-1 mt-2 ${selectedFiles.length>0?"bg-[#e7a5e3]":null} p-3`}>
                <div className="flex flex-col justify-between">
                  {selectedFiles.length > 0 ? (
                    <span>File Attachments </span>
                  ) : null}
                  {Object.keys(progresses).length != 0 ? (
                    <span className=" font-semibold text-sm">
                      {progresses.name + ":" + progresses.pro + "%"}
                    </span>
                  ) : null}
                </div>
                {selectedFiles.map((file, idx) => (
                  <>
                    <div className=" flex justify-between bg-[#d395f3] rounded-md p-3">
                      <li className="list" key={file.name}>
                        {file.name}
                      </li>
                      {/* <span>{ progresses}</span> */}
                      <svg
                        onClick={() => {
                          selectedFiles.splice(idx, 1);
                          setSelectedFiles([...selectedFiles]);

                          if (uploadTaskRef.current) {
                            uploadTaskRef.current.cancel();
                          }
                          setProgresses({});
                        }}
                        className="w-6 h-6 text-gray-800"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="m15 9-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>
                      <span className="sr-only">remove</span>
                    </div>
                  </>
                ))}
              </ul>
            </div>
          </div>

          <div className="w-full flex flex-col">
            <div className="flex flex-col gap-2 items-center justify-center w-full h-fit">
              <span className=" w-full text-gray-700 flex justify-between ">
                <p className=" ml-14 font-semibold">Upload Video</p>
                {Object.keys(videoPro).length != 0 ? (
                  <span className=" font-semibold text-sm">
                    {videoPro.name + ":" + videoPro.pro + "%"}
                  </span>
                ) : null}
                {Object.keys(videoPro).length != 0 ? <svg
                  onClick={() => {
                    if (uploadVideoTaskRef.current) {
                      uploadVideoTaskRef.current.cancel();
                    }
                    const inputvideo = document.querySelector("#dropzone-file")
                    inputvideo.value=""
                    setvideoPro({});
                  }}
                  className="w-6 h-6 text-gray-800"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m15 9-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg> : null}
              </span>
              <label
                for="dropzone-file"
                className="flex max-w-[483px] mx-h-[256px] w-full  relative overflow-hidden object-cover object-center flex-col items-center justify-center lg:w-[483px] h-[256px] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  {videoUrl ? <video width="full" height="full" className="absolute z-10" controls>
                    <source src={videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video> : null}
                  {videoPro.pro != 100 ? <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p> : null}
                   <p className="text-xs text-gray-500">
                    mp4,mkv (MAX. 1920x1080px)
                  </p> 
                </div>
                <input
                  id="dropzone-file"
                  accept="video/mp4"
                  ref={videoRef}
                  type="file"
                  className="hidden"
                  onChange={(event) => {
                    videoFiles();
                  }}
                />
              </label>
            </div>

          </div>
        </div>



        <button onClick={()=>{submitDetails()}}
          type="submit"
          className="text-white mt-6 justify-center flex items-center bg-[#d42eeb] w-fit focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 focus:outline-none"
        >
          <svg
            className="w-3.5 h-3.5 me-2.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M18 2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2ZM2 18V7h6.7l.4-.409A4.309 4.309 0 0 1 15.753 7H18v11H2Z" />
            <path d="M8.139 10.411 5.289 13.3A1 1 0 0 0 5 14v2a1 1 0 0 0 1 1h2a1 1 0 0 0 .7-.288l2.886-2.851-3.447-3.45ZM14 8a2.463 2.463 0 0 0-3.484 0l-.971.983 3.468 3.468.987-.971A2.463 2.463 0 0 0 14 8Z" />
          </svg>{" "}
          Upload
          </button>
          {loader ? <div id="loadingModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50 ">
            <div class="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
              <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-[#d42eeb]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
              </svg>
              <p class="mt-4 text-gray-700">Uploading, please wait...</p>
            </div>
          </div> : null}
      </div>
    </>


            
    
  )
}

export default Page

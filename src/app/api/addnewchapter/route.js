import { tutorInfo } from "@/schema/tutor";
import mongoose from "mongoose";
import { NextResponse } from "next/server"


export async function POST(req,res) {
    const updateNew = await req.json()
    const videoobj = {...updateNew.videosrc}
    // console.log("addnewchapterapi",updateNew)
 
    // console.log("addvideo",updateNew.videosrc[0])
    try {
        await mongoose.connect(process.env.NEXT_MONGO_CONNECT, { useNewUrlParser: true })
        
        const addVideo = await tutorInfo.updateOne({ courseId: updateNew.courseid }, { $push: { videosrc: updateNew.videosrc[0] } })
        const addFile = await tutorInfo.updateOne({ courseId: updateNew.courseid }, { $push: { fileattachment: [...updateNew.fileattachment ] } })
        // console.log("filessadded",addFile)
 
      if (addVideo.modifiedCount === 1) {
        return NextResponse.json({message:"successfully video added",success:true},{status:200})
       } else {
        return NextResponse.json({message:"something went wrong",success:false},{status:201})
       }
     } catch (error) {
      //  console.error(error);
       return NextResponse.json({message:"error",success:false},{status:500})
     }
 }
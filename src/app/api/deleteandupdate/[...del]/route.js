import { tutorInfo } from "@/schema/tutor";
import mongoose from "mongoose";
import { NextResponse } from "next/server"


export async function DELETE(req,res) {
  const courseid=res.params.del[0]
  const id = res.params.del[1]
    // console.log("del",res)
 
    try {
        await mongoose.connect(process.env.NEXT_MONGO_CONNECT, { useNewUrlParser: true })
        
      const delRes = await tutorInfo.updateOne({courseId:courseid},{ $pull: { videosrc: { _id: id } } })
            // console.log("delRes",delRes)
 
      if (delRes.modifiedCount === 1) {
        const getVideosFiles=await tutorInfo.find({courseId:courseid})
        return NextResponse.json({message:getVideosFiles,success:true},{status:200})
       } else {
        return NextResponse.json({message:"something went wrong",success:false},{status:201})
       }
     } catch (error) {
      //  console.error(error);
       return NextResponse.json({message:"error",success:false},{status:500})
     }
 }
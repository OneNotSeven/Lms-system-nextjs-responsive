import { tutorInfo } from "@/schema/tutor";
import mongoose from "mongoose";
import { NextResponse } from "next/server"


export async function DELETE(req,res) {
  const courseid=res.params.filesdelete[0]
  const id = res.params.filesdelete[1]
    // console.log("filedel",res)
 
    try {
        await mongoose.connect(process.env.NEXT_MONGO_CONNECT, { useNewUrlParser: true })
        
      const delRes = await tutorInfo.updateOne({courseId:courseid},{ $pull: { fileattachment: { _id: id } } })
            // console.log("delRes",delRes)
 
      if (delRes.modifiedCount === 1) {
         const getfiles=await tutorInfo.find({courseId:courseid})
        return NextResponse.json({message:getfiles,success:true},{status:200})
       } else {
        return NextResponse.json({message:"something went wrong",success:false},{status:201})
       }
     } catch (error) {
      //  console.error(error);
       return NextResponse.json({message:"error",success:false},{status:201})
     }
 }
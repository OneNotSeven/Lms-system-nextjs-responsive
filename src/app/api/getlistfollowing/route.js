
import { teacherInfo } from "@/schema/teacherschema";
import mongoose from "mongoose";
import { NextResponse } from "next/server"


export async function POST(req,res) {
    const { userId }=await req.json()
    
    try {
        await mongoose.connect(process.env.NEXT_MONGO_CONNECT, { useNewUrlParser: true })

      const checker = await teacherInfo.find({ "followers.userid": userId } ).limit(5)
    
        
        return NextResponse.json({message:checker,success:true},{status:200})
        
       
       
      
     } catch (error) {
      //  console.error(error);
       return NextResponse.json({message:"error",success:false},{status:500})
     }
 }
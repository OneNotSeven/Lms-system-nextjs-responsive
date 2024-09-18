import { teacherInfo } from "@/schema/teacherschema"
import mongoose from "mongoose"
import { NextResponse } from "next/server"

export async function POST(req) {
    try {
        const editUpdate = await req.json()
        // console.log("retee",editUpdate)
        const userId=await editUpdate.myiduser
        await mongoose.connect(process.env.NEXT_MONGO_CONNECT, { useNewUrlParser: true })
        const editUpdated = await teacherInfo.updateOne({ userId: userId }, { $set: {image:"/profiledummy.png"} })
        return NextResponse.json({message:"success",success:true},{status:200})
        
    } catch (error) {
        return NextResponse.json({message:"failed",success:false},{status:500})
    }
   
}


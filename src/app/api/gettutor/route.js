import { tutorInfo } from "@/schema/tutor"
import mongoose from "mongoose"
import { NextResponse } from "next/server"




export async function POST(req) {
    try {
        const userid = await req.json()
    
        
    // console.log("tutorDetails", userid)
    await mongoose.connect(process.env.NEXT_MONGO_CONNECT, { useNewUrlParser: true })
        
        const courseinfo = await tutorInfo.find({ userId: userid.userId })
            // console.log("tutorAdd",courseinfo)
            return NextResponse.json({message:courseinfo,success:true},{status:200})
    
    
    } catch (error) {
        return NextResponse.json({message:error,success:false},{status:500})
    }
}
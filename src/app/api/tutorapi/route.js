import { tutorInfo } from "@/schema/tutor"
import mongoose from "mongoose"
import { NextResponse } from "next/server"

export async function GET() {
    // console.log(process.env.NEXT_MONGO_CONNECT)
    return NextResponse.json({message:"true",success:true},{status:200})
}

export async function POST(req) {
    // console.log(process.env.NEXT_MONGO_CONNECT)
    try {
        const tutorDetails = await req.json()
        const check=tutorDetails.courseId
    
        
    // console.log("tutorDetails", tutorDetails)
    await mongoose.connect(process.env.NEXT_MONGO_CONNECT, { useNewUrlParser: true })
        
        const tutorAdd = await new tutorInfo(tutorDetails)
        await tutorAdd.save()
    
            // console.log("tutorAdd",tutorAdd)
            return NextResponse.json({message:"success",success:true},{status:200})
    
    
    } catch (error) {
        return NextResponse.json({message:error,success:false},{status:500})
    }
}
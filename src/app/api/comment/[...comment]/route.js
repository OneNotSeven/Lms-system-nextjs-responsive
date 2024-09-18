import { tutorInfo } from "@/schema/tutor"
import mongoose from "mongoose"
import { NextResponse } from "next/server"

export async function GET(req,content) {

    const courseid=content.params.comment[0]
    try {
        await mongoose.connect(process.env.NEXT_MONGO_CONNECT, { useNewUrlParser: true })

        const getComment = await tutorInfo.find({ courseId: courseid })

        return NextResponse.json({message:getComment,success:true},{status:200})  
        
    } catch (error) {
        return NextResponse.json({message:"error",success:false},{status:404})
    }
    
}
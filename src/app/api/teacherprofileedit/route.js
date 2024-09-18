
import { teacherInfo } from "@/schema/teacherschema"
import mongoose from "mongoose"
import { NextResponse } from "next/server"

export async function POST(req) {
    
    const { profileId } = await req.json()
    // console.log(profileId)
    await mongoose.connect(process.env.NEXT_MONGO_CONNECT, { useNewUrlParser: true })
    const payload = await teacherInfo.find({ userId:profileId } )
    return NextResponse.json({message:payload,success:true},{status:200})
}
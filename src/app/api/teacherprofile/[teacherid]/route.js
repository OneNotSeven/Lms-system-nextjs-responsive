import { studentCart } from "@/schema/studentcart"
import { tutorInfo } from "@/schema/tutor"
import mongoose from "mongoose"
import { NextResponse } from "next/server"

export async function GET(req, res) {
    const id = res.params.teacherid
    try {
        await mongoose.connect(process.env.NEXT_MONGO_CONNECT, { useNewUrlParser: true })
        const cart = await tutorInfo.find({ userId: id })
        const filteration=cart.map((items,idx)=>items.courses.courseId)
        // console.log("main",filteration)
        const courseBasedCart = await tutorInfo.find({ courseId: filteration })
        // console.log("finalcart",courseBasedCart)
        return NextResponse.json({message:courseBasedCart,success:true},{status:200})
    } catch (error) {
        return NextResponse.json({message:"error",success:false},{status:200})
    }
    
}
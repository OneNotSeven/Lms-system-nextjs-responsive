

import { studentCart } from "@/schema/studentcart"
import mongoose from "mongoose"
import { NextResponse } from "next/server"

export async function POST(req) {
    const cartdetails = await req.json()
    const courseid = cartdetails.courses.courseId
    const userid = cartdetails.userId;
    
    let cartWithCourse
    try {

    await mongoose.connect(process.env.NEXT_MONGO_CONNECT, { useNewUrlParser: true })
        
    const carts = await studentCart.find({userId: userid });
    // console.log("chetter", carts)
       
    const cartWithCourse = await carts.find((cart) => cart.courses.courseId== courseid);
    // console.log("cartwithcourses",cartWithCourse)
        
    
        
        if (carts.length>0 && cartWithCourse) { 
            
            
            return NextResponse.json({ message: "Course already in cart", success: false }, { status: 200 });
        } else {
            const cartInfo = await new studentCart(cartdetails)
            await cartInfo.save()
            // console.log("tutorAdd",cartInfo)
            return NextResponse.json({ message: cartInfo, success: true }, { status: 200 })
        }
       
    
    
    } catch (error) {
        return NextResponse.json({message:"error",success:false},{status:500})
    }
    
}
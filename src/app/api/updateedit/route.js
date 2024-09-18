import { EcomSchema } from "@/schema/signupSchema"
import mongoose from "mongoose"
import { NextResponse } from "next/server"

export async function POST(req) {
    try {
        const editUpdate = await req.json()
        // console.log("retee",editUpdate)
        const userId=await editUpdate.myiduser
        await mongoose.connect(process.env.NEXT_MONGO_CONNECT, { useNewUrlParser: true })
        const editUpdated=await EcomSchema.updateOne({ _id:userId }, { $set:{name:editUpdate.name, address:editUpdate.address,contact:editUpdate.contact } })
        return NextResponse.json({message:"success",success:true},{status:200})
        
    } catch (error) {
        return NextResponse.json({message:"failed",success:false},{status:500})
    }
   
}


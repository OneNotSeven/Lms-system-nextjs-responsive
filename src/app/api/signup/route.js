import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"
import mongoose from "mongoose";
import { EcomSchema } from "@/schema/signupSchema";
import { teacherInfo } from "@/schema/teacherschema";


export function GET() {
    return NextResponse.json({message:working,success:true},{status:200})
}

export async function POST(request) {
  // console.log("connection",process.env.NEXT_MONGO_CONNECT)
    try {
    const userdetail = await request.json()
    // console.log("userdetail",userdetail)
    const email= await userdetail.email
    await mongoose.connect(process.env.NEXT_MONGO_CONNECT, { usenewUrlParser: true });
    const emailchecker=await EcomSchema.find({email})
    // console.log("email checker",emailchecker)
    if (emailchecker.length <= 0) {
        
        userdetail.password = bcrypt.hashSync(userdetail.password, 10)
        
      const data = await new EcomSchema(userdetail)
      await data.save()
      const teacher = await new teacherInfo({name: userdetail.name,userId:data._id })
      await teacher.save()
        // console.log("signupjwt", data)

        var objectIdAsString = await data._id
        
        var auth_token = jwt.sign(
            { userid:objectIdAsString },
            toString(process.env.NEXT_SECRET_TOKEN_KEY)
          );
      
        // console.log("hey",objectIdAsString)
         
      
          const response = NextResponse.json({ message: "connected", success: true }, { status: 200 });
      
          response.cookies.set("authtoken", auth_token, {
            expiresIn: "1d",
            httpOnly: true,
            secure:true
          });
      
          return response;

    } else {
        throw new Error
    }
    
  
  
        // return NextResponse.json({ message: "connected", success: true }, { status: 200 })  
        
    } catch (error) {
        error.message = "email already registered"
        return NextResponse.json({message:error.message,success:false},{status:201})
   }
     
}
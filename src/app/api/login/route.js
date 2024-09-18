import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import bcrypt from "bcryptjs"
import { NextResponse } from "next/server";
import { EcomSchema } from "@/schema/signupSchema";



export async function POST(request) {
  // console.log("hari bol");
  try {
    const comp_data = await request.json();
    // console.log(comp_data);
    await mongoose.connect(process.env.NEXT_MONGO_CONNECT, { useNewUrlParser: true });
    const email = await comp_data.email;
    const comp = await EcomSchema.find({ email });
   
    const objectId =  comp[0]._id
    const objectIdAsString = objectId.toString();
    // console.log(objectIdAsString)

    const matched = bcrypt.compareSync(comp_data.password, comp[0].password);

    if (matched==false) {
     
      throw new err
    }
    
    
   

    var auth_token = jwt.sign(
      { userid:objectIdAsString },
      toString(process.env.NEXT_SECRET_TOKEN_KEY)
    );


   

    const response = NextResponse.json({ message: "successfull",success: true }, { status: 200 });

    response.cookies.set("authtoken", auth_token, {
      expiresIn: "1d",
      
      httpOnly: true,
      secure:true
    });

    return response;

  } catch (error) {
    error.message = "wrong password";
    return NextResponse.json(
      { message: error.message, success: false },
      { status: 201 }
    );
  }
}

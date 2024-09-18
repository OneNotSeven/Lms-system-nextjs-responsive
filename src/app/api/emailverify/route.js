

import mongoose from "mongoose"
import { NextResponse } from "next/server"
import jwt from "jsonwebtoken";
import { EcomSchema } from "@/schema/signupSchema";
import { appBaseUrl } from "@/schema/appurl";

// import nodemailer from "nodemailer"

const nodemailer = require("nodemailer")

export async function POST(req) {
   try {
    const { email } = await req.json()
    await mongoose.connect(process.env.NEXT_MONGO_CONNECT, { useNewUrlParser: true })
    const schemaEmailVerify = await EcomSchema.find({ email })
    if (!schemaEmailVerify.length) {
       throw new Error
    }
   
    var auth_token = jwt.sign(
        { userId:schemaEmailVerify[0]._id,email:schemaEmailVerify[0].email},
        toString(process.env.SECRET_TOKEN_KEY)
       );
       
       const responsed = NextResponse.json({ message: "verified",success: true }, { status: 200 });

    responsed.cookies.set("authtoken", auth_token, {
      expiresIn: "5m",
      httpOnly: true,
      secure:true
    });
       
       const link = `${appBaseUrl}/forgetpassword/` + `${auth_token}/` + `${schemaEmailVerify[0]._id}`
       
       var nodemailer = require('nodemailer');

// let testaccount=await nodemailer.createTestAccount()

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'theflutebro@gmail.com',
        pass: process.env.NEXT_EMAIL_PASS
    }
});
     


var mailOptions = {
  from: '<theflutebro@gmail.com>',
  to: schemaEmailVerify[0].email,
  subject: 'Reset password valid for 5 minutes',
  text: link
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    // console.log(error);
  } else {
    // console.log('Email sent: ' + info.response);
  }
});
       
 console.log(link)
    return responsed;

    // return NextResponse.json({message:"verified",success:true},{status:200})
   } catch (error) {
     return NextResponse.json({message:"email not found",success:false},{status:500})
   }
}
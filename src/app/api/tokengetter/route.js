import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verify } from "jsonwebtoken";

export function POST() {

    try {
    const token = cookies().get("authtoken")?.value
    // console.log("hgt:",token)
    const secretKey = toString(process.env.NEXT_SECRET_TOKEN_KEY);
    var decoded = jwt.verify(token, secretKey);
    // console.log("tokengetter",decoded)


    return NextResponse.json({message:"connected",verifytoken:decoded,token:token,success:true},{status:200})
    } catch (error) {
        return NextResponse.json({message:"failed",success:false},{status:500})
    }
}
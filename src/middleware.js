import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export default async function middleware(req, res) {
    let value=false
    const token = cookies().get("authtoken")?.value
    let userid
    // console.log("tn", token)
    if (token) {
        const verified = await jwtVerify(
            token,
            new TextEncoder().encode(toString(process.env.SECRET_TOKEN_KEY))
        );
        userid=verified.payload.userid
    }
   

    

    if (token && req.nextUrl.pathname == "/login" && userid ) {
        return NextResponse.redirect(new URL("/stdashboard",req.url))
    }

   

    if (token && req.nextUrl.pathname == "/signup" && userid) {
        return NextResponse.redirect(new URL("/stdashboard",req.url))
    }

    


}

const config = {
    matcher:["/login","/signup"]
}
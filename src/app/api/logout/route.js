import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
    cookies().delete("authtoken");
    return NextResponse.json({message:"success",success:true},{status:200})
}
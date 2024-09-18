import { EcomSchema } from "@/schema/signupSchema";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

// Ensure MongoDB connection is established once
let isConnected = false;

async function connectToDatabase() {
    if (isConnected) return;

    try {
        await mongoose.connect(process.env.NEXT_MONGO_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true });
        isConnected = true;
    } catch (error) {
        console.error("MongoDB connection error:", error);
        throw new Error("MongoDB connection error");
    }
}

export async function GET(req,content) {
   
    const uid = content.params.followcheck[0]
    const tid = content.params.followcheck[1]

    if (!uid || !tid) {
        return NextResponse.json({ message: "Invalid parameters", success: false }, { status: 400 });
    }

    try {
        await connectToDatabase();

        const user = await EcomSchema.findOne({ _id: uid });

        const followed = user.following.includes(tid);
        if (followed) {
            return NextResponse.json({ message: "success", success: true, followed:true }, { status: 200 });
        } else {
            return NextResponse.json({ message: "User not found", success: false,followed:false }, { status: 404 });
        }
    } catch (error) {
        // console.error("Request error:", error);
        return NextResponse.json({ message: "Internal server error", success: false }, { status: 500 });
    }
}

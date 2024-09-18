import { tutorInfo } from "@/schema/tutor";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
    try {
       
        await mongoose.connect(process.env.NEXT_MONGO_CONNECT, { useNewUrlParser: true });


        const page = 1; // Change this based on request parameters
        const pageSize = 3; // Adjust size based on your needs

        // Fetch data with pagination
        const courses = await tutorInfo.aggregate([
            { $sample: { size: 3 } } // Sample 3 random documents
        ]);
       

        
        return NextResponse.json({ message: courses, success: true }, { status: 200 });
    } catch (error) {
        // console.error("Error fetching courses:", error);
        return NextResponse.json({ message: 'Error fetching courses', success: false }, { status: 500 });
    }
}
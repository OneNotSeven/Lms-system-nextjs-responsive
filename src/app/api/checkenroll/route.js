import mongoose from "mongoose";
import { EcomSchema } from "@/schema/signupSchema";
import { tutorInfo } from "@/schema/tutor";
import { NextResponse } from "next/server";

// Connect to MongoDB once during the application startup
if (mongoose.connection.readyState === 0) {
  mongoose.connect(process.env.NEXT_MONGO_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true });
}

export async function POST(req) {
  try {
    const { courseId, userid } = await req.json();

    console.log('courseId:', courseId);
    console.log('userid:', userid);

    // Ensure required fields are present
    if (!courseId || !userid) {
      return NextResponse.json({ message: 'courseId and userid are required.', success: false }, { status: 400 });
    }

    // Check if the user is enrolled
    const user = await EcomSchema.findOne(
      { _id: userid, 'enrolled.courseId': courseId },
      { 'enrolled.$': 1 } // Retrieve only the relevant enrollment document
    ).exec();

    // Fetch course information
    const courseInfo = await tutorInfo.find({ courseId }).exec(); // Use findOne if courseId is unique

    const isEnrolled = user !== null;
    return NextResponse.json({
      message: courseInfo ,
      success: true,
      enrolled: isEnrolled
    }, { status: 200 });

  } catch (error) {
    // console.error('Error in POST request:', error);
    return NextResponse.json({ message: error.message, success: false }, { status: 500 });
  }
}

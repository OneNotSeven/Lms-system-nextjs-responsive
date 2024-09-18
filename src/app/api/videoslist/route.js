import { tutorInfo } from "@/schema/tutor"; // Assuming this imports your Mongoose model
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const details = await req.json();
  // console.log("updateServer", details);

  try {
    // Connect to MongoDB using environment variable
    await mongoose.connect(process.env.NEXT_MONGO_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true });

    // Fetch the full document
    const doc = await tutorInfo.findOne({ courseId: details.courseid });

    if (doc) {
      // Filter the video object
      const video = doc.videosrc.find(video => video._id.toString() == details.videoid);

      // console.log("updateResult", video);
      return NextResponse.json({ message: video, success: true }, { status: 200 });
    } else {
      return NextResponse.json({ message: "Document not found", success: false }, { status: 404 });
    }

  } catch (error) {
    // console.error(error);
    return NextResponse.json({ message: "Internal server error", success: false }, { status: 500 });
  }
}

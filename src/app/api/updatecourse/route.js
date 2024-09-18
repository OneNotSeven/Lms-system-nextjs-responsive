import { tutorInfo } from "@/schema/tutor"; // Assuming this imports your Mongoose model
import mongoose from "mongoose";
import { NextResponse } from "next/server";

// Connect to MongoDB using environment variable


export async function POST(req) {
  try {
    const details = await req.json();
    // console.log("updateServer", details);

    await mongoose.connect(process.env.NEXT_MONGO_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true });

    if (!details.data || !details.data[0] || !details.courseId) {
      return NextResponse.json({ message: "Invalid request data", success: false }, { status: 400 });
    }

    const { _id, ...updateData } = details.data[0]; // Extract _id and other fields to update

    // Perform the update
    const result = await tutorInfo.updateOne(
      { courseId: details.courseId, "videosrc._id": _id },
      { $set: { "videosrc.$": updateData } }
    );

    // console.log("updateResult", result);

    if (result.modifiedCount === 1) {
      // Fetch updated data after successful update
      const updatedFiles = await tutorInfo.find({ courseId: details.courseId });
      return NextResponse.json({ message: updatedFiles, success: true }, { status: 200 });
    } else {
      return NextResponse.json({ message: "Object not found or update failed", success: false }, { status: 404 });
    }
  } catch (error) {
    // console.error("Error during update:", error);
    return NextResponse.json({ message: "Internal server error", success: false }, { status: 500 });
  }
}

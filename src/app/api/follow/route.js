// Import necessary modules and models
import mongoose from 'mongoose';
import { EcomSchema } from '@/schema/signupSchema';
import { teacherInfo } from '@/schema/teacherschema';
import { NextResponse } from 'next/server';

// API Route Handler
export async function POST(req) {
  const { profileId, teacherid } = await req.json();

  console.log("Received request with IDs:", { profileId, teacherid });

  try {
    // Connect to MongoDB
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.NEXT_MONGO_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true });
    }

    // Check if the user is already following the teacher
    const isFollowing = await teacherInfo.findOne({
      userId: teacherid,
      'followers.userid': profileId
    });

    // Check if the teacher is already following the user
    const isFollowedByTeacher = await EcomSchema.findOne({
      _id: profileId,
      following: teacherid
    });

    if (!isFollowing) {
      // Add to followers
      await teacherInfo.updateOne(
        { userId: teacherid },
        { $push: { followers: { userid: profileId } } }
      );

      // Add to following
      await EcomSchema.updateOne(
        { _id: profileId },
        { $push: { following: teacherid } }
      );

      // console.log("User followed successfully.");

      return NextResponse.json({ message: "success", success: true, followed: true }, { status: 200 });
    } else {
      // Remove from followers
      await teacherInfo.updateOne(
        { userId: teacherid },
        { $pull: { followers: { userid: profileId } } }
      );

      // Remove from following
      await EcomSchema.updateOne(
        { _id: profileId },
        { $pull: { following: teacherid } }
      );

      // console.log("User unfollowed successfully.");

      return NextResponse.json({ message: "success", success: true, followed: false }, { status: 200 });
    }
  } catch (error) {
    // console.error("Error occurred:", error);
    return NextResponse.json({ message: "error", success: false }, { status: 500 });
  }
}

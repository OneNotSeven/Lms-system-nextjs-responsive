import mongoose from 'mongoose';
import { tutorInfo } from '@/schema/tutor';
import { NextResponse } from 'next/server';

// Connect to MongoDB once and reuse the connection


export async function POST(req) {
    try {
        const { courseId } = await req.json(); // Assuming the body contains an object with a courseId property
        // console.log('courseId', courseId);
        await mongoose.connect(process.env.NEXT_MONGO_CONNECT, { useNewUrlParser: true })


    const courseResInfo = await tutorInfo.find({ courseId });
    return NextResponse.json({ message: courseResInfo, success: true }, { status: 200 });
  } catch (error) {
    // console.error('Error in POST request:', error);
    return NextResponse.json({ message: error.message, success: false }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { courseId } = await req.json(); // Assuming the body contains an object with a courseId property
    // console.log('courseId', courseId);

    await mongoose.connect(process.env.NEXT_MONGO_CONNECT, { useNewUrlParser: true })

    const deleteResult = await tutorInfo.deleteOne({ courseId });
    if (deleteResult.deletedCount === 0) {
      return NextResponse.json({ message: 'No course found with the given ID', success: false }, { status: 404 });
    }
    return NextResponse.json({ message: 'Course deleted successfully', success: true }, { status: 200 });
  } catch (error) {
    // console.error('Error in DELETE request:', error);
    return NextResponse.json({ message: error.message, success: false }, { status: 500 });
  }
}

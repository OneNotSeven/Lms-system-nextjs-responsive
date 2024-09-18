// pages/api/create-checkout-session.js

import { EcomSchema } from '@/schema/signupSchema';
import { teacherInfo } from '@/schema/teacherschema';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

export async function POST(req) {
    const { courseid, userid, price, teacherid } = await req.json();

    try {
        await mongoose.connect(process.env.NEXT_MONGO_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true });

        // Find the user and check if the course is already enrolled
        const user = await EcomSchema.findOne({ _id: userid });
        if (!user) {
            return NextResponse.json({ message: "User not found", success: false }, { status: 404 });
        }

        // Check if the course is already in the enrolled array
        const courseAlreadyEnrolled = user.enrolled.some(enrollment => enrollment.courseId === courseid);
        if (courseAlreadyEnrolled) {
            return NextResponse.json({ message: "Course already enrolled", success: false }, { status: 400 });
        }

        // Update user to add new course
        await EcomSchema.findOneAndUpdate(
            { _id: userid },
            { $push: { enrolled: { courseId: courseid, price: price } } },
            { new: true }
        );

        // Update teacher information
        await teacherInfo.findOneAndUpdate(
            { userId: teacherid },
            { $push: { enrolleduser: { userId: userid, courseId: courseid, price: price } } },
            { new: true }
        );

        return NextResponse.json({ message: "Payment successful", success: true }, { status: 200 });
    } catch (error) {
        // console.error("Error occurred:", error);
        return NextResponse.json({ message: "Network error", success: false }, { status: 500 });
    }
}

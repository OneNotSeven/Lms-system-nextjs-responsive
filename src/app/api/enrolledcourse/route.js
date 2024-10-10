import mongoose from "mongoose";
import { EcomSchema } from "@/schema/signupSchema";
import { tutorInfo } from "@/schema/tutor";
import { NextResponse } from "next/server";


if (mongoose.connection.readyState === 0) {
  mongoose.connect(process.env.NEXT_MONGO_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

export async function POST(req) {
  try {
    const { userDetails } = await req.json();
    

    const user = await EcomSchema.findOne({ _id: userDetails }, "enrolled.courseId");
    
    if (!user || !user.enrolled) {
      return NextResponse.json({ message: "User not found or no courses enrolled", success: false }, { status: 404 });
    }

    
    const enrolledCart = await Promise.all(
      user.enrolled.map(async (item) => {
        const courseDe = await tutorInfo.find({ courseId: item.courseId }); 
        
        return courseDe; 
      })
    );


    const flattenedEnrolledCart = enrolledCart.flat();

   

    return NextResponse.json({ message:flattenedEnrolledCart , success: true }, { status: 200 });
    
  } catch (error) {
    console.error('Error in POST request:', error);
    return NextResponse.json({ message: error.message, success: false }, { status: 500 });
  }
}

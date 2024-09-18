import { tutorInfo } from "@/schema/tutor";
import mongoose from "mongoose";
import { NextResponse } from "next/server"

export async function POST(req, res) {
    await mongoose.connect(process.env.NEXT_MONGO_CONNECT, { useNewUrlParser: true })

  
    
    const { courseid, profilePicture, name, text,userId } = await req.json();

    try {
      if (!courseid || !profilePicture || !name || !text || !userId) {
        return NextResponse.json({ error: 'All fields are required' });
      }

      const newComment = {
        userId,
        profilePicture,
        name,
        dateTime: new Date().toISOString().split('T')[0],
        dateTimeTitle: new Date().toLocaleDateString(),
        date: new Date().toLocaleDateString(),
        text,
      };

      const updatedTutor = await tutorInfo.findOneAndUpdate(
          {courseId:courseid},
        { $push: { comments: newComment } },
        { new: true } // Return the updated document
      );

      if (!updatedTutor) {
        return NextResponse.json({ error: 'Tutor not found' });
      }

        return NextResponse.json({message:updatedTutor,success:true},{status:200});
    } catch (error) {
      // console.error(error);
     return NextResponse.json({ error: 'Server error' });
    }
  
}


export async function DELETE(req) {
    await mongoose.connect(process.env.NEXT_MONGO_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true });

    const { courseid, commentId } = await req.json();

    try {
        if (!courseid || !commentId) {
            return NextResponse.json({ error: 'Course ID and Comment ID are required' }, { status: 400 });
        }

        const updatedTutor = await tutorInfo.findOneAndUpdate(
            { courseId: courseid },
            { $pull: { comments: { _id: commentId } } },
            { new: true } // Return the updated document
        );

        if (!updatedTutor) {
            return NextResponse.json({ error: 'Tutor not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Comment deleted successfully', success: true }, { status: 200 });
    } catch (error) {
        // console.error(error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}


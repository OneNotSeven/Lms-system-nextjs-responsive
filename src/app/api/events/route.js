
import { teacherInfo } from '@/schema/teacherschema';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

export async function GET(req, content) {
  const url = new URL(req.url);
  const userId = url.searchParams.get('userId');
  await mongoose.connect(process.env.NEXT_MONGO_CONNECT, { useNewUrlParser: true })
  const getEvent=await teacherInfo.findOne({userId:userId})
  // console.log("getter",userId)
  return NextResponse.json({ success: true, message: 'Event added successfully',data:getEvent }, { status: 200 });
}

export async function POST(request) {
    try {
        const { title, date, description,userId,location,category } = await request.json();
        
      await mongoose.connect(process.env.NEXT_MONGO_CONNECT, { useNewUrlParser: true })
      
      const newEvent = await teacherInfo.updateOne({ userId: userId }, { $push: { Events: {tag:"Events",title,Date:date,description,location,category} } })
      
        // console.log('Event data:', newEvent);

        // Simulate successful database operation
        return NextResponse.json({ success: true, message: 'Event added successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error adding event:', error);
        return NextResponse.json({ success: false, message: 'Failed to add event' }, { status: 500 });
    }finally {
      // Ensure the connection is closed
      await mongoose.disconnect();
  }
}

export async function DELETE(req) {
  try {
    await mongoose.connect(process.env.NEXT_MONGO_CONNECT, { useNewUrlParser: true })
    const { userId, id } = await req.json();
    // console.log("delete", userId, id);

    if (!userId || !id) {
      return NextResponse.json({ success: false, message: 'User ID and announcement ID are required' }, { status: 400 });
    }

    const deleteEvent = await teacherInfo.updateOne(
      { userId },
      { $pull: { Events: { _id: id } } }
    );

    return NextResponse.json({ success: true, message: 'Announcement deleted successfully', data: deleteEvent }, { status: 200 });
  } catch (error) {
    console.error('Error deleting announcement:', error);
    return NextResponse.json({ success: false, message: 'Failed to delete announcement' }, { status: 500 });
  }
}
 
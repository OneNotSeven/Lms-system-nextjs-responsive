

import { teacherInfo } from '@/schema/teacherschema';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

// pages/api/tutorannouncements.js (or wherever your handlers are)

export async function GET(req) {
  const url = new URL(req.url);
  const userId = url.searchParams.get('userId');

  await mongoose.connect(process.env.NEXT_MONGO_CONNECT, { useNewUrlParser: true })
  try {
    const getEvent = await teacherInfo.findOne({ userId });
    // console.log("getter", userId);

    return NextResponse.json({ success: true, message: 'Event fetched successfully', data: getEvent }, { status: 200 });
  } catch (error) {
    // console.error('Error fetching event:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch event' }, { status: 500 });
  }
}



export async function POST(request) {
  try {
    await mongoose.connect(process.env.NEXT_MONGO_CONNECT, { useNewUrlParser: true })
    const message = await request.json();
    console.log("announce", message);

    const result = await teacherInfo.updateOne(
      { userId: message.userId },
      { $push: { Announcements: { tag: "Announcements", description: message.message } } }
    );

    const updatedDoc = await teacherInfo.findOne({ userId: message.userId });
    console.log('Event data:', updatedDoc);

    return NextResponse.json({ success: true, message: 'Announcement added successfully', data: updatedDoc }, { status: 200 });
  } catch (error) {
    console.error('Error adding announcement:', error);
    return NextResponse.json({ success: false, message: 'Failed to add announcement' }, { status: 500 });
  }
}


export async function DELETE(req) {
  try {
    await mongoose.connect(process.env.NEXT_MONGO_CONNECT, { useNewUrlParser: true })
    const { userId, id } = await req.json();
    console.log("delete", userId, id);

    if (!userId || !id) {
      return NextResponse.json({ success: false, message: 'User ID and announcement ID are required' }, { status: 400 });
    }

    const deleteEvent = await teacherInfo.updateOne(
      { userId },
      { $pull: { Announcements: { _id: id } } }
    );

    return NextResponse.json({ success: true, message: 'Announcement deleted successfully', data: deleteEvent }, { status: 200 });
  } catch (error) {
    console.error('Error deleting announcement:', error);
    return NextResponse.json({ success: false, message: 'Failed to delete announcement' }, { status: 500 });
  }
}

   
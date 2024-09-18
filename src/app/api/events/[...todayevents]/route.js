import { formatDateToString } from '@/lib/formatDate';
import { teacherInfo } from '@/schema/teacherschema';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

export async function GET(req) {
  const url = new URL(req.url);
  const userId = url.searchParams.get('userId');

  try {
    await mongoose.connect(process.env.NEXT_MONGO_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true });

    // Get today's date
    const today = new Date();
    // Format today's date as DD-MM-YYYY
    const todayStr = formatDateToString(today);
    // console.log("todayStr", todayStr);

    // Query for today's events only
    const filter = {
      userId,
      'Events': {
        $elemMatch: { Date: todayStr } // Match only events where the Date field is todayStr
      }
    };

    const getEvent = await teacherInfo.findOne(filter);

    // If an event is found, filter out only the events for today
    if (getEvent) {
      getEvent.Events = getEvent.Events.filter(event => event.Date == todayStr);
    }

    // console.log("getter", getEvent);

    return NextResponse.json({ success: true, message: 'Events for today fetched successfully', data: getEvent }, { status: 200 });
  } catch (error) {
    console.error('Error fetching events for today:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch events for today' }, { status: 500 });
  }
}

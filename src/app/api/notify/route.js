import { teacherInfo } from '@/schema/teacherschema';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

export async function GET(req) {
  const url = new URL(req.url);
  const userId = url.searchParams.get('userId');

  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.NEXT_MONGO_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true });

    // Find the teacher
    const teachers = await teacherInfo.find({ "followers.userid": userId }).exec();
    // console.log("verifying followers", teachers);

    if (teachers.length == 0) {
      return NextResponse.json({ success: false, message: 'Teacher not found' }, { status: 404 });
    }

    // Find unread announcements for the follower
    const unreadAnnouncements = teachers.flatMap(teacher =>
      teacher.Announcements.filter(announcement =>
        !announcement.readBy.includes(userId)
      )
    );

    // Flatten and sort announcements
    const sortedAnnouncements = teachers.flatMap(teacher =>
      teacher.Announcements.map(announcement => ({
        image: teacher.image,
        name: teacher.name,
        userId: teacher.userId,
        announcement
      }))
    ).sort((a, b) => new Date(b.announcement.addedAt) - new Date(a.announcement.addedAt));

    // console.log("unread announcements", unreadAnnouncements);

    if (unreadAnnouncements.length > 0 || sortedAnnouncements.length>0) {
      return NextResponse.json({
        success: true,
        message: 'Unread announcements fetched successfully',
        data: unreadAnnouncements,
        wholeData: sortedAnnouncements
      }, { status: 200 });
    } else {
      return NextResponse.json({
        success: true,
        message: 'All announcements have been read',
        data: []
      }, { status: 200 });
    }
  } catch (error) {
    // console.error('Error fetching announcements:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch announcements' }, { status: 500 });
  }
}


// Establish a single connection to MongoDB

// Convert string IDs to ObjectId
const convertToObjectIds = (ids) => ids.map(id => new mongoose.Types.ObjectId(id));


export async function POST(req) {
  const { userId, unread } = await req.json();
  // console.log("userId:", userId);

  // Convert unread IDs to ObjectId
  const unreadObjectIds = convertToObjectIds(unread.flat());
  // console.log("Unread ObjectIds:", unreadObjectIds);

  try {
    await mongoose.connect(process.env.NEXT_MONGO_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true });

    // Update announcements where the followers array contains userId
    const result = await teacherInfo.updateMany(
      { "followers.userid": userId, "Announcements._id": { $in: unreadObjectIds } },
      { $addToSet: { "Announcements.$[elem].readBy": userId } },
      { arrayFilters: [{ "elem._id": { $in: unreadObjectIds } }] }
    );

    if (result.modifiedCount > 0) {
      return NextResponse.json({
        success: true,
        message: 'Announcements updated successfully.',
      }, { status: 200 });
    } else {
      return NextResponse.json({
        success: false,
        message: 'No matching documents found or announcement already updated.',
      }, { status: 200 });
    }
  } catch (error) {
    console.error('Error updating announcements:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to update announcements.',
    }, { status: 500 });
  }
}



// export async function POST(req) {
//   const { userId, unread } = await req.json();
//   console.log("userId:", userId);
//   const flat=unread.flat()
//   console.log("unread:", flat);

//   try {
//     // Connect to MongoDB
//     await mongoose.connect(process.env.NEXT_MONGO_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true });

//     // Update documents where the followers array contains userId
//     const result = await teacherInfo.updateMany(
//       { followers: userId, "Announcements._id": flat }, // Filter criteria
//       { $push: { "Announcements.readBy": userId } }, // Update operation
       
//     );

//     if (result.modifiedCount > 0) {
//       return NextResponse.json({
//         success: true,
//         message: 'Announcements updated successfully.',
//       }, { status: 200 });
//     } else {
//       return NextResponse.json({
//         success: false,
//         message: 'No matching documents found or announcement already updated.',
//       }, { status: 404 });
//     }
//   } catch (error) {
//     console.error('Error updating announcements:', error);
//     return NextResponse.json({
//       success: false,
//       message: 'Failed to update announcements.',
//     }, { status: 500 });
//   } 
// }


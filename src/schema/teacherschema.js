import mongoose from "mongoose";

const tutorDetailsSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    name: { type: String, text: true },
    lastname: String,
    profession: String,
    bio: String,
    email: String,
    image: String,
    courses: [{
        type: Array,
    }],
    followers: [{ userid: String,addedAt: { type: Date, default: Date.now } }],
    Events: [{
        tag: String,
        title: String,
        description: String,
        Date: String,
        location: String,
        category:String,
        addedAt: { type: Date, default: Date.now },
    }],
    Announcements: [{
        tag: String,
        description: String,
        addedAt: { type: Date, default: Date.now },
        readBy: [{ type: mongoose.Schema.Types.ObjectId }], // Array of user IDs who have read the announcement
    }],
    enrolleduser: [{
        userId: { type: String },
        courseId:{type:String},
        date: {
            type: Date,
            default: Date.now
        },
        price:{type:String}
    }]
});

export const teacherInfo = mongoose.models.teacherdatas || mongoose.model("teacherdatas", tutorDetailsSchema);

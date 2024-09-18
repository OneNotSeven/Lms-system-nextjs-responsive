import mongoose from "mongoose";

const { tutorInfo } = require("./tutor");

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required:true,
    },
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
  
    },
    courses:
      {
        courseId: {
              type: String,
          required: true,
  
        },
        addedAt: {
          type: Date,
          default: Date.now,
        },
      },
});
  
export const studentCart=mongoose.models.studentcarts || mongoose.model("studentcarts",cartSchema)
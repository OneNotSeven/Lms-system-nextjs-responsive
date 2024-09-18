import mongoose from "mongoose"

const tutorModel = new mongoose.Schema({
    
    courseId: { type:String, text: true },
    userId:String,
    tutorName:  { type:String, text: true },
    price: String,
    tags: { type: String, text: true },
    courseName:  { type:String, text: true },
   courseDesc: { type:String, text: true },
    thumbnail: String,
    fileattachment: [{ filename:String,filesrc:String}],
    videosrc: [{ videoId: String, chaptername: String, title: String, desc: String, fee: { type: String, default: "0" }, link: String }],
    ratings: [{
        courseId: { type: mongoose.Schema.Types.ObjectId, default:"1" },
        rating: Number
  }],
  comments: [{
      userId:String,
      profilePicture: String,
      name: String, 
      dateTime: String, 
      dateTimeTitle: String, 
      date: String, 
      text: String, 
    }]
})

export const tutorInfo=mongoose.models.tutordatas || mongoose.model("tutordatas",tutorModel)
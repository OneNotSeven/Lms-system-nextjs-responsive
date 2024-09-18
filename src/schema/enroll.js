const { tutorInfo } = require("./tutor");

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: tutorInfo }],
    completedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref:tutorInfo }],
    ratings: [{
      courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
      rating: Number
    }]
  });
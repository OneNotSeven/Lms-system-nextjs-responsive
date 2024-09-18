import mongoose from "mongoose"

const signupModel = new mongoose.Schema({
    
    name: String,
    password: String,
    email: String,
    address: String,
    contact: Number,
    isLoggedIn: {
        type: Boolean,
        default:false
    },
    following: [{ type: Array }],
    enrolled: [{
        courseId: { type: String }, buyat: {
            type: Date,
            default: Date.now
        },price:{type:String}}]
})

export const EcomSchema=mongoose.models.studentdatas || mongoose.model("studentdatas",signupModel)
import mongoose from "mongoose";


const eventCart = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required:true,
    },
   
    title: { type: String },
    date: { type: String },
    description:{type:String},
});
  
export const events=mongoose.models.eventcarts || mongoose.model("eventcarts",eventCart)
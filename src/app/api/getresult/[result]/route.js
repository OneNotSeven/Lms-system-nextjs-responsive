import { tutorInfo } from "@/schema/tutor";
import mongoose from "mongoose"
import { NextResponse } from "next/server";

export async function GET(req,res) {
    const query = res.params.result
    // console.log("serverqiery",query)
    try {
    
        
    await mongoose.connect(process.env.NEXT_MONGO_CONNECT, { useNewUrlParser: true })
        // tutorInfo.createIndex({ title: "text", description: "text",courseName:"text",courseDesc:"text" })
    
      let pipeLine=[{
        $search: {
            index: "TutorSearch",
            text: {
              query: query,
              path: {
                wildcard: "*",
              },
            },
          },
    }]
        const results = await tutorInfo.aggregate(pipeLine)
            // console.log("tutorAdd",results)
            return NextResponse.json({message:results,success:true},{status:200})
    
    
    } catch (error) {
        return NextResponse.json({message:error,success:false},{status:500})
    }
    
}
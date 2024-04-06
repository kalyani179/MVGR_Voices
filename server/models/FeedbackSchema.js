import mongoose from "mongoose";

const feedbackSchema = mongoose.Schema({
    username:{
        type:String
    },
    title : {
        type:String,
        required:true
    },
    stars:{
        type:String,
        required:true
    },
    review:{
        type:String,
        required:true
    }
})

export default mongoose.model("feedbacks",feedbackSchema);
import mongoose, { mongo } from "mongoose";

const commentSchema = new mongoose.Schema({
    text:{
        type:String,
        required:true,
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post',
    }
});


export const Comment = mongoose.model('Comment',commentSchema);
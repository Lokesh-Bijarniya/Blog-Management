import mongoose from "mongoose";
import { Schema } from "mongoose";

const blogSchema = new Schema({
    title : {
        type : String,
        required : true,
        trim : true
    },
    body : {
        type : String,
        required : true,
        trim : true,
    },
    authorId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "Author"//ObjectId here i take reference of author collection (linking two docs)
    },
    tags : {
        type : [String],
        trim : true,
    }, 
    category : {
        type : String,
        required : true,
        trim : true
    },
    subcategory : {
        type : [String],
        trim : true,
    },
    deletedAt : {
        type : Date
    },
    isDeleted : {
        type : Boolean,
        default : false,
    },
    publishedAt : {
        type : Date,
    },
    isPublished : {
        type : Boolean,
        default : false,
    }
}, {timestamps:true});

export default mongoose.model("Blog",blogSchema);
import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema({
    fname : {
        type : String,
        required : true,
        trim : true,
    },
    lname : {
        type : String,
        required : true,
        trim : true,
    },
    title : {
        type : String,
        enum : ["Mr","Mrs","Miss"],
        required : true,
        trim : true,
    },
    email : {
        type : String,
        unique : true,
        required : true,
        trim : true,
    },
    password : {
        type : String,
        required: true,
        trim: true,
    }
});

export default mongoose.model("Author",userSchema);

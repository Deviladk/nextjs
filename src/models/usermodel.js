import mongoose from "mongoose";
import { unique } from "next/dist/build/utils";

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:[true,"please provide user name"]
    },
    email:{
        type:String,
        required:[true,"please provide an email"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"Please provide password"]
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    forgotPasswordToken:String,
    forgotPasswordTokenExpire:Date,
    verifyToken:String,
    verifyTokenExpire:Date
})

const User = mongoose.models.users || mongoose.model("users",userSchema);

export default User;
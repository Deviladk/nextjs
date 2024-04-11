import {connect} from "@/dbconfig/dbconfig"
import User from "@/models/usermodel"
import {NextRequest,NextResponse} from "next/server"
import bcryptjs from "bcryptjs"
import {sendemail} from "@/helpers/mailer"
connect();

export async function POST(request:NextRequest){
    try {
        const reqbody =await request.json();
       const {username,email,password}=reqbody;;

       console.log(reqbody);

       const user=await User.findOne({email});

       if(user){
           return NextResponse.json({error:"user already exist"},{status:400})
       }

       const salt =await bcryptjs.genSalt(10);
       const hashedpassword=await bcryptjs.hash(password,salt);

       const newUser=new User({
        username,
        email,
        password:hashedpassword
       })


       const savedUser=await newUser.save();
       console.log(savedUser);


       //send mail

      await sendemail({email,emailType:"VERIFY",userId:savedUser._id})

       return NextResponse.json({
        message:"User registed succesfully",
        success:true,
        savedUser
       })


    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}
import {connect} from "@/dbconfig/dbconfig"
import User from "@/models/usermodel"
import {NextRequest,NextResponse} from "next/server"
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"

connect();

export async function POST(request:NextRequest){
    try {
        const reqbody =await request.json();
        const {username,email,password}=reqbody;;
 
        console.log(reqbody);
 
        const user=await User.findOne({email});
        if(!user){
            return NextResponse.json({error:"user does not exists"},{status:400})
        }
        console.log("user exists");
        
        const validpassword=await bcryptjs.compare(password,user.password);

        if(!validpassword){
            return NextResponse.json({error:"check your credentials"},{status:400})
         }
       
         const tokenData={
            id:user._id,
            username:user.username,
            email:user.email
         }

         const token=await jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn:"1d"});

         const reponse=NextResponse.json({
            message:"Login in success",
            success:true
         })

         reponse.cookies.set("token",token,{
            httpOnly:true
         })

    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}
import {connect} from "@/dbconfig/dbconfig";
import User from "@/models/usermodel";
import { NextRequest,NextResponse } from "next/server";


connect();

export async function POST(request:NextRequest){
    try {

        const reqbody=await request.json();
        const {token}=reqbody;
        console.log(token);

        const user=await User.findOne({verifyToken:token},{ verifyTokenExpire:{$gt: Date.now()}});
        if(!user){
            return NextResponse.json({error:"Invalid token"},{status:400});
        }
        
        console.log(user);
      user.isVerified = true;
      user.verifyToken=undefined;
      user. verifyTokenExpire=undefined;

      await user.save();

      return NextResponse.json({message:"Email varified successfully",success:true},{status:300})


    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500});
    }
}
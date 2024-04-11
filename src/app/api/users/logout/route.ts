import {connect} from "@/dbconfig/dbconfig"
import User from "@/models/usermodel"
import {NextRequest,NextResponse} from "next/server"
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"

connect();

export async function GET(request:NextRequest){
    try {
      const response= NextResponse.json({
            message:"Logoout successfully",
            success:true
        })
        response.cookies.set("token","",{
            httpOnly:true,
            expires:new Date(0)
        })
        
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}
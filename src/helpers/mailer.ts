import nodemailer from "nodemailer"
import User from "@/models/usermodel"
import bcryptjs from "bcryptjs"

export const sendemail = async({email,emailType,userId}:any)=>{

    try {
        const hashedToken=await bcryptjs.hash(userId.toString(),10)

//todo:configure mail for usage
if(emailType==="VERIFY"){
    await User.findByIdAndUpdate(userId,{$set:{verifyToken:hashedToken,verifyTokenExpire:Date.now()+3600000}});
}else if(emailType==="RESET"){
    await User.findByIdAndUpdate(userId,{forgotPasswordToken:hashedToken,forgotPasswordTokenExpire:Date.now()+3600000});
}



const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "180d85de092f9f",
      pass: "8d4646ebb080aa"
    }
  });


          const mailOptions={
            from: 'adityakiran0909@gmail.com', // sender address
            to: email, // list of receivers
            subject: emailType==="VERIFY"?"Verify your email":"Reset your password", // Subject line
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here<a> to 
                    ${emailType==="VERIFY"?"verify your email":"Rest your password"}
                    or copy and past in browser<br>
                    ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
                    </p>`, // html body
          }

          const info = await transport.sendMail(mailOptions);
          return info;
        
    } catch (error:any) {
            throw new Error(error.message);   
    }
}
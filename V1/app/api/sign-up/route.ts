import dbConnect from "@/lib/dbConnect";
import User from "@/model/User";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/app/helpers/sendVerificationEmail";
import UserModel from "@/model/User";


export async function POST(req: Request, res: Response) {
  await dbConnect();
  try { 
    const {username, email, password } = await req.json();
    const existingUserVerifiedByUsername=await UserModel.findOne({
        username,
        isVerified : true
    })

    if(existingUserVerifiedByUsername){
        return Response.json({
            success: false,
            message: "Username already exists"
         },
         {
            status: 400
         });
    }

    const existingUserVerifiedByEmail= await UserModel.findOne({
        email
    })
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    if(existingUserVerifiedByEmail){
        if(existingUserVerifiedByEmail.isVerified){
            return Response.json({
                success: false,
                message: "Email already exists"
             },
             {
                status: 400
             });
        }
        else{
            const hashedPassword = await bcrypt.hash(password, 10);
            existingUserVerifiedByEmail.password = hashedPassword;
            existingUserVerifiedByEmail.verifyCode = verifyCode;
            existingUserVerifiedByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);
            await existingUserVerifiedByEmail.save();
        }
    }else{
        const hashedPassword = await bcrypt.hash(password, 10);
        const expiryDate = new Date();
        expiryDate.setHours(expiryDate.getHours() + 1);

        const newUser = new UserModel({
            username,
            email,
            password: hashedPassword,
            verifyCode,
            verifyCodeExpiry: expiryDate,
            isVerified: false,
            isAcceptingMessages: true,
            messages: []
        })
        await newUser.save();
        console.log(newUser,"Sending an verification email")
        //send verification email
        const emailResponse = await sendVerificationEmail(email,username, verifyCode);
        if(!emailResponse.success){
            return Response.json({
                success: true,
                message: emailResponse.message
            },{status: 500})
        }
        return Response.json({
            success: true,
            message: "User registered successfully"
        },{status: 200})
    }   
  } catch (error) {
    console.error(error);
    return Response.json({
        success: false,
        message: "Error registering user"
     },
     {
        status: 500
     });
  }

}

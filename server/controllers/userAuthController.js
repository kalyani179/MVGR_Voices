import jwt from "jsonwebtoken";
import 'dotenv/config'
import nodemailer from "nodemailer";

// Models
import User from "../models/UserSchema.js";

// Firebase
import admin from "firebase-admin";
import {getAuth} from "firebase-admin/auth";
import serviceAccountKey from "../utilities/mvgr-voices-firebase-adminsdk-r95ai-dee2c54534.json" assert { type: "json" };


admin.initializeApp({
    credential : admin.credential.cert(serviceAccountKey)
})

const generateUsername = async (email) => {
    let username = email.split("@")[0];
    let isUsernameNotUnique = await User.exists({"personal_info.username" : username}).then((result) => result);
    isUsernameNotUnique ? username += nanoid().substring(0,3) : "";
    return username;
}
var access_token;
const formatDatatoSend = (user) => {
    access_token = jwt.sign({id:user._id},process.env.SECRET_ACCESS_KEY)
    return {
        access_token,
        profile_img : user.personal_info.profile_img,
        username : user.personal_info.username,
        fullname : user.personal_info.fullname
    }
}

const verifyMail = async(email,link) => {
    try{
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "dantulurikalyani999@gmail.com",
                pass: "ihmwfquaqzrjnhtq"
            }
        })
        //send email
        await transporter.sendMail({
            from:"dantulurikalyani999@gmail.com", //sender mail
            to:email, //reciever mail
            subject:"Account Verification",
            text:"This Email is sent to verify your account.",
            html:`
            <div>
                <a href=${link}>Click Here to Login</a>
            </div>
            `
        })
        console.log("mail sent successfully");
    }
    catch(err){
        console.log(err.message);
        return res.status(500).json({"error":"Internal Server Error"});
    }
}

export const signup = async(req, res) =>{
    try{
        let {fullname,email,password} = req.body;
        let exist = await User.findOne({"personal_info.email":email});
        if(exist){
            return res.status(400).json({"error" : "User has already Signed up!"});
        }
        let username = await generateUsername(email);
        let newUser = new User({
            personal_info:{fullname,email,password,username}
        })
        await newUser.save();
        let {access_token} = formatDatatoSend(newUser);
        console.log(access_token);
        await verifyMail(email,`http://localhost:3001/${username}/verify/${access_token}`);
        return res.status(200).json(formatDatatoSend(newUser));
    }
    catch(err){
        console.log(err.message);
        return res.status(500).json({"error":"Internal Server Error"});
    }
}

export const verifyEmailToken = async (req,res) =>{
    try {
        let {username,token} = req.body;
		const user = await User.findOne({ "personal_info.username" : username });
		if (!user) return res.status(400).send({ message: "Invalid link" });

        const token1 = jwt.verify(token,process.env.SECRET_ACCESS_KEY);
		if (!token1) return res.status(400).send({ message: "Invalid link" });

		await user.updateOne({ "personal_info.username":username, "personal_info.verified": true });
		
		return res.json({status:"okay"});
	} catch (error) {
        console.log(error.message);
		return res.status(500).json({ message: "Internal Server Error" });
	}
}

export const signin = async(req, res) =>{
    try{
        let {email,password} = req.body;
        let user = await User.findOne({"personal_info.email":email});
        console.log(user);
        if(user.google_auth){
            return res.status(403).json({"error":"Account was created with google. Try Sign in with google"});
        }
        if(!user){
            return res.status(400).json({"error":"User has not signed up yet! Sign up to continue"})
        }
        if(user.personal_info.password !== password){
            return res.status(400).json({"error":"Incorrect Password!"});
        }
        if(user.personal_info.verified !== true){
            return res.status(400).json({"error":"This email is not verified!"})
        }
        return res.status(200).json(formatDatatoSend(user));
        // return res.status(200).json({"status":"User has Signed In Successfully!"})
    }
    catch(err){
        console.log(err.message);
        return res.status(500).json({"error":"Internal Server Error"});
    }
    
}

export const googleAuth = async(req,res) =>{
    let {access_token} = req.body;

    getAuth().verifyIdToken(access_token)
    .then(async (decodedUser) =>{

        let {email,name,picture} = decodedUser;

        picture = picture.replace("s96-c","s384-c");

        let user = await User.findOne({"personal_info.email" : email}).select("personal_info.fullname personal_info.username personal_info.profile_img google_auth");

        if(user){
            if(!user.google_auth){
                return res.status(403).json({"error" : "This email is already signed up without google.please login with password to access the account."});
            }
        }
        else{
            let username = await generateUsername(email);

            let newUser = new User({
                personal_info :{fullname : name,email,username},
                google_auth:true
            })

            await newUser.save().then((u)=>{
                user = u;
            })
            .catch((err)=>{
                return res.status(500).json({"error":err.message});
            })
        }

        return res.status(200).json(formatDatatoSend(user));
        // return res.status(200).json({"status":"User has Signed Up Successfully!"})
    })
    .catch(err=>{
        return res.status(500).json({"error":"Failed to Authenticate with google..Try some other google account"});
    })
}

import jwt from "jsonwebtoken";
import 'dotenv/config'
import nodemailer from "nodemailer";
import bcrypt, { hash } from 'bcrypt';

// Models
import User from "../models/UserSchema.js";

// Firebase
import admin from "firebase-admin";
import {getAuth} from "firebase-admin/auth";
import serviceAccountKey from "../utilities/mvgr-voices-firebase-adminsdk-r95ai-dee2c54534.json" assert { type: "json" };

let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

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


export const signup = async(req, res) =>{
    try{
        let {fullname,email,password} = req.body;
        if(fullname.length<3){
            return res.status(403).json({"error" : "Fullname must be atleast 3 letters long!"});
        }if(!email.length){
            return res.status(403).json({"error" : "Please Enter the Email!"});
        }if(!emailRegex.test(email)){
            return res.status(403).json({"error" : "Email is invalid!"});
        }if(!passwordRegex.test(password)){
            return res.status(403).json({"error" : "Password should be 6 to 20 characters long with a numeric, 1 lowercase, 1 uppercase letters!"});
        }
        let exist = await User.findOne({"personal_info.email":email});
        if(exist){
            if(exist.personal_info.verified === true){
                return res.status(400).json({"error" : "User has already Signed up!"});
            }else if(exist.google_auth === true){
                return res.status(400).json({"error" : "User has already Signed up with google!"});
            }
            else if(exist.personal_info.verified === false){
                return res.status(400).json({"error" : "We have already sent you an Email to verify your account! Please Check !!"});
            }
        }
        bcrypt.hash(password,10,async (err,hashed_password)=>{
            let username = await generateUsername(email);
            let newUser = new User({
                personal_info:{fullname,email,password:hashed_password,username}
            })
            await newUser.save();
            console.log(hashed_password);
            let {access_token} = formatDatatoSend(newUser);
            console.log(access_token);
            // await verifyMail(email,`https://mvgrvoices.onrender.com/${username}/verify/${access_token}`);
            await verifyMail(email,`${process.env.REACT_APP_CLIENT_DOMAIN}/${username}/verify/${access_token}`);
            return res.status(200).json(formatDatatoSend(newUser));
        })
    }
    catch(err){
        console.log(err.message);
        return res.status(500).json({"error":"Internal Server Error"});
    }
}

const verifyMail = async(email,link) => {
    try{
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        })
        //send email
        await transporter.sendMail({
            from:process.env.EMAIL, //sender mail
            to:email, //reciever mail
            subject:"Account Verification",
            text:"This Email is sent to verify your account.",
            html:`
            <div>
                <p>Verify your email Address to complete signup and to signin to your account!</p>
                <p>Click <a href=${link}>here</a> to proceed.</p>
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

export const verifyEmailToken = async (req,res) =>{
    try {
        let {username,token} = req.body;
		const user = await User.findOne({ "personal_info.username" : username });
		if (!user) return res.status(400).send({ message: "Invalid link" });

        const token1 = jwt.verify(token,process.env.SECRET_ACCESS_KEY);
		if (!token1) return res.status(400).send({ message: "This Email has expired!" });

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
        if(!user){
            return res.status(400).json({"error":"User has not signed up yet! Sign up to continue"})
        }
        if(user.google_auth){
            return res.status(403).json({"error":"Account was created with google. Try Sign in with google"});
        }
        console.log(password);
        bcrypt.compare(password,user.personal_info.password,(err,result)=>{
            console.log(user.personal_info.password);
            if(!result){
                return res.status(403).json({"error" : "Incorrect Password"})
            }
            if(user.personal_info.verified !== true){
                return res.status(400).json({"error":"This email is not verified!"})
            }
            else return res.status(200).json(formatDatatoSend(user));
        })
        // return res.status(200).json({"status":"User has Signed In Successfully!"})
    }
    catch(err){
        console.log(err.message);
        return res.status(500).json({"error":"Internal Server Error"});
    }
    
}

export const forgotPassword = async (req,res) => {
    try{
        let {email} = req.body;
        User.findOne({"personal_info.email":email})
        .then(async (user) => {
            if(!user){
                return res.status(400).json({"error":"User has not signed up yet! Sign up to continue"})
            }
            if(user.google_auth){
                return res.status(403).json({"error":"Account was created with google. Try Sign in with google"});
            }
            const token = jwt.sign({id:user._id},process.env.SECRET_ACCESS_KEY,{expiresIn:"1d"})
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASSWORD
                }
            })
            let link = `http://localhost:3001/reset-password/${user._id}/${token}`
            await transporter.sendMail({
                from:process.env.EMAIL, //sender mail
                to:email, //reciever mail
                subject:"Reset Your Password",
                text:"This Email is sent to Reset your password",
                html:`
                <div>
                    <p>Click <a href=${link}>here</a> to reset your password.</p>
                </div>
                `
            })
            return res.status(200).json({status:"okay"})
        })
    }
    catch(err){
        console.log(err.message);
        return res.status(500).json({"error":"Internal Server Error"});
    }
}

export const resetPassword = async (req,res) => {
    try{
        let {password} =  req.body;
        let {id,token} = req.params;
        jwt.verify(token,process.env.SECRET_ACCESS_KEY)
        const token1 = jwt.verify(token,process.env.SECRET_ACCESS_KEY);
        if (!token1) return res.status(400).send({ message: "This Email has expired!" });
        bcrypt.hash(password,10,async (err,hashed_password)=>{
            User.findByIdAndUpdate({_id:id},{"personal_info.password":hashed_password})
            .then(user => {
                return res.status(200).json({"success":"Password Updated Successfully!"})
            })
        })
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
                verified:true,
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

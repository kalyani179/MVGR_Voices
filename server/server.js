import express from "express";
import mongoose from "mongoose";
import 'dotenv/config'
import jwt from "jsonwebtoken";
import cors from "cors";

//firebase
import admin from "firebase-admin";
import {getAuth} from "firebase-admin/auth";
import serviceAccountKey from "./utilities/mvgr-voices-firebase-adminsdk-r95ai-dee2c54534.json" assert { type: "json" };

//Models
import User from "./models/UserSchema.js";

const server = express();
let PORT = 3000;

admin.initializeApp({
    credential : admin.credential.cert(serviceAccountKey)
})

server.use(express.json());
server.use(cors({origin:"*"}));

mongoose.connect(process.env.DB_LOCATION,{autoIndex:true});

const generateUsername = async (email) => {
    let username = email.split("@")[0];
    let isUsernameNotUnique = await User.exists({"personal_info.username" : username}).then((result) => result);
    isUsernameNotUnique ? username += nanoid().substring(0,3) : "";
    return username;
}

const formatDatatoSend = (user) => {
    const access_token = jwt.sign({id:user._id},process.env.SECRET_ACCESS_KEY)
    return {
        access_token,
        profile_img : user.personal_info.profile_img,
        username : user.personal_info.username,
        fullname : user.personal_info.fullname
    }
}

server.post("/signup",async (req,res)=>{
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
        return res.status(200).json(formatDatatoSend(newUser));
        // return res.status(200).json({"status":"User has Signed Up Successfully!"})
    }
    catch(err){
        console.log(err.message);
        return res.status(500).json({"error":"Internal Server Error"});
    }
    
})

server.post("/signin", async (req,res)=>{
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
        return res.status(200).json(formatDatatoSend(user));
        // return res.status(200).json({"status":"User has Signed In Successfully!"})
    }
    catch(err){
        console.log(err.message);
        return res.status(500).json({"error":"Internal Server Error"});
    }
    
})

server.post("/google-auth", async (req,res) => {

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
})

server.listen(PORT,()=>{
    console.log("Server is listening on port 3000");
})

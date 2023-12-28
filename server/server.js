import express from "express";
import mongoose from "mongoose";
import 'dotenv/config'
import jwt from "jsonwebtoken";
import cors from "cors";

//Models
import User from "./models/UserSchema.js";

const server = express();
let PORT = 3000;

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
        return res.status(200).json({"status":"User has Signed Up Successfully!"})
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
        if(!user){
            return res.status(400).json({"error":"User has not signed up yet! Sign up to continue"})
        }
        if(user.personal_info.password !== password){
            return res.status(400).json({"error":"Incorrect Password!"});
        }
        return res.status(200).json(formatDatatoSend(user));
    }
    catch(err){
        console.log(err.message);
        return res.status(500).json({"error":"Internal Server Error"});
    }
    
})

server.listen(PORT,()=>{
    console.log("Server is listening on port 3000");
})

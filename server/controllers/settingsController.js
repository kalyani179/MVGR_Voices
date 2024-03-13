import Blog from "../models/BlogSchema.js";
import User from "../models/UserSchema.js"

import bcrypt from 'bcrypt';

const changePassword = async (req, res) => {
    try {
        let { currentPassword, newPassword } = req.body;
        let user = await User.findOne({ _id: req.user });

        if (!user) {
            return res.status(404).json({ error: "User Not Found!" });
        }

        if (user.google_auth) {
            return res.status(403).json({ error: "You cannot change account password because you have signed in using Google" });
        }

        const passwordMatch = await bcrypt.compare(currentPassword, user.personal_info.password);
        if (!passwordMatch) {
            return res.status(403).json({ error: "Incorrect current password" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await User.findOneAndUpdate({ _id: req.user }, { "personal_info.password": hashedPassword });

        return res.status(200).json({ status: "Password Changed" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Some error occurred while changing the password, please try again!" });
    }
}

// Edit Profile
const updatedProfileImg = async (req,res) => {
    let {url} = req.body;
    await User.findOneAndUpdate({_id:req.user},{"personal_info.profile_img":url})
    .then(()=>{
        return res.status(200).json({profile_img:url});
    }).catch(err=>{
        return res.status(500).json({error:err.message});
    })
}

const updateProfile = (req,res) => {
    let bioLimit  = 150;
    let {username,bio,social_links} = req.body;
    if(username.length < 3){
        return res.status(403).json({error:"Username should be atleast 3 letters long!"})
    }
    if(bio.length>bioLimit){
        return res.status(403).json({error:"Bio should not be more than 150 characters long!"});
    }
    let socialLinksArr = Object.keys(social_links);
    try{
        for(let i=0;i<socialLinksArr.length;i++){
            if(social_links[socialLinksArr[i]].length){
                let hostname = new URL(social_links[socialLinksArr[i]]).hostname;
                if(!hostname.includes(`${socialLinksArr[i]}.com`) && socialLinksArr[i]!="website"){
                    return res.status(403).json({error:`${socialLinksArr[i]} link is invalid! You must enter full link!`})
                }
            }
        }
    }catch(err){
        return res.status(500).json({error:"You must provide full social links with http(s) included"});
    }
    let updateObj = {
        "personal_info.username" : username,
        "Personal_info.bio" : bio,
        social_links
    }
    User.findOneAndUpdate({_id:req.user},updateObj,{
        runValidators:true
    })
    .then(()=>{
        return res.status(200).json({username});
    })
    .catch(err=>{
        if(err.code == 11000){
            return res.status(409).json({error:"This username is already taken!"});
        }
        return res.status(500).json({error:err.message});
    })
}

export { changePassword,updatedProfileImg,updateProfile };

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

export { changePassword,updatedProfileImg };

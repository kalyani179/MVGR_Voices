import Blog from "../models/BlogSchema.js";
import User from "../models/UserSchema.js"

const changePassword = async (req,res) => {
    let {currentPassword,newPassword} = req.body;
    User.findOne({_id:req.user})
    .then((user) => {
        if(user.google_auth){
            return res.status(403).json({error:"you cannot change account password because you have signed in using google"});
        }
        bcrypt.compare(currentPassword,user.personal_info.password,(err,result) => {
            if(err){
                return res.json(500).json({error:"Some error occured while changing the password! please try again!"})
            }
            if(!result){
                return res.json(403).json({error:"Incorrect current password"})
            }
            bcrypt.hash(newPassword,10,(err,hashed_password)=>{
                User.findOneAndUpdate({_id:req.user},{"personal_info.password":hashed_password})
                .then((u)=>{
                    return res.status(200).json({status:"Password Changed"})
                })
                .catch(err => {
                    return res.status(500).json({error:"Some error occured while saving the new password, please try again !"})
                })
            })
        })
    })
    .catch(err => {
        return res.status(500).json({error:"User Not Found!"})
    })
}

export {changePassword}
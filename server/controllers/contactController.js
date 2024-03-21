import nodemailer from "nodemailer";
import Feedback from "../models/FeedbackSchema.js";
const queryMail = async (req,res) => {
    let {fullname,email,query} = req.body;
    console.log(fullname,email,query);
    if(!fullname.length){
        return res.status(403).json({"error":"Please Enter Your Fullname!"});
    }
    if(!email.length){
        return res.status(403).json({"error":"Please Enter Your Email!"});
    }
    if(!query.length){
        return res.status(403).json({"error":"Please Enter The Message!"});
    }
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });
    var mailOptions = {
        from: email,
        replyTo: email,
        to: process.env.EMAIL,
        subject: fullname + " sent you a message",
        text: query
    }
    transporter.sendMail(mailOptions, function(err, info) {
        return res.status(200).json({status:'okay'});
    })
    // return res.status(500).json({"error":"Internal Server Error"})
}

const feedbackForm = async (req,res) => {
    try{
        let {title,stars,review} = req.body;
        let newFeedback = new Feedback({title,stars,review});
        await newFeedback.save();
        return res.status(200).json({title,stars,review});
    }
    catch(error){
        console.log(error);
        return res.status(500).json({error:"There is some issue! Please Try again!"})
    }
}
const getAllFeedbacks = (req,res) => {
    Feedback.find({})
    .then(feedbacks => {
        res.status(200).json(feedbacks);
    })
    .catch(err => {
        console.error('Error fetching feedbacks:', err);
        res.status(500).json({ error: 'An error occurred while fetching feedbacks' });
    });
}

export {queryMail,feedbackForm,getAllFeedbacks};
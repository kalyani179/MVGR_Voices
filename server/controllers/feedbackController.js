import Feedback from "../models/FeedbackSchema.js";

const feedbackForm = async (req,res) => {
    try{
        let {username,title,stars,review} = req.body;
        let newFeedback = new Feedback({username,title,stars,review});
        await newFeedback.save();
        return res.status(200).json({username,title,stars,review});
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

export {feedbackForm,getAllFeedbacks};
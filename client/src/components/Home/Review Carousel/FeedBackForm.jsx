import axios from 'axios';
import React, { useState } from 'react';
import { Zoom } from 'react-awesome-reveal';
import { toast } from 'react-hot-toast';

const FeedbackForm = () => {
    const [title, setTitle] = useState('');
    const [stars, setStars] = useState(0);
    const [review, setReview] = useState('');

    const [clicked,setClicked] = useState(false);

    const handleStarClick = (rating) => {
        if (rating === stars) {
            // If the clicked star is the same as the current number of stars, revert it to 0
            setStars(0);
        } else {
            // Otherwise, set the number of stars to the clicked rating
            setStars(rating);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.target.setAttribute('disabled',true);
        let loadingToast = toast.loading("submitting feedback...")
        // Prepare feedback data
        const feedbackData = {
            title: title,
            stars: stars,
            review: review
        };
        console.log(stars);
        axios.post(process.env.REACT_APP_SERVER_DOMAIN + "/feedback-form", feedbackData)
        .then((response) => {
            setTitle('');
            setStars(0);
            setReview('');
            e.target.removeAttribute('disabled');
            toast.dismiss(loadingToast);
            toast.success("Feedback Submitted Succesfully!");
        })
        .catch((error) => {
            // Handle errors if any
            console.error("Error submitting feedback:", error);
            setTitle('');
            setStars(0);
            setReview('');
            e.target.removeAttribute('disabled');
            toast.dismiss(loadingToast);
            toast.error("Error submitting feedback:"+error);
        });

    };

    return (
        <Zoom>
        <div className={`${clicked ? "show" : "hidden"} mx-auto bg-cool-black/95 p-8 rounded-md duration-500 absolute left-5 -bottom-5`}>
        <button onClick={()=>setClicked(!clicked)}><i className="fi fi-bs-cross-small text-lg text-white absolute top-3.5 right-4"></i></button>
            <h4 className="font-medium text-center text-xl text-primary">Feedback Form</h4>
            <form onSubmit={handleSubmit} className="space-y-4 mt-5">
                <div className="flex flex-col">
                    <label className="font-medium text-primary tracking-wide">Title:</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="auth-input my-1 py-0 bg-transparent text-white pl-2"/>
                </div>
                <div className="flex flex-col gap-3">
                    <label className="font-medium text-primary tracking-wide">Rating:</label>
                    <div id="stars" className="flex gap-3">
                        {[1, 2, 3, 4, 5].map((rating, i) => (
                            <span key={i} onClick={() => handleStarClick(rating)} className="cursor-pointer">
                                {rating <= stars ? <i className="fas fa-star text-yellow-500 text-2xl"></i> : <i className="far fa-star text-2xl"></i>}
                            </span>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col">
                    <label className="font-medium text-primary tracking-wide">Review:</label>
                    <textarea id="review" value={review} onChange={(e) => setReview(e.target.value)} className="auth-input bg-transparent border border-white h-20 text-white pl-2 resize-none overflow-hidden overflow-y-scroll text-area-input"></textarea>
                </div>
                <div className="center">
                    <button type="submit" className="text-white rounded-md py-2 px-4 bg-primary">Submit Feedback</button>
                </div>
                
            </form>
        
        </div>
        <div>
            <button className="sticky" onClick={()=>setClicked(!clicked)}>
                        <i className="fi fi-ss-star text-primary text-2xl z-50"></i>
            </button>
        </div>
        </Zoom>
    );
}

export default FeedbackForm;

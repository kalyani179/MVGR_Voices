import React, { useState } from 'react';
import { Zoom } from 'react-awesome-reveal';

function FeedbackForm() {
    const [title, setTitle] = useState('');
    const [stars, setStars] = useState(0);
    const [review, setReview] = useState('');

    const [clicked,setClicked] = useState(false);

    const handleStarClick = (rating) => {
        setStars(rating);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Prepare feedback data
        const feedbackData = {
            title: title,
            stars: stars,
            review: review
        };
        console.log(stars);

        try {
            // Send feedback data to backend
            const response = await fetch('your-backend-endpoint', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(feedbackData)
            });
            if (response.ok) {
                // Feedback submitted successfully
                console.log('Feedback submitted successfully');
            } else {
                console.error('Failed to submit feedback');
            }
        } catch (error) {
            console.error('Error submitting feedback:', error);
        }
    };

    return (
        <Zoom>
        <div className={`${clicked ? "show" : "hidden"} mx-auto bg-white p-10 rounded-md duration-500 max-w-lg`}>
        <button onClick={()=>setClicked(!clicked)}><i className="fi fi-bs-cross-small text-lg text-dark-grey absolute top-3.5 right-4"></i></button>
            <h4 className="font-medium text-center text-xl text-primary mb-5">Feedback Form</h4>
            <form onSubmit={handleSubmit} className="space-y-4 mt-10">
                <div>
                    <label htmlFor="title" className="block font-medium">Title:</label>
                    <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="block w-full border-b-2 border-primary focus:outline-none overflow-hidden"/>
                </div>
                <div>
                    <label htmlFor="stars" className="block font-medium my-2">Rating:</label>
                    <div id="stars" className="flex gap-3">
                        {[1, 2, 3, 4, 5].map((rating,i) => (
                            <span key={i} onClick={() => handleStarClick(rating)} className="cursor-pointer">
                                {rating <= stars ? <i className="fas fa-star text-yellow-500"></i> : <i className="far fa-star"></i>}
                            </span>
                        ))}
                    </div>
                </div>
                <div>
                    <label htmlFor="review" className="block font-medium">Review:</label>
                    <textarea id="review" value={review} onChange={(e) => setReview(e.target.value)} className="block w-full border-b-2 border-primary shadow-sm focus:outline-none resize-none"></textarea>
                </div>
                <div className="center">
                    <button type="submit" className="text-white rounded-md py-2 px-4 bg-primary">Submit Feedback</button>
                </div>
                
            </form>
        
        </div>
        <button className="sticky" onClick={()=>setClicked(!clicked)}>
                    <i className="fi fi-ss-star text-primary text-2xl"></i>
        </button>
        </Zoom>
    );
}

export default FeedbackForm;

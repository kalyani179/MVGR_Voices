import React, { useContext, useState } from 'react'
import { UserContext } from '../../../App';
import {toast,Toaster} from "react-hot-toast";

const CommentField = ({action}) => {
    const [comment,setComment] = useState("");
    let {userAuth:{access_token}} = useContext(UserContext);
    const handleComment = () =>{
        if(!access_token){
            return toast.error("Please Login to Leave a Comment..!")
        }
        if(!comment.length){
            return toast.error("Write Something to Leave a comment!")
        }
    }
    return (
        <div>
        <Toaster />
            <textarea value={comment} onChange={(e)=>setComment(e.target.value)} placeholder="Leave a comment..." className="input-box pl-5 placeholder:text-dark-grey resize-none h-[150px] overflow-auto"></textarea>
            <div className="absolute right-14">
                <button onClick={handleComment} className="btn-purple mt-5 py-1.5 font-medium">{action}</button>
            </div>

        </div>
    )
}

export default CommentField
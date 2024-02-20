import React, { useContext, useState } from 'react'
import { getDate, getFullDate } from '../../../common/Date';
import { UserContext } from '../../../App';
import {toast} from "react-hot-toast";
import CommentField from './CommentField';

const CommentCard = ({index,leftVal,commentData}) => {
    let {commented_by:{personal_info : {profile_img,fullname,username}},commentedAt,comment,_id} = commentData;
    let {userAuth:{access_token}} = useContext(UserContext);
    const [isReplying,setReplying] = useState(false);
    const handleReplyClick = () => {
        if(!access_token) toast.error("Signin First to leave a Reply !!");
        setReplying(!isReplying);
    }
    return (
        <div className="w-full" style={{paddingLeft:`${leftVal*10}px`}}>
            <div className="my-5 p-6 rounded-md border border-grey">
                <div className="flex gap-3 items-center mb-8">
                    <img src={profile_img} className="w-6 h-6 rounded-full" alt="profile"/>
                    <p className="line-clamp-1">{fullname} @ {username}</p>
                    <p className="min-w-fit">{getDate(commentedAt)}</p>
                </div>
                <p className="font-gelasio text-xl ml-3">{comment}</p>
                <div className="flex gap-5 items-center mt-5">
                <button onClick={handleReplyClick} className="text-primary absolute right-20">Reply</button>
                </div>
                {
                    isReplying ? 
                    <div className="mt-8"> 
                        <CommentField action="reply" index={index} replyingTo={_id} setReplying={setReplying}/>
                    </div> 
                    : ""
                }
                
            </div>
        </div>
    )
}

export default CommentCard
import React, { useContext, useState } from 'react'
import { getDate, getFullDate } from '../../../common/Date';
import { UserContext } from '../../../App';
import {toast} from "react-hot-toast";
import CommentField from './CommentField';
import { BlogContext } from './BlogPage';
import axios from 'axios';

const CommentCard = ({index,leftVal,commentData}) => {
    let {commented_by:{personal_info : {profile_img,fullname,username}},commentedAt,comment,_id,children} = commentData;
    let {userAuth:{access_token}} = useContext(UserContext);
    let {blog,setBlog,blog:{comments,comments:{results:commentsArr}}} = useContext(BlogContext);
    const [isReplying,setReplying] = useState(false);
    const removeCommentsCards = (startingPoint) => {
        if(commentsArr[startingPoint]){
            while(commentsArr[startingPoint].childrenLevel > commentData.childrenLevel){
                commentsArr.splice(startingPoint,1);
                if(!commentsArr[startingPoint]) break;
            }
        }
        setBlog({...blog,comments:{results:commentsArr}});
    }
    const hideReplies = () => {
        commentData.isReplyLoaded = false;
        removeCommentsCards(index+1);
    }
    const loadReplies = ({skip=0}) => {
        if(children.length){
            hideReplies();
            axios.post(process.env.REACT_APP_SERVER_DOMAIN+"/get-replies",{_id,skip})
            .then(({data:{replies}}) => {
                commentData.isReplyLoaded = true;
                for(let i=0;i<replies.length;i++){
                    replies[i].childrenLevel = commentData.childrenLevel+1;
                    commentsArr.splice(index+1+i+skip,0,replies[i]);
                }
                setBlog({...blog,comments:{...comments,results:commentsArr}});
            })
        }
    }
    const handleReplyClick = () => {
        if(!access_token) {
            toast.error("Sign in first to leave a Reply !!");
        } else {
            setReplying(!isReplying);
        }
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
                {
                    commentData.isReplyLoaded ? 
                    <button onClick={hideReplies} className="absolute right-36 text-dark-grey hover:bg-grey/30 flex items-center gap-2"> {"Hide Reply"} </button>
                    :<button onClick={loadReplies} className="absolute right-36 text-dark-grey hover:bg-grey/30 flex items-center gap-2"> {children.length>1 ? children.length+" Replies" : children.length+" Reply"}  </button>
                }
                <button onClick={handleReplyClick} className="text-primary absolute right-20">Reply</button>
                </div>
                <div>
                {
                    isReplying &&
                    <div className="mt-8"> 
                        <CommentField action="reply" index={index} replyingTo={_id} setReplying={setReplying}/>
                    </div> 
                }
                </div>
            </div>
        </div>
    )
}

export default CommentCard
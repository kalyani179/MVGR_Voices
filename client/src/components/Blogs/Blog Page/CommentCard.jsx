import React, { useContext, useState } from 'react'
import { getDate} from '../../../common/Date';
import { UserContext } from '../../../App';
import {toast,Toaster} from "react-hot-toast";
import CommentField from './CommentField';
import { BlogContext } from './BlogPage';
import axios from 'axios';

const CommentCard = ({index,leftVal,commentData}) => {
    let {commented_by:{personal_info : {profile_img,fullname,username:commented_by_username}},commentedAt,comment,_id,children} = commentData;
    let {userAuth:{access_token,username}} = useContext(UserContext);
    let {blog,setBlog,setTotalParentCommentsLoaded,blog:{comments,activity,activity:{total_parent_comments},comments:{results:commentsArr},author:{personal_info:{username:blog_author}}}} = useContext(BlogContext);
    const [isReplying,setReplying] = useState(false);
    const getParentIndex = () => {
        let startingPoint = index-1;
        try{
            while(commentsArr[startingPoint].childrenLevel>=commentData.childrenLevel){
                startingPoint--;
            }
        }catch{
            startingPoint = undefined;
        }
        return startingPoint;
    }
    const removeCommentsCards = (startingPoint,isDelete = false) => {
        if(commentsArr[startingPoint]){
            while(commentsArr[startingPoint].childrenLevel > commentData.childrenLevel){
                commentsArr.splice(startingPoint,1);
                if(!commentsArr[startingPoint]) break;
            }
        }
        if(isDelete){
            let parentIndex = getParentIndex();
            if(parentIndex!== undefined){
                commentsArr[parentIndex].children = commentsArr[parentIndex].children.filter(child => child!==_id);
                if(!commentsArr[parentIndex].children.length){
                    commentsArr[parentIndex].isReplyLoaded = false;
                }
            }
            commentsArr.splice(index,1);
        }
        if(commentData.childrenLevel === 0 && isDelete){
            setTotalParentCommentsLoaded(preval => preval - 1);
        }
        setBlog({...blog,comments:{results:commentsArr},activity:{...activity,total_parent_comments:total_parent_comments-(commentData.childrenLevel === 0 && isDelete ? 1: 0)}});
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
    const deleteComment = (e) => {
        e.target.setAttribute("disabled",true);
        console.log("click");
        axios.post(process.env.REACT_APP_SERVER_DOMAIN+"/delete-comment",{_id},{
            headers : {
                'Authorization' : `Bearer ${access_token}`
            }
        })
        .then(() => {
            e.target.removeAttribute("disabled");
            toast.success("Comment Deleted!");
            removeCommentsCards(index+1,true);
        })
        .catch(err => {
            toast.error("Couldn't Delete the Comment! Please try again!")
            console.log(err);
        })
    }
    return (
        <div className="w-full" style={{paddingLeft:`${leftVal*10}px`}}>
        <Toaster />
            <div className="my-5 p-6 rounded-md border border-grey">
                <div className="flex gap-3 items-center mb-8">
                    <img src={profile_img} className="w-6 h-6 rounded-full" alt="profile"/>
                    <p className="line-clamp-1">{fullname} @ {commented_by_username}</p>
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
                {
                    username === commented_by_username || username === blog_author
                    ?
                    <button onClick={deleteComment} className="p-2 px-3 rounded-md border border-grey hover:bg-red/30 hover:text-red">
                        <i className="fi fi-rr-trash pointer-events-none"></i>
                    </button> : ""
                }
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

export default CommentCard;
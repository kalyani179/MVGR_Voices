import React, { useContext, useState } from 'react'
import { UserContext } from '../../../App';
import {toast,Toaster} from "react-hot-toast";
import axios from 'axios';
import { BlogContext } from './BlogPage';

const CommentField = ({action,index = undefined,replyingTo = undefined,setReplying}) => {
    const [comment,setComment] = useState("");
    let {userAuth:{access_token,username,fullname,profile_img}} = useContext(UserContext);
    let {blog,blog:{_id,author:{_id:blog_author},comments,comments:{results:commentsArr},activity,activity:{total_comments,total_parent_comments}},setBlog,setTotalParentCommentsLoaded,totalParentCommentsLoaded} = useContext(BlogContext);
    const handleComment = () =>{
        if(!access_token){
            return toast.error("Please Login to Leave a Comment..!")
        }
        if(!comment.length){
            return toast.error("Write Something to Leave a comment!")
        }
        axios.post(process.env.REACT_APP_SERVER_DOMAIN+"/add-comment",{_id,blog_author,comment,replying_to:replyingTo},{
        headers:{
            'Authorization' : `Bearer ${access_token}`
        }})
        .then(({data})=>{
            console.log(data);
            setComment("");
            data.commented_by = {
                personal_info:{username,profile_img,fullname}
            }
            let newCommentArr;
            if(replyingTo){
                commentsArr[index].children.push(data._id);
                data.childrenLevel = commentsArr[index].childrenLevel+1;
                data.parentIndex = index;
                commentsArr[index].isReplyLoaded = true;
                commentsArr.splice(index+1,0,data);
                newCommentArr = commentsArr;
                setReplying(false);
            }else{
                data.childrenLevel = 0;
                newCommentArr = [data,...commentsArr];
            }
            let parentCommentIncrementVal = replyingTo? 0 : 1;
            setBlog({...blog,comments:{...comments,results:newCommentArr},activity:{...activity,total_comments:total_comments+1,total_parent_comments:total_parent_comments+parentCommentIncrementVal}});
            setTotalParentCommentsLoaded(!totalParentCommentsLoaded);
        })
        .catch(err=>{
            console.log(err);
        })
        
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
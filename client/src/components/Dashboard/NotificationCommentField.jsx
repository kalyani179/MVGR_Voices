import React, { useContext, useState } from 'react'
import { Toaster,toast } from 'react-hot-toast'
import { UserContext } from '../../App';
import axios from 'axios';

const NotificationCommentField = ({_id,blog_author,index=undefined, replyingTo=undefined,setIsReplying,notification_id,notificationData}) => {
    let [comment ,setComment]=useState('');
    let {_id: user_id}=blog_author;
    let {userAuth:{access_token}} = useContext(UserContext);
    let {notifications, notifications:{results},setNotifications}=notificationData;

    const handleComment=()=>{
        
        if(!comment.length){
            return toast.error("Write Something to Leave a comment!")
        }
        axios.post(process.env.REACT_APP_SERVER_DOMAIN+"/add-comment",{_id,blog_author:user_id,comment,
            replying_to:replyingTo,notification_id},{
        headers:{
            'Authorization' : `Bearer ${access_token}`
        }})
        .then(({data})=>{
            //console.log(data)
            setIsReplying(false);
            results[index].reply={comment,_id:data._id}
            setNotifications({...notifications,results})
            
        })
        .catch(err=>{
            console.log(err);
        })
    }

    return (
        <>
        <Toaster />
            <textarea value={comment} onChange={(e)=>setComment(e.target.value)} placeholder="Leave a reply..." className="input-box pl-5 placeholder:text-dark-grey resize-none h-[150px] overflow-auto"></textarea>
            <div className="absolute right-14">
                <button onClick={handleComment} className="btn-purple mt-5 px-10">Reply</button>
            </div>

        </>
    )
}

export default NotificationCommentField

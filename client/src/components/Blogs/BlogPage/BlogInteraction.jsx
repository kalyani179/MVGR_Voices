import React, { useContext, useEffect } from 'react'
import { BlogContext } from './BlogPage'
import {UserContext} from "../../../App"
import { Link } from 'react-router-dom';
import axios from 'axios';

const BlogInteraction = () => {
  let {blog,blog:{_id,blog_id,activity,activity:{total_likes,total_comments},author:{personal_info:{username:author_username}}},setBlog,isLiked,setIsLiked,isCommentsVisible,setCommentsVisible} = useContext(BlogContext);
  let {userAuth:{username,access_token}} = useContext(UserContext);
  const handleLikeButton = () =>{
    setIsLiked(!isLiked);
    !isLiked ? ++total_likes : --total_likes;
    setBlog({...blog,activity:{...activity,total_likes}});
    axios.post(process.env.REACT_APP_SERVER_DOMAIN+"/like-blog",{_id,isLiked},{
      headers:{
        'Authorization' : `Bearer ${access_token}`
      }})
    .then(({data})=>{
      console.log(data);
    })
    .catch(err=>{
      console.log(err);
    })
  }
  useEffect(()=>{
    if(username){
      //make request for server to get the like information
      axios.post(process.env.REACT_APP_SERVER_DOMAIN+"/is-blog-liked",{_id},{
        headers:{
          'Authorization' : `Bearer ${access_token}`
        }})
        .then(({data:{result}})=>{
          setIsLiked(Boolean(result));
        })
        .catch(err=>{
          console.log(err);
        })
      
    }
  },[])
  return (
    <>
      <hr className="border-grey my-2" />
        <div className="flex justify-between gap-6">
          <div className="flex gap-3 items-center">
          <button onClick={handleLikeButton} className={`w-10 h-10 rounded-full flex items-center justify-center ${isLiked ? "bg-red/20 text-red" : "bg-grey/80"}`}>
            <i className={`fi ${isLiked ? "fi-sr-heart text-red" : "fi-rr-heart"}`}></i>  
          </button>
            <p className="tex-xl text-dark-grey">{total_likes}</p>
          <button onClick={()=>setCommentsVisible(!isCommentsVisible)} className="w-10 h-10 rounded-full flex items-center justify-center bg-grey/80">
            <i className="fi fi-rr-comment-dots"></i>  
          </button>
            <p className="tex-xl text-dark-grey">{total_comments}</p>
          </div>
          <div>
            {
              username === author_username ? <Link to={`/editor/${blog_id}`} className="underline hover:text-purple">Edit</Link> : ""
            }
          </div>
        </div>
      <hr className="border-grey my-2" />
    </>
  )
}

export default BlogInteraction
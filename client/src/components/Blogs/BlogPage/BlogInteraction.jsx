import React, { useContext } from 'react'
import { BlogContext } from './BlogPage'
import {UserContext} from "../../../App"
import { Link } from 'react-router-dom';

const BlogInteraction = () => {
  let {blog:{blog_id,activity,activity:{total_likes,total_comments},author:{personal_info:{username:author_username}}},setBlog} = useContext(BlogContext);
  let {userAuth:{username}} = useContext(UserContext);
  return (
    <>
      <hr className="border-grey my-2" />
        <div className="flex justify-between gap-6">
          <div className="flex gap-3 items-center">
          <button className="w-10 h-10 rounded-full flex items-center justify-center bg-grey/80">
            <i className="fi fi-rr-heart"></i>  
          </button>
            <p className="tex-xl text-dark-grey">{total_likes}</p>
          <button className="w-10 h-10 rounded-full flex items-center justify-center bg-grey/80">
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
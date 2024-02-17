import React, { useContext } from 'react'
import { BlogContext } from './BlogPage'
import CommentField from './CommentField';

const CommentsContainer = () => {
    let {blog:{title},isCommentsVisible,setCommentsVisible} = useContext(BlogContext);
    return (
        <div className={`sm:w-full fixed ${isCommentsVisible ? "top-0 md:right-0" : "top-[100%] md:right-[-100%]"} duration-1000 sm:right-0 md:top-0 w-[30%] min-w-[350px] h-full z-50 bg-white shadow-2xl p-8 px-16 overflow-y-auto overflow-x-hidden`}>
            <div className="relative">
                <h1 className="text-xl font-medium">Comments</h1>
                <p className="text-lg mt-2 w-[70%] text-dark-grey line-clamp-1">{title}</p>
                <button onClick={()=>setCommentsVisible(!isCommentsVisible)} className="absolute top-0 right-0 flex justify-center items-center w-12 h-12 rounded-full bg-grey">
                    <i className="fi fi-br-cross mt-1"></i>
                </button>
            </div>
            <hr className="border-grey my-6 w-[120%] -ml-10"/>
            <CommentField action="Comment" />
        </div>
    )
}

export default CommentsContainer
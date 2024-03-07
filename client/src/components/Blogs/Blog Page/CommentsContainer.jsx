import React, { useContext } from 'react'
import { BlogContext } from './BlogPage'
import CommentField from './CommentField';
import axios from 'axios';
import NoBlogsDataMessage from '../Blog Home/NoBlogsDataMessage';
import Animation from '../../../common/Animation';
import CommentCard from './CommentCard';

export const fetchComments = async({skip=0,blog_id,setParentCommentCountFunc,commentArr=null}) => {
    let res;
    await axios.post(process.env.REACT_APP_SERVER_DOMAIN+"/get-blog-comments",{blog_id,skip})
    .then(({data})=>{
        data.map(comment => {
            comment.childrenLevel = 0;
        })
        setParentCommentCountFunc(preVal => preVal+data.length);
        if(commentArr === null){
            res = {results:data}
        }else{
            res = {results:[...commentArr,...data]}
        }
    })
    return res;
}

const CommentsContainer = () => {
    let {blog,blog:{_id,title,comments:{results:commentsArr},activity:{total_parent_comments}},isCommentsVisible,setCommentsVisible,totalParentCommentsLoaded,setTotalParentCommentsLoaded,setBlog} = useContext(BlogContext);
    console.log(totalParentCommentsLoaded,total_parent_comments);
    const loadMoreComments = async () => {
        let newCommentsArr = await fetchComments({skip:totalParentCommentsLoaded,blog_id:_id,setParentCommentCountFunc:setTotalParentCommentsLoaded,commentArr:commentsArr})
        setBlog({...blog,comments:newCommentsArr});
    }
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
            <div className="mt-24">
            {
                commentsArr && commentsArr.length ? 
                commentsArr.map((comment,i) => {
                    return <Animation key={i}>
                        <CommentCard index={i} leftVal={comment.childrenLevel*4} commentData={comment} />
                    </Animation>
                }) : <NoBlogsDataMessage message="No Comments"/>
            }
            </div>
            {
                total_parent_comments > totalParentCommentsLoaded ? <button onClick={loadMoreComments} className="text-dark-grey hover:bg-grey/30 p-2 px-3 rounded-md flex items-center gap-2">
                    Load More
                </button> : ""
            }
        </div>
    )
}

export default CommentsContainer
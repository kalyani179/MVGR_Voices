import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { getDate } from '../../common/Date';
import { UserContext } from '../../App';
import axios from 'axios';
import toast from 'react-hot-toast';

const BlogStats = ({stats}) => {
    return (
      <div className="flex gap-2 mb-4 pb-4 border-grey border-b lg:border-none"> 
          {
            Object.keys(stats).map((info,i)=>{
              return !info.includes("parent") ? 
              <div key={i} className={`flex flex-col items-center w-full h-full justify-center p-4 px-6 ${i!==0 ? "border-grey border-l" : ""}`}>
                  <h1 className="sm:text-lg text-xl mb-2 font-medium">{stats[info].toLocaleString()}</h1>
                  <p className="text-dark-grey capitalize">{info.split("_")[1]}</p>
              </div>
              : ""
            })
          }
      </div>
    )
}

const ManagePublishedBlogCard = ({blog}) => {
  let {banner,blog_id,title,publishedAt,activity} = blog;
  let {userAuth:{access_token}} = useContext(UserContext);
  let [showStat,setShowStat] = useState(false);
  return (
    <>
      <div className="flex gap-10 border-b mb-6 sm:px-4 border-grey pb-6 items-center">
        <img className="sm:hidden lg:hidden xl:block w-28 h-28 flex-none bg-grey object-cover" src={banner} alt="blog banner" />
        <div className="flex flex-col justify-between py-2 w-full min-w-[300px]">
            <div>
              <Link to={`/blog/${blog_id}`} className="blog-title mb-4 hover:underline">{title}</Link>
              <p className="line-clamp-1">Published on {getDate(publishedAt)}</p>
            </div>
            <div className="flex gap-6 mt-3">
                <Link  to={`/editor/${blog_id}`} className="pr-4 py-2 text-primary font-medium underline">Edit</Link>
                <button onClick={()=>setShowStat(!showStat)} className="lg:hidden pr-4 py-2 underline">Stats</button>
                <button onClick={(e)=>deleteBlog(blog,access_token,e.target)} className="pr-4 py-2 underline font-medium text-red">Delete</button>
            </div>
        </div>
        <div className="sm:hidden md:hidden lg:block">
            <BlogStats stats={activity}/>
        </div>
      </div>
      {
        showStat ? <div className="lg:hidden">
        <BlogStats stats={activity}/>
        </div> : ""
      }
    </>
  )
}

const ManageDraftBlogCard = ({blog}) => {
  let {title,desc,blog_id,index} = blog;
  let {userAuth:{access_token}} = useContext(UserContext);
    return (
      <div className="flex gap-5 pb-6 mb-6 lg:gap-10 border-b border-grey">
          <h1 className="blog-index text-center pl-4 md:pl-6 flex-none">{index<10 ? "0"+index : index}</h1>
          <div>
            <h1 className="blog-title mb-3">{title}</h1>
            <p className="line-clamp-2 font-gelasio">{desc.length ? desc : "No Description"}</p>
            <div className="flex gap-6 mt-3">
                <Link  to={`/editor/${blog_id}`} className="pr-4 py-2 text-primary font-medium underline">Edit</Link>
                <button onClick={(e)=>deleteBlog(blog,access_token,e.target)} className="pr-4 py-2 underline font-medium text-red">Delete</button>
            </div>
          </div>
      </div>
    )
}

const deleteBlog = (blog,access_token,target) => {
    let {index,blog_id,setStateFunc} = blog;
    target.setAttribute("disabled",true);
    let loadingToast = toast.loading("deleting blog...");
    axios.post(process.env.REACT_APP_SERVER_DOMAIN+"/delete-blog",{blog_id},{
      headers:{
        'Authorization' : `Bearer ${access_token}`
      }
    })
    .then(({data}) => {
        target.removeAttribute("disabled");
        setStateFunc(preVal => {
          let {deletedDocCount,totalDocs,results} = preVal;
          results.splice(index,1);
          if(!deletedDocCount){
            deletedDocCount=0;
          }
          if(!results.length && totalDocs-1>0){
              return null;
          }
          toast.remove(loadingToast);
          toast.success("Blog Deleted Successfully...!");
          return {...preVal,totalDocs:totalDocs-1,deleteDocCount:deletedDocCount+1}
        })
    })
    .catch(err => {
      toast.remove(loadingToast);
      toast.error("Sorry! There is an issue in deleting the blog..Please Try Again!")
      console.log(err);
    })
}

export {ManagePublishedBlogCard,ManageDraftBlogCard}
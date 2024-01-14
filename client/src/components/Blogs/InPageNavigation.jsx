import React from 'react'
import Animation from '../../common/Animation';
import Loader from '../../common/Loader';
import TrendingBlogPostCard from './TrendingBlogPostCard';
import BlogPostCard from './HomeBlogPostCard';

const InPageNavigation = ({routes,trendingBlogs,blogs,setActiveTab,activeTab}) => {

    return (
        <>
            <div className="relative mb-8 bg-white border-b border-grey flex flex-nowrap overflow-x-auto">
                {
                    routes.map((route,index)=>{
                        return(
                            <button onClick={()=>setActiveTab(route)} key={index} className={`p-4 px-5 capitalize text-lg ${activeTab===route ?"border-b border-black text-black":"text-dark-grey" } ${route==="trending blogs" ? "md:hidden" : ""}`}>{route}</button>
                        ) 
                    })
                }
            </div>
            <div>
                {
                    activeTab!=="trending blogs" && 
                    <div>
                    {
                        blogs===null ? <Loader /> : 
                        blogs.map((blog,index)=>{
                            return(
                                <Animation transition={{duration:1,delay:index*0.1}}>
                                    <BlogPostCard content={blog} author={blog.author.personal_info}/>
                                </Animation>
                            )
                        })
                        }
                    </div>
                }
                {
                    activeTab === "trending blogs" &&
                    <div>
                    {
                                trendingBlogs===null ? <Loader /> : 
                                trendingBlogs.map((blog,index)=>{
                                    return(
                                        <Animation transition={{duration:1,delay:index*0.1}}>
                                            <TrendingBlogPostCard blog={blog} index={index}/>
                                        </Animation>
                                    )
                                })
                    }
                    </div>
                }
            </div>
        </>
    )
}

export default InPageNavigation
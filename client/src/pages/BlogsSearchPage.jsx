import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import InPageNavigation from '../components/Blogs/InPageNavigation';
import Loader from '../common/Loader';
import Animation from '../common/Animation';
import BlogPostCard from '../components/Blogs/HomeBlogPostCard';
import NoBlogsDataMessage from '../components/Blogs/NoBlogsDataMessage';
import LoadMoreDataBtn from '../common/LoadMoreDataBtn';
import FilterPaginationData from '../common/FilterPaginationData';

const BlogsSearchPage = () => {
    let {query} = useParams();
    const [blogs,setBlog] = useState(null);
    const searchBlogs = ({page = 1,create_new_arr=false}) => {
        axios.post(process.env.REACT_APP_SERVER_DOMAIN+"/search-blogs",{query,page})
        .then( async ({ data }) => {
        
            let formatedData = await FilterPaginationData({
                state:blogs,
                data:data.blogs,
                page,
                countRoute:"/search-blogs-count",
                data_to_send:{query},
                create_new_arr
            })
        
            setBlog(formatedData);
        })
        .catch((err) => {
            console.log(err);
        });

    }
    useEffect(()=>{
        resetState();
        searchBlogs({page:1,create_new_arr:true});
    },[query])

    const resetState = () =>{
        setBlog(null);
    }
    return (
        <section className="h-cover flex justify-center gap-10">
            <div className="w-full">
                <InPageNavigation
                    routes = {[`search results for ${query}`,"Accounts Matched"]}
                    defaultHidden={["Accounts Matched"]}>
                <>
                {
                    blogs===null ? <Loader /> : 
                    (
                        !blogs.results.length ? 
                        <NoBlogsDataMessage message={"No Blogs Published"}/>
                        :
                        blogs.results.map((blog,index)=>{
                            return(
                                <Animation transition={{duration:1,delay:index*0.1}}>
                                    <BlogPostCard content={blog} author={blog.author.personal_info}/>
                                </Animation>
                            )
                        })
                    )
                }
                <LoadMoreDataBtn state={blogs} fetchDataFunc={searchBlogs}/>
                </>
                </InPageNavigation>
            </div>
        </section>
    )
}

export default BlogsSearchPage
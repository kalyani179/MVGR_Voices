import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import InPageNavigation from '../components/Blogs/InPageNavigation';
import Loader from '../common/Loader';
import Animation from '../common/Animation';
import BlogPostCard from '../components/Blogs/HomeBlogPostCard';
import NoBlogsDataMessage from '../components/Blogs/NoBlogsDataMessage';

const BlogsSearchPage = () => {
    let {query} = useParams();
    const [blogs,setBlog] = useState(null);
    const searchBlogs = ({page = 1,create_new_array=false}) => {
        axios.post("http://localhost:3000/search-blogs",{query,page})

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
                        !blogs.length ? 
                        <NoBlogsDataMessage message={"No Blogs Published"}/>
                        :
                        blogs.map((blog,index)=>{
                            return(
                                <Animation transition={{duration:1,delay:index*0.1}}>
                                    <BlogPostCard content={blog} author={blog.author.personal_info}/>
                                </Animation>
                            )
                        })
                    )
                }
                </>
                </InPageNavigation>
            </div>
        </section>
    )
}

export default BlogsSearchPage
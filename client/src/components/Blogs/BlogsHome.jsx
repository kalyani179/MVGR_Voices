import React,{useState,useEffect} from 'react'
import Animation from '../../common/Animation'
import InPageNavigation from './InPageNavigation'
import axios from 'axios';
import Loader from '../../common/Loader';
import BlogPostCard from './BlogPostCard';
import { Outlet } from 'react-router-dom';

const BlogsHome = () => {
    let [blogs,setBlog] = useState(null);
    const fetchLatestBlogs = () => {
        axios.get("http://localhost:3000/latest-blogs")
        .then(({data})=>{
            setBlog(data.blogs);
        })
        .catch(err=>{
            console.log(err);
        })
    }
    useEffect(()=>{
        fetchLatestBlogs();
    },[])
    return (
        <Animation>
            <section className="h-cover flex justify-center gap-10">
                {/* latest blogs */}
                <div className="w-full">
                        <InPageNavigation routes={["home","trending blogs"]}>
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
                        </InPageNavigation>
                </div>
                {/* filters and trending blogs */}
                <div>
                </div>
            </section>
        </Animation>
    )
}

export default BlogsHome
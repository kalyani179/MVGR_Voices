import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Animation from '../../../common/Animation';
import Loader from '../../../common/Loader';
import defaultBanner from "../../../assets/images/Blogs/default_banner.png"
import { getFullDate } from '../../../common/Date';
import BlogInteraction from './BlogInteraction';

export const blogStructure = {
    title:'',
    desc:'',
    content:[],
    tags:[],
    author:{personal_info:{}},
    banner:'',
    publishedAt:''
}
const BlogPage = () => {
    let {blog_id} = useParams();
    const [blog,setBlog] = useState(blogStructure);
    const [loading,setLoading] = useState(true);
    let {title,content,banner,author:{personal_info:{fullname,username:author_username,profile_img}},publishedAt} = blog;
    const fetchBlog = ()=>{
        axios.post(process.env.REACT_APP_SERVER_DOMAIN+"/get-blog",{blog_id})
        .then(({data : {blog}}) => {
            setBlog(blog);
            setLoading(false);
        })
        .catch(err => {
            console.log(err);
            setLoading(false);
        })
    }
    useEffect(()=>{
        fetchBlog();
    },[])
    return (
        <Animation>
            {
                loading ? <Loader /> :
                <div className="max-w-[900px] mx-auto block py-10 px-[5vw]">
                    <img src={defaultBanner} className="aspect-video" alt="banner"/>
                    <div className="mt-12">
                        <h2>{title}</h2>
                        <div className="flex sm:flex-col justify-between my-8">
                            <div className="flex gap-5 items-start">
                                <img src={profile_img} className="w-12 h-12 rounded-full" alt="profile" />
                                <p className="capitalize">
                                    {fullname}
                                    <br />
                                    @
                                    <Link to={`/user/${author_username}`} className="underline">{author_username}</Link>
                                </p>
                            </div>
                            <p className="text-dark-grey opacity-75 sm:mt-6 sm:ml-12 sm:pl-5">published On {getFullDate(publishedAt)}</p>
                        </div>
                    </div>
                    <BlogInteraction />
                </div>
            }
        </Animation>
    )
}

export default BlogPage
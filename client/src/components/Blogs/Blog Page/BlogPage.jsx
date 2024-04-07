import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Animation from '../../../common/Animation';
import Loader from '../../../common/Loader';
import lightDefaultBanner from "../../../assets/images/Blogs/default_banner_light.png";
import darkDefaultBanner from "../../../assets/images/Blogs/default_banner_dark.png";
import { getFullDate } from '../../../common/Date';
import BlogInteraction from './BlogInteraction';
import BlogPostCard from '../Blog Home/HomeBlogPostCard';
import BlogContent from './BlogContent';
import CommentsContainer, { fetchComments } from './CommentsContainer';
import { ThemeContext, UserContext } from '../../../App';
import toast from 'react-hot-toast';

export const blogStructure = {
    title:'',
    desc:'',
    content:[],
    author:{personal_info:{}},
    banner:'',
    publishedAt:''
}

export const BlogContext = createContext({});

const BlogPage = () => {
    let {blog_id} = useParams();
    let {theme,setTheme} = useContext(ThemeContext);
    const [blog,setBlog] = useState(blogStructure);
    const [similarBlogs,setSimilarBlogs] = useState(null);
    const [loading,setLoading] = useState(true);
    const [isLiked,setIsLiked] = useState(false);
    const [isCommentsVisible,setCommentsVisible] = useState(false);
    const [totalParentCommentsLoaded,setTotalParentCommentsLoaded] = useState(0);

    let {userAuth:{access_token}} = useContext(UserContext);
    // console.log(access_token);
    let navigate = useNavigate();

    let {title,content,banner,author:{personal_info:{fullname,username:author_username,profile_img}},publishedAt} = blog;
    const fetchBlog = ()=>{
        axios.post(process.env.REACT_APP_SERVER_DOMAIN+"/get-blog",{blog_id})
        .then(async ({data : {blog}}) => {
            blog.comments = await fetchComments({blog_id:blog._id,setParentCommentCountFunc:setTotalParentCommentsLoaded})
            setBlog(blog);
            axios.post(process.env.REACT_APP_SERVER_DOMAIN+"/search-blogs",{tag:blog.tags[0],limit:5,eliminate_blog:blog_id})
            .then(({data})=>{
                setSimilarBlogs(data.blogs);
                console.log(data.blogs);
            })
            setLoading(false);
        })
        .catch(err => {
            console.log(err);
            setLoading(false);
        })
    }
    useEffect(()=>{
        resetStates();
        fetchBlog();
        setIsLiked(isLiked);
        // setCommentsVisible(false);
        setTotalParentCommentsLoaded(totalParentCommentsLoaded);
    },[blog_id])

    const resetStates = () =>{
        setBlog(blogStructure);
        setSimilarBlogs(null);
        setLoading(true);
    }

    const [signInErrorHandled, setSignInErrorHandled] = useState(false);

    const handleSignInError = () => {
        navigate("/blogs");
        setTimeout(() => {
            return toast.error("Please sign in to see the blog!", {style: {
            border:"1px solid #e86f6f",
            fontSize: "17px"
            }});
        }, 1000);
    };

    useEffect(() => {
        if (!access_token && !signInErrorHandled) {
            handleSignInError();
            setSignInErrorHandled(true);
        }
    }, [access_token, signInErrorHandled]);

    return (
        <Animation>
            {
                loading ? <Loader /> :
                <BlogContext.Provider value={{blog,setBlog,isLiked,setIsLiked,isCommentsVisible,setCommentsVisible,totalParentCommentsLoaded,setTotalParentCommentsLoaded}}>
                    <CommentsContainer />
                    <div className="max-w-[900px] mx-auto block py-10 px-[5vw]">
                        <img src={ banner ? banner : theme==="light" ? lightDefaultBanner : darkDefaultBanner } className="aspect-video" alt="banner"/>
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
                        <div className='my-12 font-gelasio blog-page-content'>
                            {
                                content[0].blocks.map((block,i)=>{
                                    return <div key={i} className="my-4 md:my-8">
                                        <BlogContent block={block} />
                                    </div>
                                })
                            }
                        </div>
                        <BlogInteraction />
                        {
                            similarBlogs !== null && similarBlogs.length ? 
                            <>
                                <h1 className="text-2xl mt-14 mb-10 font-medium">Similar Blogs</h1>
                                <div className="flex flex-wrap gap-x-24 gap-y-5"> 
                                {
                                    similarBlogs.map((blog,i)=>{
                                        let {author:{personal_info}} = blog;
                                        return <Animation key={i} transition={{duration:1,delay:i*0.08}}>
                                            <BlogPostCard content={blog} author={personal_info} />
                                        </Animation>
                                    })
                                }
                                </div>
                            </>
                            :
                            ""
                        }
                    </div>
                </BlogContext.Provider>
            }
        </Animation>
    )
}

export default BlogPage
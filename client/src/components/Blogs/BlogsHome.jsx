import React, { useState, useEffect, useContext } from "react";
import Animation from "../../common/Animation";
import InPageNavigation from "./InPageNavigation";
import axios from "axios";
import Loader from "../../common/Loader";
import BlogPostCard from "./HomeBlogPostCard"
import TrendingBlogPostCard from "./TrendingBlogPostCard";
import NoBlogsDataMessage from "./NoBlogsDataMessage";
import BlogsNavbar from "./Blogs Navbar/BlogsNavbar";
import { ThemeContext, UserContext } from "../../App";
import { useNavigate } from "react-router-dom";
import FilterPaginationData from "../../common/FilterPaginationData";
import LoadMoreDataBtn from "../../common/LoadMoreDataBtn";
import { BeatLoader } from "react-spinners";


const BlogsHome = () => {
    let [blogs, setBlog] = useState(null);
    let {theme,setTheme} = useContext(ThemeContext);
    let [trendingBlogs, setTrendingBlog] = useState(null);
    let [pageState,setPageState] = useState("home");
    let {userAuth:{access_token}} = useContext(UserContext);
    let navigate = useNavigate();

    let categories = [
        "Programming",
        "Social Media",
        "Finances",
        "Travel",
        "Cooking",
        "Photography",
        "Technology",
        "Interviews",
    ];

    const fetchLatestBlogs = ({page = 1}) => {
        axios
        .post(process.env.REACT_APP_SERVER_DOMAIN+"/latest-blogs",{page})
        .then( async ({ data }) => {
        
            let formatedData = await FilterPaginationData({
                state:blogs,
                data:data.blogs,
                page,
                countRoute:"/all-latest-blogs-count"
            })
        
            setBlog(formatedData);
        })
        .catch((err) => {
            console.log(err.message);
        });
    };
    const fetchBlogsByCategory = ({page=1}) => {
        axios
        .post(process.env.REACT_APP_SERVER_DOMAIN+"/search-blogs",{tag:pageState,page})
        .then(async ({ data }) => {
            let formatedData = await FilterPaginationData({
                state:blogs,
                data:data.blogs,
                page,
                countRoute:"/search-blogs-count",
                data_to_send:{tag:pageState}
            })
        
            setBlog(formatedData);
        })
        .catch((err) => {
            console.log(err);
        });
    }
    const fetchTrendingBlogs = () => {
        axios
        .get(process.env.REACT_APP_SERVER_DOMAIN+"/trending-blogs")
        .then(({ data }) => {
            setTrendingBlog(data.blogs);
        })
        .catch((err) => {
            console.log(err);
        });
    };
    const loadBlogByCategory = (e) => {
        let category = e.target.innerText.toLowerCase();
        setBlog(null);
        if(pageState === category){
            setPageState("home");
            return;
        }
        setPageState(category);
    }
    useEffect(() => {

        if(pageState==="home"){
            fetchLatestBlogs({page:1});
        }else{
            fetchBlogsByCategory({page:1});
        }
        if (!trendingBlogs) {
            fetchTrendingBlogs();
        }
    }, [pageState]);

    return (
        <>
        {
        !access_token 
        ?
        navigate("/")
        : 
        <Animation>
        
        <section className="h-cover flex justify-center gap-10">
            {/* latest blogs */}
            <div className="w-full">
            <InPageNavigation
                routes={[pageState,"trending blogs"]}
                defaultHidden={["trending blogs"]}
            >
                <div>
                {
                    blogs===null ? 
                    <div className="center">
                            <BeatLoader color="#e86f6f" />
                    </div> : 
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
                <div className="center">
                    <LoadMoreDataBtn state={blogs} fetchDataFunc={(pageState==="home"? fetchLatestBlogs : fetchBlogsByCategory)}/>
                </div>
            
                </div>
                
                <div>
                {
                    trendingBlogs===null ?  
                    <div className="center">
                            <BeatLoader color="#e86f6f" />
                    </div> 
                    : 
                    (
                        !trendingBlogs.length ? 
                        <NoBlogsDataMessage message={"No Blogs Published"}/>
                        :
                        trendingBlogs.map((blog,index)=>{
                            return(
                                <Animation transition={{duration:1,delay:index*0.1}}>
                                    <TrendingBlogPostCard blog={blog} index={index}/>
                                </Animation>
                            )
                        })
                    )
                }
                </div>
            
            </InPageNavigation>
            
            </div>
            {/* filters and trending blogs */}
            <div className="min-w-[40%] lg:min-w-[400px] max-w-min border-l border-grey pl-8 pt-3 sm:hidden">
            <div className="flex flex-col gap-10">
                <div>
                    <h1 className="font-medium text-primary text-xl mb-8">
                        Stories From All Interests
                    </h1>
                    <div className="flex gap-3 flex-wrap">
                        {categories.map((category, index) => {
                            return (
                                <button onClick={loadBlogByCategory} className={`tag ${pageState===category.toLowerCase() ? theme==="light" ?  "bg-primary text-white font-medium" : "bg-primary text-darkBlack font-medium" : ""}`} key={index}>
                                {category}
                                </button>
                            );
                        })}
                    </div>
                </div>
                <div>
                    <h1 className="font-medium text-xl text-primary mb-8">
                        Trending <i className="fi fi-rr-arrow-trend-up text-primary"></i>
                    </h1>
                    {trendingBlogs === null ? 
                        <div className="center">
                            <BeatLoader color="#e86f6f" />
                        </div>
                        : 
                        (
                            !trendingBlogs.length ? 
                            <NoBlogsDataMessage message={"No Blogs Published"}/>
                            :
                            trendingBlogs.map((blog, index) => {
                            return (
                                <Animation transition={{ duration: 1, delay: index * 0.1 }}>
                                    <TrendingBlogPostCard blog={blog} index={index} />
                                </Animation>
                            );
                            })
                        )
                    }
                </div>
            </div>
            </div>
        </section>
        </Animation>
        }
        </>
    );
};

export default BlogsHome;

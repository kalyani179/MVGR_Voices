import React, { useState, useEffect, useContext } from "react";
import Animation from "../../../common/Animation";
import InPageNavigation from "../../../common/InPageNavigation";
import axios from "axios";

import BlogPostCard from "./HomeBlogPostCard"
import TrendingBlogPostCard from "./TrendingBlogPostCard";
import { SearchContext, ThemeContext } from "../../../App";
import FilterPaginationData from "../../../common/FilterPaginationData";
import LoadMoreDataBtn from "../../../common/LoadMoreDataBtn";
import {SyncLoader } from "react-spinners";
import Footer from "../../Home/Footer/Footer";
import NoDataMessage from "../../../common/NoDataMessage";



const BlogsHome = () => {
    let [blogs, setBlog] = useState(null);
    let {theme} = useContext(ThemeContext);
    let [trendingBlogs, setTrendingBlog] = useState(null);
    let [pageState,setPageState] = useState("home");
    const {searchBoxVisibility} = useContext(SearchContext);
    let categories = [
        "Programming",
        "Social Media",
        "Finances",
        "Travel",
        "Photography",
        "Technology",
        "Placements",
        "Motivation",
        "Sports",
        "Health & Fitness",
        "Gaming",
        "News",
        "Lifestyle",
        "Business",
        "Food",
        "Entertainment",
        "Environment",
        "Art & Design"
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
        <Animation>
        <section className="h-cover md:px-[4vw] flex flex-col justify-center gap-5 bg-cool-white">
                {/* Trending Blogs */}
                <div className="flex flex-col sm:hidden max-md:hidden">
                <h1 className="font-medium text-xl text-primary mb-8 tracking-wide">
                            Trending <i className="fi fi-rr-arrow-trend-up text-primary"></i>
                </h1>
                    <div className="flex justify-around">
                    {trendingBlogs === null ? 
                        <div className="center w-full">
                            <SyncLoader color="#f59a9a" margin={6} />
                        </div>
                        : 
                        (
                            !trendingBlogs.length ? 
                            <NoDataMessage message={"No Blogs Published"}/>
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

             {/* categories */}
                <div className={`${searchBoxVisibility?"sm:mt-14 duration-500" : "duration-500"}`}>
                    <h1 className="font-medium text-primary tracking-wide text-xl sm:text-lg mb-8">
                        Categories
                    </h1>
                    <div className="flex gap-3 flex-wrap">
                        {categories.map((category, index) => {
                            return (
                                <button onClick={loadBlogByCategory} className={`tag ${index>=9 ? "sm:hidden" : ""} ${pageState===category.toLowerCase() ? theme==="light" ?  "bg-primary text-white font-medium" : "bg-primary text-darkBlack font-medium" : ""}`} key={index}>
                                {category}
                                </button>
                            );
                        })}
                    </div>
                </div>

            {/* latest blogs */}
            <div className="w-full bg-cool-white">
            <InPageNavigation
                routes={[pageState,"trending blogs"]}
                defaultHidden={["trending blogs"]}
            >
                <div className="flex gap-8 justify-start items-center flex-wrap">
                {
                    blogs===null ? 
                    <div className="center w-full">
                            <SyncLoader color="#f59a9a" margin={6} />
                    </div> : 
                    (
                        !blogs.results.length ? 
                        <div className="center w-full p-5">
                            <NoDataMessage message={"No Blogs Published"}/>
                        </div>
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
                    <div className="center w-full">
                            <SyncLoader color="#f59a9a" margin={6} />
                    </div>
                    : 
                    (
                        !trendingBlogs.length ? 
                        <NoDataMessage message={"No Blogs Published"}/>
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
            
        </section>
            <div className="bg-cool-white">
                <Footer />
            </div>
        </Animation>
    );
};

export default BlogsHome;

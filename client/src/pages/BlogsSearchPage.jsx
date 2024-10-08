import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import InPageNavigation from '../common/InPageNavigation';
import Loader from '../common/Loader';
import Animation from '../common/Animation';
import BlogPostCard from '../components/Blogs/Blog Home/HomeBlogPostCard';
import LoadMoreDataBtn from '../common/LoadMoreDataBtn';
import FilterPaginationData from '../common/FilterPaginationData';
import UserCard from '../components/Blogs/Blog Page/UserCard';
import { SyncLoader } from 'react-spinners';
import NoDataMessage from '../common/NoDataMessage';
import { SearchContext } from '../App';

const BlogsSearchPage = () => {
    let {query} = useParams();
    const [blogs,setBlog] = useState(null);
    const [users,setUsers] = useState(null);
    const {searchBoxVisibility} = useContext(SearchContext);
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
    const fetchUsers = () =>{
        axios.post(process.env.REACT_APP_SERVER_DOMAIN+"/search-users",{query})
        .then(({data}) =>{
            setUsers(data.users)
        })
    }
    useEffect(()=>{
        resetState();
        searchBlogs({page:1,create_new_arr:true});
        fetchUsers();
    },[query])

    const resetState = () =>{
        setBlog(null);
        setUsers(null);
    }
    const UserCardWrapper = () =>{
        return(
            <>
                {
                    users===null ? <Loader /> :
                        users.length?
                        users.map((user,i)=>{
                            return <Animation key={i} transition={{duration:1,dealay:i*0.08}}>
                                <UserCard user={user} />
                            </Animation>
                        }) : <NoDataMessage message={"No Users Found"}/>
                }
            </>
        )
    }
    return (
        <section className="flex min-h-screen bg-cool-white justify-center gap-5">
        <div className={`w-full ${searchBoxVisibility?"sm:mt-14 duration-500" : "duration-500"}`}>
            <InPageNavigation
                routes={[`search results for ${query}`, "Accounts Matched"]}
                defaultHidden={["Accounts Matched"]}
            >
                <div>
                    {blogs === null ? (
                        <div className="center">
                            <SyncLoader color="#f59a9a" margin={6} size={13} />
                        </div>
                    ) : !blogs.results.length ? (
                        <NoDataMessage message={"No Blogs Published"} />
                    ) : (
                        <div className="flex flex-wrap gap-x-24 gap-y-5"> 
                            {blogs.results.map((blog, index) => (
                                <Animation key={blog.id} transition={{ duration: 1, delay: index * 0.1 }}>
                                    <BlogPostCard content={blog} author={blog.author.personal_info} />
                                </Animation>
                            ))}
                            <LoadMoreDataBtn state={blogs} fetchDataFunc={searchBlogs} />
                        </div>
                    )}
                </div>
                <UserCardWrapper />
            </InPageNavigation>
        </div>
        <div className="min-w-[40%] lg:min-w-[350px] max-w-min border-l border-white pl-8 pt-3 sm:hidden">
            <h1 className="font-medium text-lg mb-8">User related to Search <i className="fi fi-rr-user mt-1"></i></h1>
            <UserCardWrapper />
        </div>
    </section>
    )
}

export default BlogsSearchPage
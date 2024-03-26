import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../App';
import FilterPaginationData from '../../common/FilterPaginationData';
import { Toaster } from 'react-hot-toast';
import InPageNavigation from '../../common/InPageNavigation';
import Loader from '../../common/Loader';
import Animation from '../../common/Animation';
import {ManagePublishedBlogCard, ManageDraftBlogCard } from './ManageBlogCard';
import { SyncLoader } from 'react-spinners';
import NoDataMessage from '../../common/NoDataMessage';

const ManageBlogs = () => {
    const [blogs,setBlogs] = useState(null);
    const [drafts,setDrafts] = useState(null);
    const [query,setQuery] = useState("");

    let {userAuth:{access_token}} = useContext(UserContext);

    const getBlogs = ({page,draft,deletedDocCount=0}) => {
        axios.post(process.env.REACT_APP_SERVER_DOMAIN+"/user-written-blogs",{page,draft,query,deletedDocCount},{
            headers:{
                'Authorization' : `Bearer ${access_token}`
            }
        })
        .then(async ({data}) => {
            let formatedData = await FilterPaginationData({
                state : draft ? drafts : blogs,
                data:data.blogs , 
                page,
                user:access_token,
                countRoute:"/user-written-blogs-count",
                data_to_send :{draft,query}
            })
            console.log(formatedData);
            draft ? setDrafts(formatedData) : setBlogs(formatedData);
        })
        .catch(err => {
            console.log(err);
        })
    }
    const handleSearch = (e) => {
        let searchQuery = e.target.value;
        setQuery(searchQuery);
        if(e.keyCode === 13 && searchQuery.length) {
            setBlogs(null);
            setDrafts(null);
        }
    }
    const handleChange = (e) => {
        if(!e.target.value.length){
            setQuery("");
            setBlogs(null);
            setDrafts(null);
        }
    }
    useEffect(()=>{
        if(access_token){
            if(blogs===null){
                getBlogs({page:1,draft:false})
            }
            if(drafts===null){
                getBlogs({page:1,draft:true})
            }
        }
    },[access_token,blogs,drafts,query])
    return (
        <div className="md:ml-56 mt-24 sm:ml-5">
            {/* <h1 className="sm:hidden text-primary text-xl text-center font-medium">Manage Blogs</h1> */}
            <Toaster />
            <div className="relative sm:mt-5 md:mt-8 mb-10">
                <input type="search" className="w-full bg-grey p-4 pl-16 sm:pl-10 pr-6 rounded-full placeholder:text-dark-grey focus:bg-white" placeholder="Search Blogs"
                onChange={handleChange}
                onKeyDown={handleSearch}
                />
                <i className="fi fi-rr-search absolute right-[10%] top-1/2 sm:-translate-y-1/2 md:top-4 md:pointer-events-none md:left-6 text-lg text-dark-grey"></i>
            </div>
            <InPageNavigation manageBlogs={true} routes = {["Published Blogs","Drafts"]}>
                { // Published Blogs
                    blogs === null ? 
                        <div className="center">
                            <SyncLoader color="#f59a9a" margin={4} />
                        </div>
                    :
                    blogs.results.length ? 
                    <>
                        {
                            blogs.results.map((blog,i)=>{
                                return <Animation key={i} transition={{delay:i*0.04}}>
                                    <ManagePublishedBlogCard blog={{...blog,index:i,setStateFunc:setBlogs}}/>
                                </Animation>
                            })
                        }
                    </> 
                    :
                    <NoDataMessage message="No Published Blogs"/>
                }
                { // Drafts Blogs
                    drafts === null ? <Loader /> :
                    drafts.results.length ? 
                    <>
                        {
                            drafts.results.map((blog,i)=>{
                                return <Animation key={i} transition={{delay:i*0.04}}>
                                    <ManageDraftBlogCard blog={{...blog,index:i,setStateFunc:setDrafts}}/>
                                </Animation>
                            })
                        }
                    </> 
                    :
                    <NoDataMessage message="No Drafts Blogs"/>
                }
            </InPageNavigation>
        </div>
    )
}

export default ManageBlogs
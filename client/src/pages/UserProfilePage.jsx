import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import Animation from '../common/Animation'
import { motion } from "framer-motion";
import Loader from '../common/Loader'
import { ThemeContext, UserContext } from '../App'
import AboutUser from '../components/Blogs/AboutUser'
import FilterPaginationData from '../common/FilterPaginationData'
import InPageNavigation from '../components/Blogs/Blog Home/InPageNavigation'
import BlogPostCard from '../components/Blogs/Blog Home/HomeBlogPostCard';
import NoBlogsDataMessage from '../common/NoDataMessage';
import LoadMoreDataBtn from '../common/LoadMoreDataBtn'
import PageNotFound from './404Page'
import Navbar from '../components/Home/Navbar/Navbar'
import { SyncLoader } from 'react-spinners'
import TrendingPodcard from '../components/Podcast/Podcast Home/TrendingPodcard'
import ProfilePodcastPlayer from '../components/Podcast/Podcast Player/ProfilePodcastPlayer';
export const profileDataStructure = {
    personal_info : {
        fullname:"",
        username: "",
        profile_img:"",
        bio:""
    },
    account_info:{
        total_posts:0,
        total_reads:0
    },
    social_links:{},
    joinedAt : ""
}


const UserProfilePage = () => {
    let {id:profileId} = useParams();
    let [profile,setProfile] = useState(profileDataStructure);
    let [loading,setLoading] = useState(true);
    let [blogs,setBlog] = useState(null);
    let [podcasts, setPodcasts] = useState(null);
    let [profileLoaded,setProfileLoaded] = useState("");
    let {theme,setTheme} = useContext(ThemeContext);
    const [selectedPodcast, setSelectedPodcast] = useState(null);

    let {personal_info:{fullname,username:profile_username,profile_img,bio},account_info:{total_posts,total_reads,total_uploads},social_links,joinedAt} = profile;

    let {userAuth:{username}} = useContext(UserContext);
    const fetchUserProfile = () =>{
        axios.post(process.env.REACT_APP_SERVER_DOMAIN+"/get-profile",{username:profileId})
        .then(({data:user}) => {
            if(user!==null){
                setProfile(user);
            }
            setProfileLoaded(profileId);
            getBlogs({user_id:user._id});
            getPodcasts({author: user._id}); 
            setLoading(false);
        })
        .catch(err=>{
            console.log(err.message);
            setLoading(false);
        })
    }
    const getPodcasts = ({ author, page = 1 }) => {
        axios.post(process.env.REACT_APP_SERVER_DOMAIN + "/api/pod/search-podcasts", { author, page })
            .then(async ({ data }) => {
                let formatedData = await FilterPaginationData({
                    state: podcasts,
                    data: data.podcasts,
                    page,
                    countRoute: "/api/pod/search-podcasts-count",
                    data_to_send: { author },
                })
                formatedData.user_id = author;
                setPodcasts(formatedData);
            })
            .catch(error => console.error("Error fetching podcasts:", error));
    };
    const getBlogs = ({page=1,user_id}) =>{
        user_id = user_id===undefined ? blogs.user_id : user_id;
        axios.post(process.env.REACT_APP_SERVER_DOMAIN+"/search-blogs",{author:user_id,page})
        .then(async ({data})=>{
            let formatedData = await FilterPaginationData({
                state:blogs,
                data:data.blogs,
                page,
                countRoute:"/search-blogs-count",
                data_to_send:{author:user_id},
            })
            formatedData.user_id = user_id;
            setBlog(formatedData);
        })
    }
    useEffect(()=>{
        if(profileId!==profileLoaded){
            setBlog(null);
            setPodcasts(null);
        }
        if(blogs === null|| podcasts === null){
            resetStates();
            fetchUserProfile();
        }
    },[profileId, blogs, podcasts]);

    const resetStates = () =>{
        setLoading(true);
        setProfile(profileDataStructure);
        setProfileLoaded("");
    }
    const handlePodcastSelect = (podcast) => {
        setSelectedPodcast(podcast);
      }
    return (
        <Animation>
            {
                loading ? 
                <div className="center">
                    <SyncLoader color="#f59a9a" margin={4} />
                </div> 
                : 
                profile_username.length ?
                <>
                <div className={`${theme==="light" ? "bg-white" : "bg-white"} fixed w-full border-b-2 border-grey z-50`}>
                <Navbar home="0" activeLink="profile"/>
                </div>
                <section className="bg-cool-white h-cover md:flex flex-row-reverse items-start gap-5 min-[1100px]:gap-12">
                    <div className="flex flex-col mt-10 sm:items-center gap-5 min-w-[250px] md:w-[50%] md:pl-14 md:border-l md:border-white md:sticky md:top-[100px] md:py-10">
                        <img src={profile_img} className="w-48 h-48 bg-grey rounded-full md:w-32 md:h-32" alt="profile"/>
                        <h1 className="text-2xl font-medium">@{profile_username}</h1>
                        <p className="text-xl capitalize h-6">{fullname}</p>
                        <p>{total_posts.toLocaleString()} Blogs - {total_reads.toLocaleString()} Reads</p>
                        <p>{total_uploads.toLocaleString()} Podcasts </p>
                        <div className="flex gap-4 mt-2">
                            <Link to="/settings/edit-profile">
                                {
                                    profileId === username ? <button className="btn-purple rounded">Edit Profile</button> : ""
                                }     
                            </Link>
                        </div>
                        <AboutUser className={"sm:hidden"} bio={bio} social_links={social_links} joinedAt={joinedAt}/>
                    </div>
                    <div className="sm:mt-12 md:mt-24 w-full">
                    <InPageNavigation
                routes={["Podcasts Published","Blogs Published","About"]}
                defaultHidden={["About"]}
            >
                <div>
                {
                    podcasts === null ? <Loader /> :
                    (
                        podcasts.results && podcasts.results.length === 0 ?
                        <NoBlogsDataMessage message={"No Podcasts Published"} /> :
                        podcasts.results.map((podcast, index) => {
                            return (
                                <Animation transition={{ duration: 1, delay: index * 0.1 }}>
                                     <TrendingPodcard data={podcast} onClick={() => handlePodcastSelect(podcast)} />
                                </Animation>
                            )
                        })
                    )
                }
                <LoadMoreDataBtn state={podcasts} fetchDataFunc={getPodcasts}/>
                </div>
                <div>
                {
                    blogs===null ? <Loader /> : 
                    (
                        !blogs.results.length ? 
                        <NoBlogsDataMessage message={"No Blogs Published"}/>
                        :
                        (
                            <div className="flex flex-wrap gap-x-20 gap-y-5">
                                {
                                    blogs.results.map((blog,index)=>{
                            return(
                                <Animation transition={{duration:1,delay:index*0.1}}>
                                    <BlogPostCard content={blog} author={blog.author.personal_info}/>
                                </Animation>
                            )
                        })
                                }
                            </div>
                        )
                    
                    )
                }
                <LoadMoreDataBtn state={blogs} fetchDataFunc={getBlogs}/>
                </div>
                
                <AboutUser bio={bio} social_links={social_links} joinedAt={joinedAt}/>
            
            </InPageNavigation>
                    </div>
                </section>
                {selectedPodcast !== null && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed left-0 right-0 bottom-0 z-50 bg-cardOverlay backdrop-blur-md"
            >
              <ProfilePodcastPlayer
                selectedSong={selectedPodcast}
                songs={podcasts.results}
                setSelectedSongIndex={setSelectedPodcast}
               
              />
            </motion.div>
          )}
                
                </>
                :
                <PageNotFound />
            }
        </Animation>
    )
}

export default UserProfilePage
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import InPageNavigation from '../../common/InPageNavigation';
import FilterPaginationData from '../../common/FilterPaginationData';
import { UserContext } from '../../App';
import TrendingPodcard from '../Podcast/Podcast Home/TrendingPodcard';
import Animation from '../../common/Animation';
import NoDataMessage from '../../common/NoDataMessage';
import { SyncLoader } from 'react-spinners';
import { motion } from "framer-motion";
import ProfilePodcastPlayer from '../Podcast/Podcast Player/ProfilePodcastPlayer';
import BlogPostCard from '../Blogs/Blog Home/HomeBlogPostCard';
const UserLiked = () => {
    const [podcasts, setPodcasts] = useState(null);
    const [blogs,setBlogs] = useState(null);
    const [query, setQuery] = useState("");
    const { userAuth: { access_token } } = useContext(UserContext);
    const [selectedPodcast, setSelectedPodcast] = useState(null);

    const getPodcasts = async ({ page, deletedDocCount = 0 }) => {
        try {
            const { data } = await axios.post(process.env.REACT_APP_SERVER_DOMAIN + "/user-liked-podcasts", { page, query, deletedDocCount }, {
                headers: {
                    'Authorization': `Bearer ${access_token}`
                }
            });
            const formattedData = await FilterPaginationData({
                state: podcasts,
                data: data.podcasts,
                page,
                user: access_token,
                countRoute: "/user-uploaded-podcasts-count",
                data_to_send: { query }
            });
            console.log(formattedData);
            setPodcasts(formattedData);
        } catch (err) {
            console.log(err);
        }
    };
    const getBlogs = async ({ page, deletedDocCount = 0 }) => {
        try {
            const { data } = await axios.post(process.env.REACT_APP_SERVER_DOMAIN + "/user-liked-blogs", { page, query, deletedDocCount }, {
                headers: {
                    'Authorization': `Bearer ${access_token}`
                }
            });
            const formattedData = await FilterPaginationData({
                state:blogs,
                data:data.blogs,
                page,
                countRoute:"/search-blogs-count",
                // data_to_send:{tag:pageState}
                data_to_send: { query }
            });
            console.log(formattedData);
            setBlogs(formattedData);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        if (access_token && podcasts === null && blogs===null) {
            getPodcasts({ page: 1 });
            getBlogs({page:1})
        }
    }, [access_token, podcasts, blogs,query]);

    const handlePodcastClick = async(podcast) => {
        const headers = {
            Authorization: `Bearer ${access_token}`,
        };
        
        try {
            // Make an HTTP POST request to increment play count
            const response = await axios.post(
            `${process.env.REACT_APP_SERVER_DOMAIN}/api/pod/play-podcast`, 
                { podcastId: podcast._id }, // Pass the selected podcast's ID
                { headers: headers }
            );
        
            // Log success message or handle response as needed
            console.log('Play count incremented:', response.data);
        } catch (error) {
            // Handle errors
            console.error('Error incrementing play count:', error);
            // Display an error message to the user
            //toast.error('Failed to increment play count.');
        }
        console.log("Selected Podcast ID:", podcast._id);
        setSelectedPodcast(podcast);
    };

  return (
    <Animation>
        <div className="md:ml-56 mt-24 sm:ml-5">
        {/* <div className="relative sm:mt-5 md:mt-8 mb-10">
                <input type="search" className="w-full bg-grey p-4 pl-16 sm:pl-10 pr-6 rounded-full placeholder:text-dark-grey focus:bg-white" placeholder="Search Podcasts"
                />
                <i className="fi fi-rr-search absolute right-[10%] top-1/2 sm:-translate-y-1/2 md:top-4 md:pointer-events-none md:left-6 text-lg text-dark-grey"></i>
        </div>  */}

            <InPageNavigation userLiked={true} routes = {["Liked Podcasts","Liked Blogs"]}>
            {
                podcasts === null ? (
                    <div className="center">
                        <SyncLoader color="#f59a9a" margin={6} />
                    </div>
                ) : podcasts.results.length ?
                    <div className="flex flex-wrap">
                        {podcasts.results.map((podcast, i) => (
                            <Animation key={i} transition={{ delay: i * 0.04 }}>
                                <TrendingPodcard data={podcast} onClick={() => handlePodcastClick(podcast)} />
                            </Animation>
                        ))}
                    </div> :
                    <NoDataMessage message="No Liked Podcasts" />
                }
                
                        
                
                { //likedBlogs
                blogs === null ? (
                    <div className="center">
                        <SyncLoader color="#f59a9a" margin={6} />
                    </div>
                ) : blogs.results.length ?
                    <div className="flex flex-wrap gap-8 m-3">
                        {blogs.results.map((blog, i) => (
                            <Animation key={i} transition={{ delay: i * 0.04 }}>
                                <BlogPostCard content={blog} author={blog.author.personal_info} />
                            </Animation>
                        ))}
                    </div> :
                    <NoDataMessage message="No Liked Podcasts" />
                }
                
            </InPageNavigation>
        </div>
        {selectedPodcast && (
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

    </Animation>
    
)
}

export default UserLiked
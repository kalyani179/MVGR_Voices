import React, { useEffect, useState,useContext } from 'react';
import { useParams,useNavigate} from 'react-router-dom';
import axios from 'axios';
import Loader from '../common/Loader';
import PodCard from "../components/Podcast/Podcast Home/PodCard";
import LoadMoreDataBtn from '../common/LoadMoreDataBtn';
import UserCard from '../components/Blogs/Blog Page/UserCard';
import { SyncLoader } from 'react-spinners';
import ProfilePodcastPlayer from '../components/Podcast/Podcast Player/ProfilePodcastPlayer';
//import PodcastPlayer from '../components/Podcast/Podcast Player/PodcastPlayer';
import Animation from '../common/Animation';
import FilterPaginationData from '../common/FilterPaginationData';
import InPageNavigation from '../common/InPageNavigation';
import NoDataMessage from '../common/NoDataMessage';
import { SearchContext, UserContext } from "../App";
import { motion } from "framer-motion";
import { toast } from 'react-hot-toast';
const PodcastsSearchPage = () => {
    let { query } = useParams();
    const [podcasts, setPodcasts] = useState({ results: [] });
    const [users, setUsers] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedPodcast, setSelectedPodcast] = useState(null);
    const { userAuth } = useContext(UserContext);
    const { userAuth: { access_token } } = useContext(UserContext);
    const {searchBoxVisibility} = useContext(SearchContext);
    const [loading, setLoading] = useState(true); 
    let navigate = useNavigate();
    const searchPodcasts = ({ page = 1, create_new_arr = false }) => {

        axios.post(process.env.REACT_APP_SERVER_DOMAIN + "/api/pod/search-podcasts", {
                query,
                page,
                category: selectedCategory // Include selected category in the search
            })
            .then(async ({ data }) => {
                let formattedData = await FilterPaginationData({
                    state: podcasts,
                    data: data.podcasts,
                    page,
                    countRoute: "/api/pod/search-podcasts-count",
                    data_to_send: { query },
                    create_new_arr
                });
                setPodcasts(formattedData);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const fetchUsers = () => {
        axios.post(process.env.REACT_APP_SERVER_DOMAIN + "/search-users", { query })
            .then(({ data }) => {
                setUsers(data.users);
            });
    }

    useEffect(() => {
        resetState();
        searchPodcasts({ page: 1, create_new_arr: true });
        fetchUsers();
    }, [query]);

    const resetState = () => {
        setPodcasts({ results: [] }); // Clear previous search results
        setLoading(true);
        setUsers(null);
        setSelectedCategory(null); // Reset selected category
    }

    const handlePodcastSelect = (podcast) => {
        if (!userAuth || !userAuth.username) {
            navigate("/podcasts");
            toast.error('Please sign in to listen to the podcast!');
            return;
        }
        console.log("Selected Podcast:", podcast);
        setSelectedPodcast(podcast);
    }
    const UserCardWrapper = () => {
        return (
            <>
                {
                    users === null ? <Loader /> :
                        users.length ?
                            users.map((user, i) => (
                                <Animation key={i} transition={{ duration: 1, dealay: i * 0.08 }}>
                                    <UserCard user={user} />
                                </Animation>
                            )) : <NoDataMessage message={"No Users Found"} />
                }
            </>
        )
    }

    return (
        <section className="min-h-screen bg-cool-white flex justify-center gap-5">
            <div className={`w-full ${searchBoxVisibility?"sm:mt-14 duration-500" : "duration-500"}`}>
                <InPageNavigation
                    routes={[`search results for ${query}`, "Accounts Matched"]}
                    defaultHidden={["Accounts Matched"]}
                >
                    <>
                        {loading ? (
                            <div className="center">
                                <SyncLoader color="#f59a9a" margin={4} size={13} />
                            </div>
                        ) : (
                            !podcasts.results.length ? (
                                <NoDataMessage message={"No Podcasts Published"} />
                            ) : 
                            <div className="flex flex-wrap gap-x-20 gap-y-5">
                            {
                                podcasts.results.map((podcast, index) => (
                                    <Animation key={index} transition={{ duration: 1, delay: index * 0.1 }}>
                                        <PodCard data={podcast} onClick={() => handlePodcastSelect(podcast)} />
                                    </Animation>
                                ))
                            }
                            </div>
                        )}
                        {podcasts && <LoadMoreDataBtn state={podcasts} fetchDataFunc={searchPodcasts} />}
                    </>
                    <UserCardWrapper />
                </InPageNavigation>
            </div>
            <div className="min-w-[40%] lg:min-w-[350px] max-w-min border-l border-white pl-8 pt-3 sm:hidden">
                <h1 className="font-medium text-lg mb-8">User related to Search <i className="fi fi-rr-user mt-1"></i></h1>
                <UserCardWrapper />
            </div>
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
        </section>
    );
}

export default PodcastsSearchPage;

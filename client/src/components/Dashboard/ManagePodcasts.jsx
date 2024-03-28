import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import FilterPaginationData from '../../common/FilterPaginationData';
import { Toaster } from 'react-hot-toast';
import InPageNavigation from '../../common/InPageNavigation';
import Animation from '../../common/Animation';
import { ManagePublishedPodcastCard } from './ManagePodcastCard';
import { SyncLoader } from 'react-spinners';
import NoDataMessage from '../../common/NoDataMessage';
import { motion } from "framer-motion";
import ProfilePodcastPlayer from '../Podcast/Podcast Player/ProfilePodcastPlayer';

const ManagePodcasts = () => {
    const [podcasts, setPodcasts] = useState(null);
    const [query, setQuery] = useState("");
    const { userAuth: { access_token } } = useContext(UserContext);
    const [selectedPodcast, setSelectedPodcast] = useState(null);

    const getPodcasts = async ({ page, deletedDocCount = 0 }) => {
        try {
            const { data } = await axios.post(process.env.REACT_APP_SERVER_DOMAIN + "/user-uploaded-podcasts", { page, query, deletedDocCount }, {
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
            setPodcasts(formattedData);
        } catch (err) {
            console.log(err);
        }
    };

    const handleSearch = (e) => {
        let searchQuery = e.target.value;
        setQuery(searchQuery);
        if (e.keyCode === 13 && searchQuery.length) {
            setPodcasts(null);

        }
    }
    const handleChange = (e) => {
        if (!e.target.value.length) {
            setQuery("");
            setPodcasts(null);

        }
    }
    useEffect(() => {
        if (access_token) {
            if (podcasts === null) {
                getPodcasts({ page: 1 })
            }

        }
    }, [access_token, podcasts, query])

    const handlePodcastSelect = (podcast) => {
        console.log("Selected Podcast:", podcast);
        setSelectedPodcast(podcast);
    }
    

    return (
        <div className="md:ml-56 mt-24 sm:ml-5">
            <Toaster />
            <div className="relative sm:mt-5 md:mt-8 mb-10">
                <input type="search" className="w-full bg-grey p-4 pl-16 sm:pl-10 pr-6 rounded-full placeholder:text-dark-grey focus:bg-white" placeholder="Search Podcasts"
                    onChange={handleChange}
                    onKeyDown={handleSearch}
                />
                <i className="fi fi-rr-search absolute right-[10%] top-1/2 sm:-translate-y-1/2 md:top-4 md:pointer-events-none md:left-6 text-lg text-dark-grey"></i>
            </div>
            <InPageNavigation managePodcasts={true} routes={["Published Podcasts"]}>
                {podcasts === null ? (
                    <div className="center">
                        <SyncLoader color="#f59a9a" margin={6} />
                    </div>
                ) : podcasts.results.length ?
                    <>
                        {
                            podcasts.results.map((podcast, i) => {
                                return <Animation key={i} transition={{ delay: i * 0.04 }}>
                                    <ManagePublishedPodcastCard podcast={{ ...podcast, index: i, setStateFunc: setPodcasts }} onClick={() => handlePodcastSelect(podcast)} />
                                </Animation>
                            })
                        }
                    </> :
                    <NoDataMessage message="No Published Podcasts" />
                }
            </InPageNavigation>
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
        </div>
    )
}

export default ManagePodcasts;

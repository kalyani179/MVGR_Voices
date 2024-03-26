import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from '../common/Loader';
import PodCard from "../components/Podcast/PodCard";
import NoPodcastDataMessage from '../components/Podcast/NoPodcastDataMessage';
import LoadMoreDataBtn from '../common/LoadMoreDataBtn';
import UserCard from '../components/Blogs/UserCard';
import { SyncLoader } from 'react-spinners';

import Animation from '../common/Animation';
import FilterPaginationData from '../common/FilterPaginationData';
import InPageNavigation from '../components/Blogs/Blog Home/InPageNavigation';
const PodcastsSearchPage = () => {
    let { query } = useParams();
    const [podcasts, setPodcasts] = useState({ results: [] });
    const [users, setUsers] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);

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
        setUsers(null);
        setSelectedCategory(null); // Reset selected category
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
                            )) : <NoPodcastDataMessage message={"No Users Found"} />
                }
            </>
        )
    }

    return (
        <section className="h-cover flex justify-center gap-10">
            <div className="w-full">
                <InPageNavigation
                    routes={[`search results for ${query}`, "Accounts Matched"]}
                    defaultHidden={["Accounts Matched"]}
                >
                    <>
                        {podcasts === null ? (
                            <div className="center">
                                <SyncLoader color="#f59a9a" margin={4} size={13} />
                            </div>
                        ) : (
                            !podcasts.results.length ? (
                                <NoPodcastDataMessage message={"No Podcasts Published"} />
                            ) : (
                                podcasts.results.map((podcast, index) => (
                                    <Animation key={index} transition={{ duration: 1, delay: index * 0.1 }}>
                                        <PodCard data={podcast} />
                                    </Animation>
                                ))
                            )
                        )}
                        {podcasts && <LoadMoreDataBtn state={podcasts} fetchDataFunc={searchPodcasts} />}
                    </>
                    <UserCardWrapper />
                </InPageNavigation>
            </div>
            <div className="min-w-[40%] lg:min-w-[350px] max-w-min border-l border-grey pl-8 pt-3 sm:hidden">
                <h1 className="font-medium text-lg mb-8">User related to Search <i className="fi fi-rr-user mt-1"></i></h1>
                <UserCardWrapper />
            </div>
        </section>
    );
}

export default PodcastsSearchPage;

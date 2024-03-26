import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import FilterPaginationData from '../../common/FilterPaginationData';
import { Toaster } from 'react-hot-toast';
import InPageNavigation from '../Blogs/Blog Home/InPageNavigation';
import Animation from '../../common/Animation';
import { ManagePublishedPodcastCard } from './ManagePodcastCard';
import { SyncLoader } from 'react-spinners';
import NoDataMessage from '../../common/NoDataMessage';


const ManagePodcasts = () => {
    const [podcasts,setPodcasts] = useState(null);
    const [query, setQuery] = useState("");
    const { userAuth: { access_token } } = useContext(UserContext);

    
    const getPodcasts = async ({ page, deletedDocCount = 0 }) => {
        try {
            const { data } = await axios.post(process.env.REACT_APP_SERVER_DOMAIN + "/user-uploaded-podcasts", { page, query, deletedDocCount }, {
                headers: {
                    'Authorization': `Bearer ${access_token}`
                }
            });
            const formatedData = await FilterPaginationData({
                state: podcasts,
                data: data.podcasts,
                page,
                user: access_token,
                countRoute: "/user-uploaded-podcasts-count",
                data_to_send: { query }
            });
            setPodcasts(formatedData);
        } catch (err) {
            console.log(err);
        }
    };

    const handleSearch = (e) => {
        let searchQuery = e.target.value;
        setQuery(searchQuery);
        if(e.keyCode === 13 && searchQuery.length) {
            setPodcasts(null);
           
        }
    }
    const handleChange = (e) => {
        if(!e.target.value.length){
            setQuery("");
            setPodcasts(null);
          
        }
    }
    useEffect(()=>{
        if(access_token){
            if(podcasts===null){
                getPodcasts({page:1})
            }
            
        }
    },[access_token,podcasts,query])
    return (
        <div className="md:ml-56 mt-24 sm:ml-5">
            {/* <h1 className="sm:hidden text-primary text-xl text-center font-medium">Manage Blogs</h1> */}
            <Toaster />
            <div className="relative sm:mt-5 md:mt-8 mb-10">
                <input type="search" className="w-full bg-grey p-4 pl-16 sm:pl-10 pr-6 rounded-full placeholder:text-dark-grey focus:bg-white" placeholder="Search Podcasts"
                onChange={handleChange}
                onKeyDown={handleSearch}
                />
                <i className="fi fi-rr-search absolute right-[10%] top-1/2 sm:-translate-y-1/2 md:top-4 md:pointer-events-none md:left-6 text-lg text-dark-grey"></i>
            </div>
            <InPageNavigation routes={["Published Podcasts"]}>
                {podcasts === null ?(
                    <div className="center">
                        <SyncLoader color="#f59a9a" margin={4} />
                    </div>
                ) : podcasts.results.length ? 
                <>
                    {
                        podcasts.results.map((podcast,i)=>{
                            return <Animation key={i} transition={{delay:i*0.04}}>
                                <ManagePublishedPodcastCard podcast={{...podcast,index:i,setStateFunc:setPodcasts}}/>
                            </Animation>
                        })
                    }
                </> :
                <NoDataMessage message="No Published Podcasts"/>
                }
            </InPageNavigation>
        </div>
    )
}

export default ManagePodcasts
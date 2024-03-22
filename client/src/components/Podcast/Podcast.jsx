import React, { useState, useEffect, useContext } from "react";
import { getAllSongs,fetchTopPodcards } from './api';
import PodCard from './PodCard';
import { motion } from "framer-motion";
import PodcastPlayer from "./PodcastPlayer";
import { ThemeContext } from "../../App";
import { BeatLoader } from "react-spinners";
import Animation from "../../common/Animation";
import InPageNavigation from "./InPageNavigation";
import NoPodcastDataMessage from "./NoPodcastDataMessage";
//import TrendingBlogPostCard from "../Blogs/Blog Home/TrendingBlogPostCard";
import TrendingPodcard from "./TrendingPodcard";
import axios from 'axios';

const Podcast = () => {
  const [allSongs, setAllSongs] = useState([]);
  const [selectedSongIndex, setSelectedSongIndex] = useState(null);
  const [pageState, setPageState] = useState("home");
  const { theme } = useContext(ThemeContext);
  const [loading, setLoading] = useState(false); 
  //let [trendingBlogs, setTrendingBlog] = useState(null);
  const [trendingPodcards, setTrendingPodcards] = useState([]);

  useEffect(() => {
    // Fetch all songs
    getAllSongs().then((data) => {
      setAllSongs(data || []);
    });
    // Fetch top podcards  
      fetchTopPodcards().then((data)=>{
        setTrendingPodcards(data);
      });
  
  }, []);

  
  

  const handleSongClick = (songIndex) => {
    let songsInCategory = [];
    if (pageState !== "home") {
      songsInCategory = allSongs.filter(song => song.category.toLowerCase() === pageState);
    } else {
      songsInCategory = allSongs;
    }
  
    const selectedSongInCategory = songsInCategory[songIndex];
    const selectedSongIndexInAllSongs = allSongs.indexOf(selectedSongInCategory);
  
    setSelectedSongIndex(selectedSongIndexInAllSongs);
  };

  const loadPodcastByCategory = async (e) => {
    const category = e.target.innerText.toLowerCase();
    const newPageState = pageState === category ? "home" : category;
    setPageState(newPageState);
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      const data = await getAllSongs();
      setAllSongs(data ||[]);
    } catch (error) {
      console.error("Error fetching songs:", error);
    } finally {
      setLoading(false);
    }
  };

  let categories = [
    "Social Media",
    "Health",
    "Education",  
    "Motivation",
    "Crime",
    "Sports",
    "Development",
    "Comedy",
    "History"  
  ];

  // Filter songs based on the selected category
  const filteredSongs = allSongs.filter(song => pageState === "home" || song.category.toLowerCase() === pageState) ||[];

  return (
    <Animation>
      <section className="h-cover md:px-[4vw] flex flex-col justify-center gap-5 bg-cool-white">
            <div className="flex flex-col">
                <h1 className="font-medium text-xl text-primary mb-8 tracking-wide">
                  Trending <i className="fi fi-rr-arrow-trend-up text-primary"></i>
                </h1>
                <div className="flex justify-around">
                {trendingPodcards && trendingPodcards.length > 0 ? (
          trendingPodcards.map((podcard, index) => (
              <Animation transition={{ duration: 1, delay: index * 0.1 }} key={podcard._id}>
                  <TrendingPodcard data={podcard} index={index} />
              </Animation>
          ))
            ) : (
                <div className="center w-full p-5">
                    <NoPodcastDataMessage message={"No Trending Podcards Found"} />
                </div>
            )}

                </div>
              </div>
        <div className="">
          <h1 className="font-medium text-primary tracking-wide text-xl mb-8">
            Categories
          </h1>
          <div className="flex gap-3 flex-wrap">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={loadPodcastByCategory}
                className={`tag ${pageState === category.toLowerCase() ? 
                  (theme === "light" ? "bg-primary text-white font-medium" : "bg-primary text-darkBlack font-medium") : ""}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="w-full bg-cool-white">
          <InPageNavigation
            routes={[pageState,"trending blogs"]}
            defaultHidden={["trending blogs"]}
          >
            <div className=" ">
              {loading ? (
                <div className="center">
                  <BeatLoader color="#f59a9a" margin={4} />
                </div>
              ) : filteredSongs.length > 0 ? (
                <SongContainer
                  data={filteredSongs}
                  onSongClick={handleSongClick}
                  pageState={pageState}
                />
              ) : (
                <div className="center w-full p-5">
                  <NoPodcastDataMessage message={"No Podcasts Published"} />
                </div>
              )}
            </div>
          </InPageNavigation>
          {selectedSongIndex !== null && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed left-0 right-0 bottom-0 z-50 bg-cardOverlay backdrop-blur-md"
            >
              <PodcastPlayer
                selectedSong={allSongs[selectedSongIndex]}
                songs={allSongs}
                setSelectedSongIndex={setSelectedSongIndex}
                pageState={pageState}
              />
            </motion.div>
          )}
                          
        </div>
      </section>
    </Animation>
  );
};

export const SongContainer = ({ data, onSongClick, pageState }) => {
  return (
    <div className="w-full flex gap-8 justify-start items-center flex-wrap ">
      {data.map((song, i) => (
        <PodCard key={song._id} data={song} onClick={() => onSongClick(i)} />
      ))}
    </div>
  );
};


export default Podcast;

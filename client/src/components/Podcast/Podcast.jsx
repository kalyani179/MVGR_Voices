import React, { useState, useEffect, useContext } from "react";
import { getAllSongs } from './api';
import PodCard from './PodCard';
import { motion } from "framer-motion";
import PodcastPlayer from "./PodcastPlayer";
import { ThemeContext } from "../../App";

const Podcast = () => {
  const [allSongs, setAllSongs] = useState([]);
  const [selectedSongIndex, setSelectedSongIndex] = useState(null);
  const [pageState, setPageState] = useState("home");
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    getAllSongs().then((data) => {
      setAllSongs(data);
    });
  }, []);

  const handleSongClick = (songIndex) => {
    setSelectedSongIndex(songIndex);
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
    "History",
    "Science"
  ];

  const loadPodcastByCategory = (e) => {
    const category = e.target.innerText.toLowerCase();
    setPageState(category);
    const songsInCategory = allSongs.filter(song => song.category.toLowerCase() === category);
    if (songsInCategory.length > 0) {
      setSelectedSongIndex(allSongs.indexOf(songsInCategory[0]));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div>
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

      <div className="w-full max-w-screen-xl mx-auto px-4 py-8">
        <div className="relative my-4 p-4 border border-gray-300 rounded-md">
          <SongContainer
            data={allSongs}
            onSongClick={handleSongClick}
            pageState={pageState}
          />
        </div>

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
            />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export const SongContainer = ({ data, onSongClick, pageState }) => {
  return (
    <div className="w-full flex flex-wrap gap-3 items-center justify-start">
      {data &&
        data
          .filter(song => pageState === "home" || song.category.toLowerCase() === pageState)
          .map((song, i) => (
            <PodCard key={song._id} data={song} onClick={() => onSongClick(i)} />
          ))}
    </div>
  );
};

export default Podcast;

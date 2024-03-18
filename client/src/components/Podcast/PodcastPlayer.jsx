import React from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { IoMdClose } from "react-icons/io";

import { motion } from "framer-motion";

const PodcastPlayer = ({ selectedSong, songs, setSelectedSongIndex }) => {
  
  const nextTrack = () => {
    const nextIndex = (songs.indexOf(selectedSong) + 1) % songs.length;
    setSelectedSongIndex(nextIndex);
  };

  const previousTrack = () => {
    const prevIndex = (songs.indexOf(selectedSong) - 1 + songs.length) % songs.length;
    setSelectedSongIndex(prevIndex);
  };
  const closeMusicPlayer = () => {
    setSelectedSongIndex(null); 
  };


  return (
    <div className="w-full flex items-center justify-between gap-3 overflow-hidden">
      <div className="w-full relative flex items-center gap-3 p-4">
        <img src={selectedSong.imageURL} alt={selectedSong.name} className="w-40 h-20 rounded-md object-cover" />
        <div className="flex items-start flex-col">
          <p className="text-xl text-headingColor font-semibold">{selectedSong.name}</p>
          <p className="text-textColor">{selectedSong.description}</p>
        </div>
        <div className="flex-1">
          <AudioPlayer
            src={selectedSong.songURL}
            autoPlay={true}
            showSkipControls={true}
            onClickNext={nextTrack}
            onClickPrevious={previousTrack}
          />
        </div>
        <div className="h-full flex items-center justify-center flex-col gap-3">
          <motion.i whileTap={{ scale: 0.8 }} onClick={closeMusicPlayer}>
            <IoMdClose className="text-textColor hover:text-headingColor text-2xl cursor-pointer" />
          </motion.i>
         </div> 
      </div>
    </div>
  );
};

export default PodcastPlayer;

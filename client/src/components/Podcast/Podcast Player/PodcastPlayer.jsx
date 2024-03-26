// PodcastPlayer.js
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { IoMdClose } from 'react-icons/io';
import { motion } from 'framer-motion';
import { UserContext } from '../../../App';
import { toast } from 'react-hot-toast';

const PodcastPlayer = ({ selectedSong, songs, setSelectedSongIndex, pageState }) => {
  const { userAuth } = useContext(UserContext);
  const [likesCount, setLikesCount] = useState(selectedSong?.activity?.total_likes || 0);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const fetchLikedState = async () => {
      try {
        if (userAuth && userAuth.access_token && selectedSong && selectedSong.activity) {
          const response = await axios.post(process.env.REACT_APP_SERVER_DOMAIN + '/api/pod/is-podcast-liked', { _id: selectedSong._id }, {
            headers: {
              Authorization: `Bearer ${userAuth.access_token}`
            }
          });
          setIsLiked(response.data.isLiked);
          setLikesCount(response.data.likesCount);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchLikedState();
  }, [userAuth, selectedSong]);

  const handleLikeClick = async () => {
    if (!userAuth || !userAuth.access_token) {
      toast.error('Please SignIn to like the podcast!');
      return;
    }

    try {
      const newIsLiked = !isLiked;
      const response = await axios.post(process.env.REACT_APP_SERVER_DOMAIN + '/api/pod/like-podcast', { _id: selectedSong._id, isLiked: newIsLiked }, {
        headers: {
          Authorization: `Bearer ${userAuth.access_token}`
        }
      });
      setIsLiked(newIsLiked);
      setLikesCount(response.data?.podcast?.activity?.total_likes || 0);
    } catch (error) {
      console.error(error);
    }
  };

  const nextTrack = () => {
    let songsInCategory = [];
    if (pageState !== 'home') {
      songsInCategory = songs.filter(song => song.category.toLowerCase() === pageState);
    } else {
      songsInCategory = songs;
    }

    const selectedIndexInCategory = songsInCategory.indexOf(selectedSong);
    const nextIndexInCategory = (selectedIndexInCategory + 1) % songsInCategory.length;
    const nextSong = songsInCategory[nextIndexInCategory];
    setSelectedSongIndex(songs.indexOf(nextSong));
  };

  const previousTrack = () => {
    let songsInCategory = [];
    if (pageState !== 'home') {
      songsInCategory = songs.filter(song => song.category.toLowerCase() === pageState);
    } else {
      songsInCategory = songs;
    }

    const selectedIndexInCategory = songsInCategory.indexOf(selectedSong);
    const prevIndexInCategory = (selectedIndexInCategory - 1 + songsInCategory.length) % songsInCategory.length;
    const prevSong = songsInCategory[prevIndexInCategory];
    setSelectedSongIndex(songs.indexOf(prevSong));
  };

  const closeMusicPlayer = () => {
    setSelectedSongIndex(null); 
  };

  return (
    <div className="w-full flex items-center justify-between gap-3 overflow-hidden bg-white">
      <div className="w-full relative flex items-center gap-3 p-4">
        {selectedSong && (
          <>
            <img src={selectedSong.imageURL} alt={selectedSong.name} className="w-40 h-20 rounded-md object-cover" />
            <div className="flex items-start flex-col">
              <p className="text-xl text-headingColor font-semibold">{selectedSong.name}</p>
              <div className="flex items-center gap-1">
                <button onClick={handleLikeClick} className={`w-10 h-10 rounded-full flex items-center justify-center ${isLiked ? 'bg-red/20 text-red' : 'bg-grey/80'}`}>
                  <i className={`fi ${isLiked ? 'fi-sr-heart text-red' : 'fi-rr-heart'}`}></i>  
                </button>
                <p className="tex-xl text-dark-grey">{likesCount}</p>
              </div>
            </div>
          </>
        )}
        <div className="flex-1">
          <AudioPlayer
            src={selectedSong?.songURL}
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

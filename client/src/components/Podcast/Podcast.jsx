import React from 'react'
import { useEffect ,useState} from 'react';
import { getAllSongs } from './api';
import PodCard from './PodCard';
const Podcast = () => {
  const [allSongs, setAllSongs] = useState([]);
  useEffect(() => {
   
      getAllSongs().then((data) => {
       
        //console.log(data);
        setAllSongs(data);
        
      });
    
  }, []);
  return (
    <div className="flex items-center justify-center h-screen">
        <div className='relative w-3/4 h-3/4 my-4 p-4 border border-gray-300 rounded-md'>
          <SongContainer data={allSongs} />
        </div>
    </div>
  )
};

export const SongContainer = ({ data }) => {
  return (
    <div className=" w-full  flex flex-wrap gap-3  items-center justify-evenly">
      {data &&
        data.map((song, i) => (
          <PodCard key={song._id}  data={song} index={i} />
        ))}
    </div>
  );
};

export default Podcast

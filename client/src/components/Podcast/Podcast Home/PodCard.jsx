import React from 'react';
//import { motion } from "framer-motion";
import { getDate, getFullDate } from '../../../common/Date';
const PodCard = ({ data, onClick }) => {
  return (
    /*<motion.div className="relative w-40 min-w-210 px-2 py-4 cursor-pointer hover:shadow-xl 
        hover:bg-card bg-gray-100 shadow-md rounded-lg flex flex-col items-center" onClick={onClick}>
      <div className='w-40 min-w-[160px] h-40 min-h-[160px] rounded-lg drop-shadow-lg relative overflow-hidden' style={{ padding: '15px' }}>
        <motion.img whileHover={{ scale: 1.05 }} src={data.imageURL} className='w-full h-full rounded-lg object-cover'></motion.img>
      </div>

      <p className='text-base text-headingColor font-semibold my-2'>
        {data.name.length > 25 ? `${data.name.slice(0, 25)}..` : data.name}
        
      </p>
      
      <p className='text-textColor '>
        {data.description.length > 25 ? `${data.description.slice(0, 25)}..` : data.description}
        
      </p>
    </motion.div>*/
    <div className="bg-white shadow flex gap-8 items-center border-b border-grey pb-5 mb-4 hover:transform hover:shadow-2xl hover:shadow-black/50 transition duration-300 ease-in-out">
 <div className="aspect-square w-72 h-[350px] bg-white cursor-pointer " onClick={onClick}>
    <img className="aspect-square w-72 h-56 object-center object-cover" src={data.imageURL} alt={data.name} />
    <div className="py-5 p-4 bg-white">
      <div className="flex justify-between">
        <p className="text-dark-grey/90 font-gelasion">{getFullDate(data.publishedAt)}</p>
        <span className="flex items-center gap-2 text-dark-grey">
          <i className="fi fi-rr-heart text-md"></i>
          <p className="tex-xl text-dark-grey">{data.activity.total_likes}</p>
        </span>
      </div>
      <h1 className="blog-title mt-4">{data.name}</h1>
    </div>
  </div>
    </div>
   
  );
};

export default PodCard;

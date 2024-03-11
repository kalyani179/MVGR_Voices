import React from 'react'
import { motion } from "framer-motion";
const PodCard = ({ data, index }) => {
    return (
        <motion.div className="relative w-40 min-w-210 px-2 py-4 cursor-pointer hover:shadow-xl 
        hover:bg-card bg-gray-100 shadow-md rounded-lg flex flex-col items-center">
         <div className='w-40 min-w-[160px] h-40 min-h-[160px] rounded-lg drop-shadow-lg relative overflow-hidden' style={{ padding: '15px' }}>
    <motion.img whileHover={{ scale: 1.05 }} src={data.imageURL} className='w-full h-full rounded-lg object-cover'></motion.img>
</div>


<p className='text-base text-headingColor font-semibold my-2'>
  {data.name.length>25?`${data.name.slice(0,25)}..`:data.name}
          <span>{data.description}</span></p>

        </motion.div>
      );
    };

export default PodCard

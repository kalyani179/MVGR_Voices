// In PodCard.js

import React from 'react';
import { Link } from 'react-router-dom';
import { getFullDate } from '../../../common/Date';
const PodCard = ({ data, onClick }) => {
  const {
    name,
    imageURL,
    publishedAt,
    activity: { total_likes,total_plays },
    author: { personal_info: { profile_img, username } }
  } = data;

  return (
    <div className="bg-white shadow flex gap-8 items-center border-b border-grey pb-5 mb-4 hover:transform hover:shadow-2xl hover:shadow-black/50 transition duration-300 ease-in-out">
      <div className="aspect-square w-72 h-[350px] bg-white cursor-pointer " onClick={onClick}>
        <img className="aspect-square w-72 h-56 object-center object-cover" src={imageURL} alt={name} />
        <div className="py-5 p-4 bg-white">
        {/* <div className='flex gap-1 mb-3'>
            <img src={profile_img} className='w-6 h-6 flex-none rounded-full' alt="User Profile" />
           
              <h1>
                <Link to={`/user/${username}`} className='mx-1 text-black underline'>@{username}</Link>
              </h1>
              <p> {total_plays.toLocaleString()} Plays </p>
            s
          </div> */}
          <div className="flex justify-between">
   
          <p className="text-dark-grey/90 font-gelasion">{getFullDate(publishedAt)}</p>
            <span className="flex items-center gap-2 text-dark-grey">
              <i className="fi fi-rr-heart text-md"></i>
              <p className="tex-xl text-dark-grey">{total_likes}</p>
            </span>
          </div>
          <h1 className="blog-title mt-4">{name}</h1>
         
        </div>
      </div>
    </div>
  );
};

export default PodCard;

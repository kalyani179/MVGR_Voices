import React, { useState } from 'react';
import { getFullDate } from '../../../common/Date';

const PodCard = ({ data, onClick }) => {
  const {
    name,
    imageURL,
    publishedAt,
    activity: { total_likes },
  } = data;

  const [isHovered, setIsHovered] = useState(false);
  const [playButtonHovered, setPlayButtonHovered] = useState(false);

  return (
    <div
      className={`bg-white shadow flex gap-8 items-center border-b border-grey pb-5 mb-4 hover:transform hover:shadow-2xl hover:shadow-black/50 transition duration-300 ease-in-out relative`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setPlayButtonHovered(false);
      }}
    >
      {isHovered && (
        <button
          className={`absolute top-1/2 right-4 transform -translate-y-1/2 rounded-full w-10 h-10 flex items-center justify-center focus:outline-none ${
            playButtonHovered ? 'bg-primary' : 'bg-black/40'
          }`}
          onMouseEnter={() => setPlayButtonHovered(true)}
          onMouseLeave={() => setPlayButtonHovered(false)}
          onClick={onClick}
        >
          <i class="fi fi-ss-play text-white mt-1"></i>
        </button>
      )}
      <div className="aspect-square w-72 h-[350px] bg-white cursor-pointer" >
        <img className={`${isHovered ? 'bg-black/5' : 'bg-white'} aspect-square w-72 h-56 object-center object-cover`} src={imageURL} alt={name} />
        <div className="py-5 p-4 bg-white">
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
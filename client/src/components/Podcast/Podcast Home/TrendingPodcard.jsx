import React from 'react'
//import { Link } from 'react-router-dom';
import { getDate, getFullDate } from '../../../common/Date';

const TrendingPodcard = ({ data ,index,onClick }) => {

    return (
        <div className="flex gap-5 mb-8 cursor-pointer" onClick={() => onClick(data)} >
            <h1 className="blog-index text-primary/30">{index<10 ? (index+1) : index}</h1>
            <div className="aspect-square w-72 h-[370px] bg-white shadow hover:transform hover:shadow-2xl hover:shadow-black/50 transition duration-300 ease-in-out">
            <img className="aspect-square w-72 h-56 object-center object-cover" src={data.imageURL} alt="" />
            <div className="py-5 p-4 bg-white">
                <div className="flex justify-between">
                    <p className="text-dark-grey/90 font-gelasion">{getFullDate(data.publishedAt)}</p>
                    <span className="flex items-center gap-2 text-dark-grey">
                                <i className="fi fi-rr-heart text-md"></i>
                                <p className="tex-xl text-dark-grey">{data.activity.total_likes}</p>
                    </span>
                </div>
                    
                    <h1 className="blog-title mt-4">{data.name}</h1>
                    {/* <p className="my-3 text-lg font-gelasio leading-7 sm:hidden md:max-[1100px]:hidden line-clamp-2">{desc}</p> */}
                </div>
            </div>
       </div>
            
       
    )
}

export default TrendingPodcard
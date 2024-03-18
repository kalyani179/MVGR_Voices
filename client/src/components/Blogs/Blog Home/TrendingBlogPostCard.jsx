import React from 'react'
import { Link } from 'react-router-dom';
import { getDate, getFullDate } from '../../../common/Date';

const TrendingBlogPostCard = ({blog,index}) => {
    let {title,blog_id:id,banner,activity:{total_likes},author:{personal_info : {fullname,username,profile_img}},publishedAt} = blog;
    return (
        <Link to={`/blog/${id}`} className="flex gap-5 mb-8">
            <h1 className="blog-index text-primary/30">{index<10 ? (index+1) : index}</h1>
            <div className="aspect-square w-72 h-[370px] bg-white shadow-xl">
            <img className="aspect-square w-72 h-56 object-center object-cover" src={banner} alt="Blog Banner" />
            <div className="py-5 p-4 bg-white">
                <div className="flex justify-between">
                    <p className="text-dark-grey/90 font-gelasion">{getFullDate(publishedAt)}</p>
                    <span className="flex items-center gap-2 text-dark-grey">
                                <i className="fi fi-rr-heart text-md"></i>
                                <p className='-mt-1'>{total_likes}</p>
                    </span>
                </div>
                    
                    <h1 className="blog-title mt-4">{title}</h1>
                    {/* <p className="my-3 text-lg font-gelasio leading-7 sm:hidden md:max-[1100px]:hidden line-clamp-2">{desc}</p> */}
                </div>
            </div>
        </Link>
    )
}

export default TrendingBlogPostCard
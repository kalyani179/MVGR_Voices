import React from 'react'
import { Link } from 'react-router-dom';
import { getDate } from '../../common/Date';

const TrendingBlogPostCard = ({blog,index}) => {
    let {title,blog_id:id,author:{personal_info : {fullname,username,profile_img}},publishedAt} = blog;
    return (
        <Link to={`/blog/${id}`} className="flex gap-5 mb-8">
            <h1 className="blog-index">{index<10 ? "0"+(index+1) : index}</h1>

            <div>
                <div className="flex items-center gap-2 mb-7">
                    <img className="w-6 h-6 rounded-full" src={profile_img} alt="profile" />
                    <p className="line-clamp-1">{fullname} @{username}</p>
                    <p className="min-w-fit">{getDate(publishedAt)}</p>
                </div>
                <h1 className="blog-title">{title}</h1>
            </div>
        </Link>
    )
}

export default TrendingBlogPostCard
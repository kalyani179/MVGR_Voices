import React from 'react'
import { getDate } from '../../common/Date';
import { Link } from 'react-router-dom';

const BlogPostCard = ({content,author}) => {
    let {publishedAt,tags,title,desc,banner,activity:{total_likes},blog_id:id} = content;
    let {fullname,username,profile_img} = author;
    return (
        <Link to={`/blog/${id}`} className="flex gap-8 items-center border-b border-grey pb-5 mb-4">
        <div className="w-full">
            <div className="flex items-center gap-2 mb-7">
                <img className="w-6 h-6 rounded-full" src={profile_img} alt="profile" />
                <p className="line-clamp-1">{fullname} @{username}</p>
                <p className="min-w-fit">{getDate(publishedAt)}</p>
            </div>
            <h1 className="blog-title">{title}</h1>
            <p className="my-3 text-lg font-gelasio leading-7 sm:hidden md:max-[1100px]:hidden line-clamp-2">{desc}</p>

            <div className="flex gap-4 mt-7">
                <span className="btn-purple bg-dark-grey bg-opacity-20 text-black py-1 px-4">{tags[0]}</span>
                <span className="flex items-center gap-2 text-dark-grey">
                        <i className="fi fi-rr-heart text-md"></i>
                        <p>{total_likes}</p>
                </span>
            </div>
        </div>
        <div className="h-28 aspect-square bg-grey">
            <img className="w-full h-full aspect-square object-cover" src={banner} alt="Blog Banner" />
        </div>
        </Link>
    )
}

export default BlogPostCard
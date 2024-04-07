import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import {getFullDate } from '../../../common/Date';
import { UserContext } from '../../../App';
import toast from 'react-hot-toast';

const TrendingBlogPostCard = ({blog,index}) => {
    let navigate = useNavigate();
    let {userAuth:{access_token}} = useContext(UserContext);
    let {title,blog_id:id,banner,activity:{total_likes},author:{personal_info : {fullname,username,profile_img}},publishedAt} = blog;
    const handleClick = () => {
        console.log(!access_token)
        if(!access_token){
            return toast.error("Please sign in to see the blog!", {style: {
                border:"1px solid #e86f6f",
                fontSize: "17px"
                }});
        }
        else navigate(`/blog/${id}`);
    }
    return (
        <button onClick={handleClick} className="flex gap-5 mb-8">
            <h1 className="blog-index text-primary/30">{index<10 ? (index+1) : index}</h1>
            <div className="aspect-square w-72 h-[370px] bg-white shadow hover:transform hover:shadow-2xl hover:shadow-black/50 transition duration-300 ease-in-out">
            <img className="aspect-square w-72 h-56 object-center object-cover" src={banner} alt="Blog Banner" />
            <div className="py-5 p-4 bg-white">
                <div className="flex justify-between">
                    <p className="text-dark-grey/90 font-gelasion">{getFullDate(publishedAt)}</p>
                    <span className="flex items-center gap-2 text-dark-grey">
                                <i className="fi fi-rr-heart text-md"></i>
                                <p className='-mt-1'>{total_likes}</p>
                    </span>
                </div>
                    
                    <h1 className="blog-title text-start mt-4">{title}</h1>
                    {/* <p className="my-3 text-lg font-gelasio leading-7 sm:hidden md:max-[1100px]:hidden line-clamp-2">{desc}</p> */}
                </div>
            </div>
        </button>
    )
}

export default TrendingBlogPostCard
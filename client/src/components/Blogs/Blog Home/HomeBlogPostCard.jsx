import React, { useContext } from 'react'
import {useNavigate} from "react-router-dom"
import { getFullDate } from '../../../common/Date';

import { UserContext } from '../../../App';
import toast from 'react-hot-toast';


const BlogPostCard = ({content,author}) => {
    let navigate = useNavigate();
    let {userAuth:{access_token}} = useContext(UserContext);
    let {publishedAt,tags,title,desc,banner,activity:{total_likes},blog_id:id} = content;
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
            <button onClick={handleClick} className="bg-white shadow flex gap-8 items-center border-b border-grey pb-5 mb-4 hover:transform hover:shadow-2xl hover:shadow-black/50 transition duration-300 ease-in-out">
                <div className="aspect-square w-72 h-[350px] bg-white">
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

export default BlogPostCard
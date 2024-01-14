import React from 'react';
import { useNavigate } from 'react-router-dom';



const BlogsNavbar = () => {
    let navigate = useNavigate();
    const handleSearch = (e) => {
        let query = e.target.value;
        if(e.keyCode === 13){
            navigate(`/search/${query}`)
        }
    }
    return (
        <div>
            <div>
                <input 
                    type='text'
                    placeholder='search'
                    className='w-full md:w-auto bg-grey p-4 pl-6 pr-[12%] md:pr-6 rounded-full'
                    onKeyDown={handleSearch}
                />
            </div>
        </div>
    )
}

export default BlogsNavbar
import React, { useState,useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../../App';
import UserNavigationPanel from './UserNavigationPanel';

const BlogsNavbar = () => {
    const {userAuth:{profile_img}} = useContext(UserContext);
    const [searchBoxVisibility,setSearchBoxVisibility] = useState(false);
    const [userNavPanel,setUserNavPanel] = useState(false);
    let navigate = useNavigate();
    const handleSearch = (e) => {
        let query = e.target.value;
        if(e.keyCode === 13){
            navigate(`/search/${query}`)
        }
    }
    return (
        <nav className="navbar border-b border-grey bg-white">
            {/* logo */}
            {/* <Link to="/" className="flex-none w-10">
                <img src={} alt="logo" />
            </Link> */} 
            {/* Search Box */}
            <div className={`absolute bg-white w-full left-0 top-full mt-0.5 border-b border-grey py-4 px-[5vw] md:border-0 block md:relative md:inset-0 md:p-0 md:w-auto md:show ${searchBoxVisibility ? "show" : "hide"}`}>
                <input 
                    type='text'
                    placeholder='Search'
                    className='w-full md:w-auto bg-grey p-3 pl-6 pr-[12%] md:pr-6 rounded-full md:pl-12'
                    onKeyDown={handleSearch}
                />
                <i className="fi fi-rr-search absolute right-[10%] top-1/2 sm:-translate-y-1/2 md:top-3 md:pointer-events-none md:left-5 text-lg text-dark-grey"></i>
            </div>

            <div className="flex items-center ml-auto gap-3 md:gap-6">
                <button className="md:hidden bg-grey rounded-full w-10 h-10 center"
                onClick={()=>setSearchBoxVisibility(!searchBoxVisibility)}
                >
                    <i className="fi fi-rr-search text-lg"></i>
                </button>
                {/* To Write blogs */}
                <Link to="/editor" className="md:flex gap-2 link pl-3 px-3 py-2 hidden">
                    <i className="fi fi-rr-file-edit"></i>
                    <p>write</p>
                </Link>
                {/* notification button */}
                <Link to="/dashboard/notification">
                    <button className="bg-grey rounded-full w-10 h-10 hover:bg-black/10 relative">
                        <i className="fi fi-rr-bell text-lg block mt-1"></i>
                    </button>
                </Link>

                {/* profile image */}
                <div className="relative" onClick={()=>setUserNavPanel(!userNavPanel)} onBlur={()=>{setTimeout(()=>setUserNavPanel(false),200)}}>
                    <button className="w-10 h-10 mt-1">
                        <img className="w-full h-full object-cover rounded-full" src={profile_img} alt="profile"/>
                    </button>
                    {
                        userNavPanel ? <UserNavigationPanel /> : ""
                    }
                    
                </div>
            </div>
        </nav>
    )
}

export default BlogsNavbar
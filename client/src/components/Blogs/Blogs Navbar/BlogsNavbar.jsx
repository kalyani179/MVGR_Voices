import React, { useState,useContext } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { UserContext } from '../../../App';
import UserNavigationPanel from './UserNavigationPanel';
import { ThemeContext } from '../../../App';
import { storeInSession } from '../../../common/session';

const BlogsNavbar = () => {
    const {userAuth:{profile_img}} = useContext(UserContext);
    const [searchBoxVisibility,setSearchBoxVisibility] = useState(false);
    const [userNavPanel,setUserNavPanel] = useState(false);
    let {theme,setTheme} = useContext(ThemeContext);
    let navigate = useNavigate();
    const handleSearch = (e) => {
        let query = e.target.value;
        if(e.keyCode === 13){
            navigate(`/search/${query}`)
        }
    }
    const changeTheme = () => {
        let newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        document.body.setAttribute("data-theme",newTheme);
        storeInSession("theme",newTheme);
    }
    return (
        <>
        <nav className={`navbar z-50 pr-[3vw] border-b border-grey ${searchBoxVisibility?"sm:mb-12 duration-500":"sm:duration-500"}`}>
            {/* logo */}
            {/* <Link to="/" className="flex-none w-10">
                <img src={} alt="logo" />
            </Link> */} 
            {/* Search Box */}
            <div>
                <h1 className="font-bold opacity-25 text-dark-grey font-gelasio tracking-wider text-4xl">BLOGS</h1>
            </div>

        
        <div className="flex items-center ml-auto gap-3 md:gap-6">
            <div className={`absolute left-0 w-full top-16 mt-0.5  px-[5vw] py-4 pb-1 border-b border-grey duration-500 md:-m-6 md:ml-2  md:border-0 md:block md:relative md:inset-0 md:p-0 md:w-auto md:show ${searchBoxVisibility ? "show" : "hide"}`}>
                <input 
                    type='text'
                    placeholder='Search'
                    className='w-full md:w-auto bg-grey p-3 pl-6 pr-[12%] md:pr-6 rounded-full md:pl-12'
                    onKeyDown={handleSearch}
                />
                <i className="fi fi-rr-search absolute right-[10%] top-1/2 sm:-translate-y-2 md:top-3 md:pointer-events-none md:left-5 text-lg text-dark-grey"></i>
            </div>
                <Link>
                    <button className="md:hidden bg-grey rounded-full w-11 h-11 center"
                    onClick={()=>setSearchBoxVisibility(!searchBoxVisibility)}
                    >
                        <i className="fi fi-rr-search block text-lg mt-1"></i>
                    </button>
                </Link>


                {/* To Write blogs */}
                <Link to="/editor" className="md:flex gap-2 link pl-3 px-3 py-2 hidden">
                    <i className="fi fi-rr-file-edit"></i>
                    <p>write</p>
                </Link>
                {/* Theme Change */}
                <Link>
                <button onClick={changeTheme} className="bg-grey rounded-full w-11 h-11 hover:bg-black/10 relative">
                        <i className={`fi fi-rr-${theme === "light" ? "moon-stars" :"brightness"} text-xl block mt-1`}></i>
                </button>
                </Link>
                {/* notification button */}
                <Link to="/dashboard/notification">
                    <button className="bg-grey rounded-full w-11 h-11 hover:bg-black/10 relative">
                        <i className="fi fi-rr-bell text-xl block mt-1"></i>
                    </button>
                </Link>

                {/* profile image */}
                <div className="relative" onClick={()=>setUserNavPanel(!userNavPanel)} onBlur={()=>{setTimeout(()=>setUserNavPanel(false),200)}}>
                    <button className="w-11 h-11 mt-1">
                        <img className="w-full h-full object-cover rounded-full" src={profile_img} alt="profile"/>
                    </button>
                    {
                        userNavPanel ? <UserNavigationPanel /> : ""
                    }
                    
                </div>
            </div>
        </nav>
        <Outlet />
        </>
    )
}

export default BlogsNavbar
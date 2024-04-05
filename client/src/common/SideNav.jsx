import React, { useContext, useEffect, useRef, useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { ThemeContext, UserContext } from '../App'
import Navbar from '../components/Home/Navbar/Navbar';


const SideNav = () => {
    let {userAuth:{access_token}} = useContext(UserContext);
    let navigate = useNavigate();
    let page = window.location.pathname.split("/")[2];
    const [pageState,setPageState] = useState(page.replace("-"," "));
    let [showSideNav,setShowSideNav] = useState(false);
    // let {theme,setTheme} = useContext(ThemeContext);
    let activeLineTab = useRef();
    let sideBarIconTab = useRef();
    let pageStateTab = useRef();
    const changePageState = (e) => {
        let {offsetWidth,offsetLeft} = e.target ;
        activeLineTab.current.style.width = offsetWidth + "px";
        activeLineTab.current.style.left = offsetLeft + "px";
        if(e.target === sideBarIconTab.current){
            setShowSideNav(true);
        }else{
            setShowSideNav(false);
        }
    }
    useEffect(()=>{
        setShowSideNav(false);
        if(pageStateTab.current)
        pageStateTab.current.click();
    },[pageState]);
    return (
        !access_token ? 

        navigate("/")
        
        :
        <>
            <div className={`bg-white fixed w-full border-b-2 border-grey z-50`}>
                <Navbar home={0} activeLink="profile" />
            </div>
            <section className="realtive px-[6vw] flex gap-10 py-0 m-0 -ml-10 sm:flex-col">
                <div className="realtive sm:sticky sm:z-40 sm:top-[80px]">
                    <div className="md:hidden bg-white w-screen border-b-2 border-grey flex flex-nowrap overflow-x-hidden">
                        <button ref={sideBarIconTab} onClick={changePageState} className="p-5">
                            <i className="fi fi-rr-bars-staggered pointer-events-none"></i>
                        </button>
                        <button ref={pageStateTab} onClick={changePageState} className="p-5 capitalize">
                            {pageState}
                        </button>
                        <hr ref={activeLineTab} className="border-b border-primary absolute bottom-0 duration-500"/>
                    </div>
                    <div className={`sidenav min-w-[200px] h-[calc(100vh-80px)] sm:h-[calc(100vh-80px-60px)] sm:absolute md:fixed top-20 overflow-y-auto p-6 md:pr-0 md:border-r md:border-grey sm:top-[64px] sm:w-[calc(100%+80px)] sm:px-16 sm:-ml-7 ${showSideNav ? "opacity-100 pointer-events-auto" : "sm:opacity-0 sm:pointer-events-none"}`}>
                    {/* Dashboard */}
                    <div className="flex gap-4 mb-3">
                            <i class="fi fi-sr-book text-dark-grey/60 mt-0.5"></i>
                            <h1 className="text-dark-grey">Dashboard</h1>
                    </div>
                        <hr className="border border-grey -ml-6 mb-4 mr-1" />
                        <NavLink to="/dashboard/podcasts" onClick={(e) => setPageState(e.target.innerText)} className="sidebar-link">
                        <i className="fa fa-podcast sidebar-icon"></i>
                            Podcasts
                        </NavLink>
                    
                        <NavLink to="/upload" onClick={(e) => setPageState(e.target.innerText)} className="sidebar-link">
                        <i className="fi fi-rr-upload sidebar-icon"></i>
                            Upload
                        </NavLink>
                        <NavLink to="/dashboard/blogs" onClick={(e) => setPageState(e.target.innerText)} className="sidebar-link">
                            <i className="fi fi-rr-document sidebar-icon"></i>
                            Blogs
                        </NavLink>
                        
                        <NavLink to="/editor" onClick={(e) => setPageState(e.target.innerText)} className="sidebar-link">
                            <i className="fi fi-rr-file-edit sidebar-icon"></i>
                            Write
                        </NavLink>

                        <NavLink to="/dashboard/notifications" onClick={(e) => setPageState(e.target.innerText)} className="sidebar-link">
                            <i className="fi fi-rr-bell sidebar-icon"></i>
                            Notifications
                        </NavLink>

                    {/* settings */}
                        <div className="flex gap-4 mt-8 mb-3">
                            <i class="fi fi-ss-settings text-dark-grey/60 mt-0.5"></i>
                            <h1 className="text-dark-grey">Settings</h1>
                        </div>
                        
                        <hr className="border border-grey -ml-6 mb-4 mr-1" />
                        <NavLink to="/settings/edit-profile" onClick={(e) => setPageState(e.target.innerText)} className="sidebar-link">
                            <i className="fi fi-rr-user sidebar-icon"></i>
                            Edit Profile
                        </NavLink>
                        <NavLink to="/settings/change-password" onClick={(e) => setPageState(e.target.innerText)} className="sidebar-link">
                            <i className="fi fi-rr-lock sidebar-icon"></i>
                            Change Password
                        </NavLink>
                    </div>
                </div>
                <div className={`sm:-mt-8 mt-5 w-full ${showSideNav ?"opacity-0":"opacity-100"}`}>
                    <Outlet />
                </div>
            </section>
        </>
    )
}

export default SideNav;
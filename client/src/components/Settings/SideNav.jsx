import React, { useContext, useEffect, useRef, useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { UserContext } from '../../App'


const SideNav = () => {
    let {userAuth:{access_token}} = useContext(UserContext);
    let navigate = useNavigate();
    let page = window.location.pathname.split("/")[2];
    const [pageState,setPageState] = useState(page.replace("-"," "));
    let [showSideNav,setShowSideNav] = useState(false);
    let activeTabLine = useRef();
    let sideBarIconTab = useRef();
    let pageStateTab = useRef();
    const changePageState = (e) => {
        let {offsetWidth,offsetLeft} = e.target ;
        activeTabLine.current.style.width = offsetWidth + "px";
        activeTabLine.current.style.left = offsetLeft + "px";
        if(e.target === sideBarIconTab.current){
            setShowSideNav(true);
        }else{
            setShowSideNav(false);
        }
    }
    useEffect(()=>{
        setShowSideNav(false);
        if(pageState.current)
        pageStateTab.current.click();
    },[pageState]);
    return (
        !access_token ? 

        navigate("/")
        
        :
        <>
            <section className="relative flex gap-10 py-0 m-0 sm:flex-col">
                <div className="sticky top-[80px] z-30">
                    <div className="md:hidden bg-white py-1 border-b border-grey flex flex-nowrap overflow-x-auto">
                        <button ref={sideBarIconTab} className="p-5 capitalize" onClick={changePageState}>
                            <i className="fi fi-rr-bars-staggered pointer-events-none"></i>
                        </button>
                        <button ref={pageStateTab} className="p-5 capitalize" onClick={changePageState}>
                            {pageState}
                        </button>
                        <hr ref={activeTabLine} className="absolute bottom-0 duration-100"/>
                    </div>
                    <div className={`min-w-[200px] sm:h-[calc(100vh-80px-60px)] md:h-cover md:sticky top-24 overflow-y-auto p-6 md:pr-0 md:border-grey md:border-r absolute sm:top-[64px] bg-white sm:w-[calc(100%+80px)] sm:px-16 sm:-ml-7 duration-500 ${!showSideNav ? "sm:opacity-0 sm:pointer-events-none" : "opacity-100 pointer-events-auto"}`}>
                    {/* Dashboard */}
                        <h1 className="text-dark-grey mb-3">Dashboard</h1>
                        <hr className="border-grey -ml-6 mb-4 mr-6" />
                        <NavLink to="/dashboard/blogs" onClick={(e) => setPageState(e.target.innerText)} className="sidebar-link">
                            <i className="fi fi-rr-document"></i>
                            Blogs
                        </NavLink>
                        <NavLink to="/dashboard/notification" onClick={(e) => setPageState(e.target.innerText)} className="sidebar-link">
                            <i className="fi fi-rr-bell"></i>
                            Notifications
                        </NavLink>
                        <NavLink to="/editor" onClick={(e) => setPageState(e.target.innerText)} className="sidebar-link">
                            <i className="fi fi-rr-file-edit"></i>
                            Write
                        </NavLink>

                    {/* settings */}
                        <h1 className="text-dark-grey mt-8 mb-3">Settings</h1>
                        <hr className="border-grey -ml-6 mb-4 mr-6" />
                        <NavLink to="/settings/edit-profile" onClick={(e) => setPageState(e.target.innerText)} className="sidebar-link">
                            <i className="fi fi-rr-user"></i>
                            Edit Profile
                        </NavLink>
                        <NavLink to="/settings/change-password" onClick={(e) => setPageState(e.target.innerText)} className="sidebar-link">
                            <i className="fi fi-rr-lock"></i>
                            Change Password
                        </NavLink>
                    </div>
                </div>
                <div className="sm:-mt-8 mt-5 w-full">
                    <Outlet />
                </div>
            </section>
        </>
    )
}

export default SideNav
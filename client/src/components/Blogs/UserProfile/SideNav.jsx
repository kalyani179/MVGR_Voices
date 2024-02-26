import React, { useContext, useState } from 'react'
import { NavLink, Navigate, Outlet } from 'react-router-dom'
import { UserContext } from '../../../App'
import {toast} from 'react-hot-toast'

const SideNav = () => {
    let {userAuth:{access_token}} = useContext(UserContext);
    const [pageState,setPageState] = useState()
    return (
        !access_token ? <>
            <Navigate to="/" /> 
            {toast.error("Please Signin to access the settings!")}
        </>
        :
        <>
            <section className="relative flex gap-10 py-0 m-0 sm:flex-col">
                <div className="sticky top-[80px] z-30">
                    <div className="md:hidden bg-white py-1 border-b border-grey flex flex-nowrap overflow-x-auto">
                        <button className="p-5 capitalize">
                            <i className="fi fi-rr-bars-staggered pointer-events-none"></i>
                        </button>
                        <button className="p-5 capitalize">
                            {pageState}
                        </button>
                        <hr className="absolute bottom-0 duration-500"/>
                    </div>
                    <div className="min-w-[200px] h-cover md:sticky top-24 overflow-y-auto p-6 md:pr-0 md:border-grey md:border-r absolute sm:top-[64px] bg-white sm:w-[calc(100%+80px)] sm:px-16 sm:-ml-7 duration-500">
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
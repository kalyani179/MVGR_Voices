import React from 'react';
import { Outlet } from 'react-router-dom';

import Navbar from '../../Home/Navbar/Navbar';


const BlogsNavbar = () => {

    return (
        <>
            <div className="border-b border-grey">
                <Navbar home={0} activeLink="Blogs" />
            </div>
            <Outlet />
        </>
    )
}

export default BlogsNavbar
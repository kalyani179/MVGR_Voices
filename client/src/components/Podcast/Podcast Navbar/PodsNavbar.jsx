import React from 'react';
import { Outlet } from 'react-router-dom';

import Navbar from '../../Home/Navbar/Navbar';

const PodsNavbar = () => {
    
    
    
    return (
        <>
            <div className="border-b border-grey">
                <Navbar home={0} activeLink="Podcasts" />
            </div>
            <Outlet />
        </>
    )
}

export default PodsNavbar
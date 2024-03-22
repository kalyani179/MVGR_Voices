import React, { useState,useContext } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { UserContext } from '../../../App';
import UserNavigationPanel from '../../Home/Navbar/UserNavigationPanel';
import { ThemeContext } from '../../../App';
import { storeInSession } from '../../../common/session';
import Navbar from '../../Home/Navbar/Navbar';

const PodsNavbar = () => {
    const {userAuth:{profile_img}} = useContext(UserContext);
    const [searchBoxVisibility,setSearchBoxVisibility] = useState(false);
    const [userNavPanel,setUserNavPanel] = useState(false);
    let {theme,setTheme} = useContext(ThemeContext);
    let navigate = useNavigate();
    const handleSearch = (e) => {
        let query = e.target.value;
        if (e.keyCode === 13) {
            navigate(`/podcast/search/${query}`); // Change the route for search
        }
    }
    
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
import React, { useContext } from 'react'
import Animation from '../../../common/Animation'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../../App'
import { removeFromSession } from '../../../common/session'

const UserNavigationPanel = () => {
    let {userAuth:{username},setUserAuth} = useContext(UserContext);
    let navigate = useNavigate();

    const signOutUser = () => {
        removeFromSession("user");
        setUserAuth({access_token:null});
        navigate("/");
    }

    return (
        <Animation transition={{duration:0}}
        className="absoulte right-0 z-50">
            <div className="bg-white z-50 absolute -right-8 border-t-4 border-primary w-48 duration-200 shadow-xl">
                <Link to="/editor" className="flex gap-2 link md:hidden">
                    <i className="fi fi-rr-file-edit"></i>
                    <p>write</p>
                </Link>
                <Link to={`/user/${username}`} className="link">
                    <i class="fi fi-rs-user"></i>
                    Profile
                </Link>
                <Link to="/dashboard/blogs" className="link">
                    <i class="fi fi-sr-book"></i>
                    Dashboard
                </Link>
                <Link to="/settings/edit-profile" className="link">
                    <i class="fi fi-ss-settings"></i>
                    Settings
                </Link>
                
                <button className="hover:bg-grey w-full link" onClick={signOutUser}>
                    <i class="fi fi-ss-sign-out-alt"></i>
                    Sign Out
                </button>
            </div>
        </Animation>
    )
}

export default UserNavigationPanel
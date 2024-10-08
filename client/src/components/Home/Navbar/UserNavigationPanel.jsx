import React, { useContext } from 'react'
import Animation from '../../../common/Animation'
import { Link } from 'react-router-dom'
import { UserContext } from '../../../App'
import { removeFromSession } from '../../../common/session'
import toast from 'react-hot-toast'

const UserNavigationPanel = () => {
    let {userAuth:{username},setUserAuth} = useContext(UserContext);

    const signOutUser = () => {
        let loadingToast = toast.loading("Signing Out...");
        setTimeout(()=>{
            toast.dismiss(loadingToast);
            toast.success("Signed Out Successfully..!");
            removeFromSession("user");
            setUserAuth({access_token:null});
        },500);
    }

    return (
        <Animation transition={{duration:0}}
        className="absoulte right-0 z-50">
            <div className="bg-white opacity-100 absolute z-50 -right-8 border-t-4 border-primary w-48 duration-100 shadow-2xl">
                {/* <Link to="/editor" className="link md:hidden">
                    <i className="fi fi-rr-file-edit"></i>
                    <p>write</p>
                </Link>
                <Link to="/upload" className="link md:hidden">
                    <i className="fi fi-rr-file-edit"></i>
                    <p>Upload</p>
                </Link> */}
                <Link to={`/user/${username}`} className="link">
                    <i class="fi fi-rs-user"></i>
                    Profile
                </Link>
                <Link to="/dashboard/podcasts" className="link">
                    <i class="fi fi-sr-book"></i>
                    Dashboard
                </Link>
                <Link to="/settings/edit-profile" className="link">
                    <i class="fi fi-ss-settings"></i>
                    Settings
                </Link>
                
                <button className="hover:bg-primary/20 w-full link" onClick={signOutUser}>
                    <i class="fi fi-ss-sign-out-alt"></i>
                    Sign Out
                </button>
            </div>
        </Animation>
    )
}

export default UserNavigationPanel
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../App'
import axios from 'axios';
import { profileDataStructure } from '../../pages/UserProfilePage';
import Animation from '../../common/Animation';
import Loader from '../../common/Loader';
import {toast,Toaster} from "react-hot-toast";

const EditProfile = () => {
    let {userAuth,userAuth:{access_token}} = useContext(UserContext);
    const [profile,setProfile] = useState(profileDataStructure);
    const [loading,setLoading] = useState(true);
    let {personal_info:{fullname,username:profile_username,profile_img,email,bio},social_links} = profile;
    useEffect(()=>{
        if(access_token){
            axios.post(process.env.REACT_APP_SERVER_DOMAIN+"/get-profile",{username:userAuth.username})
            .then(({data})=>{
                setProfile(data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
            })
        }
    },[access_token])
    return (
        <Animation>
            {
                loading ? 
                <Loader />
                :
                <form className="flex flex-col justify-center items-center">
                    <Toaster />
                    <h1 className="sm:hidden text-primary text-xl font-medium ">Edit Profile</h1>
                    <div className="flex flex-col items-start py-10 gap-8 lg:gap-10">
                        <div className="sm:center mb-5">
                            <label htmlFor="uploadImg" id="profileImg" className="relative block w-48 h-48 bg-grey rounded-full overflow-hidden">
                            <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center text-white bg-black/30 opacity-0 hover:opacity-100 cursor-pointer">
                                Upload Image
                            </div>
                            <img src={profile_img} alt="profile" />
                            </label>
                            <input type="file" id="uploadImg" accept=".jpg .jpeg .png" hidden/>
                            <button className="btn-purple mt-5 lg:w-full px-5">Upload</button>
                        </div>
                        <div className="w-full">
                            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-5">
                                
                            </div>
                        </div>
                    </div>
                </form>
            }
        </Animation>
    )
}

export default EditProfile
import React, { useContext, useEffect, useRef, useState } from 'react'
import { UserContext } from '../../App'
import axios from 'axios';
import { profileDataStructure } from '../../pages/UserProfilePage';
import Animation from '../../common/Animation';
import Loader from '../../common/Loader';
import {toast,Toaster} from "react-hot-toast";

import Marquee from "react-fast-marquee";

import { storage} from "../../common/firebase";
import { getStorage,ref,getDownloadURL,uploadBytesResumable,deleteObject } from "firebase/storage";
import { storeInSession } from '../../common/session';
import InputBox from '../../common/InputBox';

const EditProfile = () => {
    let bioLimit = 150;
    let profileImgEle = useRef();
    let editProfileForm = useRef();
    let {userAuth,userAuth:{access_token},setUserAuth} = useContext(UserContext);
    const [profile,setProfile] = useState(profileDataStructure);
    const [loading,setLoading] = useState(true);
    const [charactersLeft,setCharactersLeft] = useState(bioLimit);
    const [updatedProfileImg,setUpdatedProfileImg] = useState(null);
    let {personal_info:{fullname,username:profile_username,profile_img,email,bio},social_links} = profile;
    const handleCharacterChange = (e) => {
        setCharactersLeft(bioLimit - e.target.value.length)
    }
    const handleImagePreview = (e) => {
        let img = e.target.files[0];
        console.log(img);
        profileImgEle.current.src = URL.createObjectURL(img);
        setUpdatedProfileImg(img);
        console.log(updatedProfileImg);
    }
    const handleImageUpload = (e) => {
        e.preventDefault();
        console.log(updatedProfileImg);
        if(updatedProfileImg){
            let loadingToast = toast.loading("Uploading...");
            e.target.setAttribute("disabled",true);
            const storageRef = ref(storage,`User_Profile_Images/${Date.now()}-${updatedProfileImg.name}`);
            const uploadTask = uploadBytesResumable(storageRef,updatedProfileImg);
            uploadTask.on("state_changed",(snapshot)=>{
            },(error)=>{
                toast.dismiss(loadingToast);
                e.target.removeAttribute("disabled");
                toast.error(error);
                console.log(error);
            },()=>{
                getDownloadURL(uploadTask.snapshot.ref).then(async (url)=>{
                console.log(url);
                if(url){
                    await axios.post(process.env.REACT_APP_SERVER_DOMAIN+"/update-profile-img",{url},{
                        headers:{
                            'Authorization' : `Bearer ${access_token}`
                        }
                    }).then(({data})=>{
                        let newUserAuth = {...userAuth,profile_img:data.profile_img};
                        storeInSession("user",JSON.stringify(newUserAuth));
                        setUserAuth(newUserAuth);

                        setUpdatedProfileImg(null);

                        toast.dismiss(loadingToast);
                        e.target.removeAttribute("disabled");
                        toast.success("Image Uploaded!");
                    })
                    .catch(({response})=>{
                        toast.dismiss(loadingToast);
                        e.target.removeAttribute("disabled");
                        toast.error(response.data.error);
                    })
                }
            
            })
            })

        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        let form = new FormData(editProfileForm.current);
        let formData = {};
        for(let[key,value] of form.entries()){
            formData[key] = value;
        }
        let {username,bio,youtube,facebook,twitter,github,instagram,website} = formData;
        if (username.includes(' ')) {
            return toast.error("Username should not contain spaces!");
        }
        if(username.length < 3){
            return toast.error("Username should be atleast 3 letters long!");
        }
        if(bio.length>bioLimit){
            return toast.error("Bio should not be more than 150 characters long!");
        }
        let loadingToast = toast.loading("Updating...");
        e.target.setAttribute("disabled",true);

        axios.post(process.env.REACT_APP_SERVER_DOMAIN+"/update-profile",{
            username,bio,
            social_links:{youtube,facebook,twitter,github,instagram,website}
        },{
            headers:{
                'Authorization' : `Bearer ${access_token}`
            }

        }).then(({data})=>{
            if(userAuth.username !== data.username){
                let newUserAuth = {...userAuth,username:data.username};
                storeInSession("user",JSON.stringify(newUserAuth));
                setUserAuth(newUserAuth);
            }
            toast.dismiss(loadingToast);
            e.target.removeAttribute("disabled");
            toast.success("Profile Updated Successfully!")
        })
        .catch(({response})=>{
            toast.dismiss(loadingToast);
            e.target.removeAttribute("disabled");
            toast.error(response.data.error);
        })
    }
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
                <form ref={editProfileForm} className="flex flex-col justify-center items-center md:ml-48 mt-16">
                    <Toaster />
    
                    <Marquee speed={"40"} direction="right" pauseOnClick>
                        <div className="mt-2">
                            <h1 className="text-lg tracking-wide font text-primary font-inter">Note : You cannot change your Full name and Email ID !</h1>
                        </div>
                    </Marquee>

                    {/* <h1 className="sm:hidden text-primary text-xl font-medium ">Edit Profile</h1> */}
                    <div className="flex flex-col items-start py-10 sm:center sm:w-full gap-8 lg:flex-row lg:gap-20">
    
                        <div className="sm:center flex-col gap-5 mb-5">
                            <label htmlFor="uploadImg" id="profileImg" className="relative block w-48 h-48 bg-grey rounded-full overflow-hidden">
                            <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center text-white bg-black/30 opacity-0 hover:opacity-100 cursor-pointer">
                                Upload Image
                            </div>
                            <img ref={profileImgEle} src={profile_img} alt="profile" />
                            </label>
                            <input type="file" id="uploadImg" accept=".png, .jpg, .jpeg" hidden onChange={handleImagePreview}/>
                            <button onClick={handleImageUpload} className="btn-purple lg:w-full md:my-5 px-5">Upload</button>
                        </div>
                        <div className="w-full sm:px-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-5">
                                <InputBox type="text" name="fullname" placeholder="Full Name" value={fullname} icon="fi-rr-user" disable={true}/>
                                <InputBox type="text" name="email" placeholder="Email" value={email} icon="fi-rr-envelope" disable={true} />
                            </div>
                            <div className="mb-8">
                                <InputBox type="text" name="username" placeholder="Username" value={profile_username} icon="fi-rr-at" disable={false}/>
                            </div>
                            <div className="mb-5">
                                <textarea
                                name="bio"
                                placeholder="Type Your Bio Here..."
                                maxLength={bioLimit}
                                defaultValue={bio}
                                className="input-box bg-white border-2 border-input h-64 lg:h-40 resize-none leading-7 pl-5 placeholder:text-dark-grey focus:outline-none focus:border-primary"
                                onChange={handleCharacterChange}
                                ></textarea>
                                <p className="text-right text-dark-grey">{charactersLeft} characters left</p>
                            </div>
                            <div className="md:grid md:grid-cols-2 gap-x-6">
                            {
                                Object.keys(social_links).map((key,i)=>{
                                    let link = social_links[key];
                                    return (
                                        <div>
                                        <InputBox type="text" key={i} value={link} name={key} placeholder="https://" icon={`key ${key!=="webiste" ?"fi-brands-"+key : "fi-rr-globe"}`}/>
                                        </div>
                                    )
                                })
                            }
                            </div>
                            <div className="flex items-center justify-center">
                                <button onClick={handleSubmit} className="btn-purple px-10" type="submit">Update</button>
                            </div>
                            
                        </div>
                    </div>
                </form>
            }
        </Animation>
    )
}

export default EditProfile
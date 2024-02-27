import React, { useContext, useState } from 'react'
import Animation from '../../common/Animation';
import {toast,Toaster} from "react-hot-toast";
import axios from 'axios';
import { UserContext } from '../../App';

const ChangePassword = () => {
    let {userAuth:{access_token}} = useContext(UserContext);
    const [currentPasswordVisible,setCurrentPasswordVisible] = useState(false);
    const [newPasswordVisible,setNewPasswordVisible] = useState(false);

    const [isCurrentPasswordFocused,setCurrentPasswordFocused] = useState(false);
    const [isNewPasswordFocused,setNewPasswordFocused] = useState(false);

    const translateCurrentPassword = () => {
        setCurrentPasswordFocused(!isCurrentPasswordFocused);
    }
    const translateNewPassowrd = () => {
        setNewPasswordFocused(!isNewPasswordFocused);
    }

    const [inputCurrentPassword,setInputCurrentPassword] = useState('');
    const [inputNewPassword,setInputNewPassword] = useState('');
    const [data,setData] = useState({currentPassword : "",newPassword:""})

    const handleChange = (e) => {
        const {name,value} = e.target;
        if(name === "currentPassword"){
            setInputCurrentPassword(value);
        }
        if(name === "newPassword"){
            setInputNewPassword(value);
        }
        setData({...data,[e.target.name]:e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let formData = data;
        if(!formData.currentPassword.length || !formData.newPassword.length){
            return toast.error("Please Fill All The Inputs!")
        }
        e.target.setAttribute("disabled",true);
        let loadingToast = toast.loading("Updating...");
        axios.post(process.env.REACT_APP_SERVER_DOMAIN+"/change-password",formData,
            {
                headers:{
                    'Authorization':`Bearer ${access_token}`
                }
            })
        .then(()=>{
            toast.dismiss(loadingToast);
            e.target.removeAttribute("disabled");
            return toast.success("Password Updated Successfully!");
        })
        .catch(({response})=> {
            toast.dismiss(loadingToast);
            e.target.removeAttribute("disabled");
            return toast.error(response.data.error);
        })
    }

    return (
        <Animation>
        <Toaster />
        <form className="h-cover flex flex-col gap-5 items-center justify-center">
            <h1 className="sm:hidden text-xl font-medium text-primary">Change Password</h1>
            <div className="py-10 w-full md:max-w-[400px] flex flex-col justify-center items-center">
                <div className='flex justify-start items-center'>
                    <i className={`fi fi-rr-lock absolute ${isCurrentPasswordFocused || inputCurrentPassword ? 'text-primary' : ''}`}></i>
                    <input onFocus={translateCurrentPassword} onBlur={()=>setCurrentPasswordFocused(false)} onChange={handleChange} className="auth-input" type={`${currentPasswordVisible ? "text" : "password"}`} name="currentPassword" value={inputCurrentPassword} placeholder="Current Password"/>
                    <i onClick={()=>setCurrentPasswordVisible(!currentPasswordVisible)} className={`fi fi-rr-eye${currentPasswordVisible ? "" : "-crossed"}  ${isCurrentPasswordFocused || inputCurrentPassword ? 'text-primary' : ''} absolute ml-72 `}></i>
                </div>
                <div className='flex justify-start items-center'>
                    <i className={`fi fi-rr-unlock absolute ${isNewPasswordFocused || inputNewPassword ? 'text-primary' : '' }`}></i>
                    <input onFocus={translateNewPassowrd} onBlur={()=>setNewPasswordFocused(false)} onChange={handleChange} className="auth-input" type={`${newPasswordVisible ? "text" : "password"}`} name="newPassword" value={inputNewPassword} placeholder="New Password"/>
                    <i onClick={()=>setNewPasswordVisible(!newPasswordVisible)} className={`fi fi-rr-eye${newPasswordVisible ? "" : "-crossed"} ${isNewPasswordFocused || inputNewPassword ? 'text-primary' : '' } absolute ml-72`}></i>
                </div>
                <div>
                    <button onClick={handleSubmit} type="submit" className="btn-purple mt-10 font-medium w-68 rounded-md">{"Change Password"}</button>
                </div>
            </div>
            
        </form>
        </Animation>
    
    )
}

export default ChangePassword
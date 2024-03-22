import axios from 'axios';
import React, { useContext, useState, useEffect } from 'react'
import toast,{Toaster} from "react-hot-toast";
import { Link, useNavigate, useParams } from 'react-router-dom';


const ResetPassword = () => {
    let navigate = useNavigate();
    const {id,token} = useParams();

    /* To Translate the h5,change colors when clicked on the input */

    const [inputPasswordValue, setInputPasswordValue] = useState('');
    const [isPasswordFocused,setPasswordTranslated] = useState(false);

    const [passwordVisible,setPasswordVisible] = useState(false);

    const translatePassword = () =>{
        setPasswordTranslated(!isPasswordFocused);
    }


    const handleChange = (e) =>{
        const {name,value} = e.target;
    
        if(name === "password"){
            setInputPasswordValue(value);
        }
        
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        e.target.setAttribute("disabled",true);
        console.log(inputPasswordValue);
        axios.post(process.env.REACT_APP_SERVER_DOMAIN+`/reset-password/${id}/${token}`,{password:inputPasswordValue})
        .then((data)=>{
            toast.success("Password Updated succesfully!");
            let loadingToast = toast.loading("Redirecting to home page...")
            setTimeout(()=>{
                navigate("/");
            },2000)
            toast.dismiss(loadingToast);

        }).catch(err=>{
            console.log(err);
            return toast.error("There is some error! please try again!");
        })
        e.target.removeAttribute("disabled");
    }

    return (
        <>
        <Toaster />
            <div className={`fixed inset-0 z-50 bg-black center`}>
                {/* SignUp Heading */}
                <div className={`bg-white relative p-8 pb-4 rounded-md z-50  opacity-90`} onClick={(e) => e.stopPropagation()}>
        
                    <div className="center">
                        <h1 className={`text-center mb-5 heading`}>Reset Password</h1>
                    </div>

                    {/* Form */}
                    <div className="m-3">
                        <form className="h-cover flex flex-col gap-5 items-center justify-center">
                    
                        <div className="flex justify-start items-center">
                                <i className={`fas fa-lock input-icon ${isPasswordFocused || inputPasswordValue ? 'text-primary' : ''}`}></i>
                                <h5  className={`${isPasswordFocused || inputPasswordValue ? '-translate-y-7 text-primary font-medium' : 'translate-y-0'}`}>New Password</h5>
                                <input onClick={translatePassword} onBlur={()=>setPasswordTranslated(false)} onChange={handleChange} className={`auth-input ${isPasswordFocused || inputPasswordValue ? "border-b-primary" : ""}`} type={`${passwordVisible ? "text" : "password"}`} name="password" value={inputPasswordValue}/>
                                <i onClick={()=>setPasswordVisible(!passwordVisible)} className={`fi fi-rr-eye${passwordVisible ? "" : "-crossed"} absolute right-11`}></i>
                        </div>
                        
                            <button onClick={handleSubmit} type="submit" className="btn-purple font-medium w-80 rounded-md">Update Password</button>
                        </form>
                    </div>
                
                </div>
            </div>
        </>
    )
}

export default ResetPassword;
import axios from 'axios';
import React, { useState } from 'react'
import toast,{Toaster} from "react-hot-toast";
import Fade from "react-reveal/Fade";
import GoogleAuth from './GoogleAuth';

const UserAuth = ({type,close,open}) => {

    /* To Translate the h5,change colors when clicked on the input */
    
    const [isNameFocused, setNameTranslated] = useState(false);
    const [isEmailFocused,setEmailTranslated] = useState(false);
    const [isPasswordFocused,setPasswordTranslated] = useState(false);

    const translateName = () => {
        setNameTranslated(!isNameFocused);
    };

    const translateEmail = () =>{
        setEmailTranslated(!isEmailFocused);
    }

    const translatePassword = () =>{
        setPasswordTranslated(!isPasswordFocused);
    }

    const [inputNameValue, setInputNameValue] = useState('');
    const [inputEmailValue, setInputEmailValue] = useState('');
    const [inputPasswordValue, setInputPasswordValue] = useState('');

    const [passwordVisible,setPasswordVisible] = useState(false);

    const [data,setData] = useState({fullname:"",email:"",password:""});

    const handleChange = (e) =>{
        const {name,value} = e.target;
        if(name === "fullname"){
            setInputNameValue(value);
        }
        if(name === "email"){
            setInputEmailValue(value);
        }
        if(name === "password"){
            setInputPasswordValue(value);
        }
        setData({...data,[e.target.name]:e.target.value});
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        axios.post("http://localhost:3000/"+type,data)
        .then(({data})=>{console.log(data);
            if(data.status) return toast.success(data.status);
            setData({fullname:"",email:"",password:""}); })
        .catch(({response})=>{
            return toast.error(response.data.error);
        })
    }
    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 center">
            <Fade top duration={1000}>
            <div>

                {/* SignUp Heading */}
                <div className="bg-white relative p-8 pb-4 rounded-md">
                    <button onClick={close}><i className="fi fi-bs-cross-small text-lg text-dark-grey absolute top-3.5 right-4"></i></button>
                    <div className="center">
                        <h1 className="text-center mb-5">{type==="signup" ? "Sign Up" : "Sign In"}</h1>
                    </div>

                    {/* Form */}
                    <div className="m-3">
                        <form className="h-cover flex flex-col gap-5 items-center justify-center">
                            {
                                type === "signup" ?
                                <div className="flex justify-start items-center">
                                    <i className={`fas fa-user input-icon ${isNameFocused || inputNameValue ? 'text-purple' : ''}`}></i>
                                    <h5 className={`${isNameFocused || inputNameValue ? '-translate-y-7 text-purple font-medium' : 'translate-y-0'}`}>Full Name</h5>
                                    <input onFocus={translateName} onBlur={()=>setNameTranslated(false)} onChange={handleChange} className={`${isNameFocused || inputNameValue ? "border-b-purple" : ""}`} type="text" name="fullname" />
                                </div> : ""
                            }
                            <div className="flex justify-start items-center">
                                <i class={`fas fa-envelope input-icon ${isEmailFocused || inputEmailValue ? 'text-purple' : ''}`}></i>
                                <h5  className={`${isEmailFocused || inputEmailValue ? '-translate-y-7 text-purple font-medium' : 'translate-y-0'}`}>Email</h5>
                                <input onClick={translateEmail} onBlur={()=>setEmailTranslated(false)} onChange={handleChange} className={`${isEmailFocused || inputEmailValue ? "border-b-purple" : ""}`} type="email" name="email" />
                            </div>
                            <div className="flex justify-start items-center">
                                <i className={`fas fa-lock input-icon ${isPasswordFocused || inputPasswordValue ? 'text-purple' : ''}`}></i>
                                <h5  className={`${isPasswordFocused || inputPasswordValue ? '-translate-y-7 text-purple font-medium' : 'translate-y-0'}`}>Password</h5>
                                <input onClick={translatePassword} onBlur={()=>setPasswordTranslated(false)} onChange={handleChange} className={`${isPasswordFocused || inputPasswordValue ? "border-b-purple" : ""}`} type={`${passwordVisible ? "text" : "password"}`} name="password" />
                                <i onClick={()=>setPasswordVisible(!passwordVisible)} className={`fi fi-rr-eye${passwordVisible ? "" : "-crossed"} absolute right-11`}></i>
                            </div>
                            <button onClick={handleSubmit} type="submit" className="btn-purple font-medium w-80 rounded-md">{type==="signup" ? "Create Account" : "Sign In"}</button>
                        </form>
                    </div>

                    {/* signin option */}
                    <div className="m-3">
                    {
                        type==="signup"
                        ? <p>Already have an account? <button onClick={open} className="text-purple underline">Sign In Here</button> </p>
                        : <p>Don't have an account ? <button onClick={open} className="text-purple underline">Sign Up</button></p>
                    }
                    </div>

                    {/* OR */}
                    <div className="m-3 my-4 font-inter center space-x-3">
                        <div className="w-[50%] border border-dark-grey"></div>
                        <p className="font-gelasio text-dark-grey">OR</p>
                        <div className="w-[50%] border border-dark-grey"></div>
                    </div>

                    {/* continue with google button */}
                    <GoogleAuth />
                
                </div>
                </div>
                </Fade>
            </div>
            <Toaster/>
        </>
    )
}

export default UserAuth
import axios from 'axios';
import React, { useState } from 'react'
import toast,{Toaster} from "react-hot-toast";
import Fade from "react-reveal/Fade";
import GoogleAuth from '../../../common/GoogleAuth';


const Signin = ({closeSignin}) => {

    /* To Translate the h5,change colors when clicked on the input */

    const [isEmailFocused,setEmailTranslated] = useState(false);
    const [isPasswordFocused,setPasswordTranslated] = useState(false);


    const translateEmail = () =>{
        setEmailTranslated(!isEmailFocused);
    }

    const translatePassword = () =>{
        setPasswordTranslated(!isPasswordFocused);
    }

    const [inputEmailValue, setInputEmailValue] = useState('');
    const [inputPasswordValue, setInputPasswordValue] = useState('');

    const [passwordVisible,setPasswordVisible] = useState(false);

    const [data,setData] = useState({fullname:"",email:"",password:""});

    const handleChange = (e) =>{
        const {name,value} = e.target;

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
        axios.post("http://localhost:3000/signin",data)
        .then(({data})=>{console.log(data);
            if(data.status) return toast.success(data.status);
            setData({fullname:"",email:"",password:""}); })
        .catch(({response})=>{
            return toast.error(response.data.error);
        })
    }
    
    return (
        <>
            <Toaster />
            <div className="fixed inset-0 bg-black bg-opacity-50 center">
            <Fade top duration={1000}>
            <div className="bg-grey px-0 py-3">

                <button onClick={closeSignin}><i className="fi fi-bs-cross-small text-lg text-dark-grey absolute top-3.5 right-4"></i></button>
                
                {/* SignIn Heading */}
                <div className="bg-white relative p-8 pt-5 pb-0 rounded-md">
                    <div className="center">
                        <h1 className="text-center m-3">Sign In</h1>
                    </div>

                    {/* Form */}
                    <div className="m-3">
                        <form className="h-cover flex flex-col gap-5 items-center justify-center">
    
                            <div className="flex justify-start items-center">
                                <i class={`fas fa-envelope input-icon ${isEmailFocused || inputEmailValue ? 'text-purple' : ''}`}></i>
                                <h5  className={`${isEmailFocused || inputEmailValue ? '-translate-y-8 text-purple font-medium' : 'translate-y-0'}`}>Email</h5>
                                <input onClick={translateEmail} onBlur={()=>setEmailTranslated(false)} onChange={handleChange} className={`${isEmailFocused || inputEmailValue ? "border-b-purple" : ""}`} type="email" name="email" />
                            </div>

                            <div className="flex justify-start items-center">
                                <i className={`fas fa-lock input-icon ${isPasswordFocused || inputPasswordValue ? 'text-purple' : ''}`}></i>
                                <h5  className={`${isPasswordFocused || inputPasswordValue ? '-translate-y-8 text-purple font-medium' : 'translate-y-0'}`}>Password</h5>
                                <input onClick={translatePassword} onBlur={()=>setPasswordTranslated(false)} onChange={handleChange} className={`${isPasswordFocused || inputPasswordValue ? "border-b-purple" : ""}`} type={`${passwordVisible ? "text" : "password"}`} name="password" />
                                <i onClick={()=>setPasswordVisible(!passwordVisible)} className={`fi fi-rr-eye${passwordVisible ? "" : "-crossed"} absolute right-11`}></i>
                            </div>
                            <button onClick={handleSubmit} type="submit" className="btn-purple font-medium w-80 rounded-md">Sign In</button>
                        </form>
                    </div>

                    {/* signin option */}
                    <div className="m-3 font-inter">
                        New User? <a className="text-purple" href="/signin">SignUp</a>
                    </div>

                    {/* OR */}
                    <div className="m-3 font-inter center space-x-3">
                        <div className="w-[50%] border border-dark-grey"></div>
                        <p>OR</p>
                        <div className="w-[50%] border border-dark-grey"></div>
                    </div>

                    {/* continue with google button */}
                    <GoogleAuth />
                
                </div>
                </div>
                </Fade>
            </div>
        </>
    )
}

export default Signin
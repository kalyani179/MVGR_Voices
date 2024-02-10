import axios from 'axios';
import React, { useContext, useState, useEffect } from 'react'
import toast,{Toaster} from "react-hot-toast";
import {Slide } from "react-awesome-reveal";

import { authWithGoogle } from '../../common/firebase';
import GoogleAuth from './GoogleAuth';

import {storeInSession} from "../../common/session";
import { UserContext } from '../../App';


const UserAuth = ({type,close,open}) => {

    // to make the background unscrollable when signing up.
    useEffect(()=>{
        document.body.style.overflowY = "hidden";
        return () => {
            document.body.style.overflowY = "scroll";
        };
    },[])

    const [closeTab, setCloseTab] = useState(false);

    let {userAuth:{access_token},setUserAuth} = useContext(UserContext);
    console.log(access_token);

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

    const userAuthThroughServer = (route,formData) =>{
        axios.post(process.env.REACT_APP_SERVER_DOMAIN+"/"+route,formData)
        .then(async ({data})=>{console.log(data);
            if(route==="signup"){
                let loading = toast.loading("sending mail...");
                setTimeout(()=>{
                    toast.remove(loading);
                    toast.success("Email has been sent to your Email!");
                },500)
            }
            if(route==="signin"){
                storeInSession("user",JSON.stringify(data));
                let loadingSignin = toast.loading("signing in...")
                setUserAuth(data);
                setData({fullname:"",email:"",password:""});
                // window.location.reload(); // To make animation
                setTimeout(()=>{
                    toast.remove(loadingSignin);
                    toast.success("User Signed "+type[type.length-2]+type[type.length-1]+" Succesfully");
                },500)
            }   
            setTimeout(()=>{
                setCloseTab(true);
            },500);
        }
            
        )
        .catch(({response})=>{
            // To clear the input fields in the case of error
            setInputNameValue('');
            setInputEmailValue('');
            setInputPasswordValue('');
            return toast.error(response.data.error);
        })
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        let formData = data;
        if(type==="signup"){
            let loading = toast.loading("please wait...");
            setTimeout(()=>{
                toast.remove(loading);
            },2000)
        }
        userAuthThroughServer(type,formData);
    }
    const handleGoogleAuth = (e) =>{

        e.preventDefault();
    
        authWithGoogle()
        .then((user) => {
            let serverRoute = "google-auth";
            let formData = {
                access_token : user.accessToken
            }
            userAuthThroughServer(serverRoute,formData);
            console.log(user);
        })
        .catch(err=>{
            return toast.error("There is some error in signin with google");
            // return console.log(err);
        })
    }
    useEffect(() => {
        if (closeTab) {
          close(); // Close the tab when closeTab state changes
        }
    }, [closeTab,close]);
    return (
        <>
            <Toaster
                toastOptions={{
                    success:{
                        duration: 2000
                    },
                    error: {
                        duration: 3500
                    }
                }}
            />
            <div className="fixed inset-0 bg-black bg-opacity-50 center" onClick={close}>
                <Slide direction="down" duration={1500}>
                {/* SignUp Heading */}
                <div className="bg-white relative p-8 pb-4 rounded-md z-50" onClick={(e) => e.stopPropagation()}>
                    <button onClick={close}><i className="fi fi-bs-cross-small text-lg text-dark-grey absolute top-3.5 right-4"></i></button>
                    <div className="center">
                        <h1 className="text-center mb-5 heading">{type==="signup" ? "Sign Up" : "Sign In"}</h1>
                    </div>

                    {/* Form */}
                    <div className="m-3">
                        <form className="h-cover flex flex-col gap-5 items-center justify-center">
                            {
                                type === "signup" ?
                                <div className="flex justify-start items-center">
                                    <i className={`fas fa-user input-icon ${isNameFocused || inputNameValue ? 'text-primary' : ''}`}></i>
                                    <h5 className={`${isNameFocused || inputNameValue ? '-translate-y-7 text-primary font-medium' : 'translate-y-0'}`}>Full Name</h5>
                                    <input onFocus={translateName} onBlur={()=>setNameTranslated(false)} onChange={handleChange} className={`auth-input ${isNameFocused || inputNameValue ? "border-b-primary" : ""}`} type="text" name="fullname" value={inputNameValue}/>
                                </div> : ""
                            }
                            <div className="flex justify-start items-center">
                                <i class={`fas fa-envelope input-icon ${isEmailFocused || inputEmailValue ? 'text-primary' : ''}`}></i>
                                <h5  className={`${isEmailFocused || inputEmailValue ? '-translate-y-7 text-primary font-medium' : 'translate-y-0'}`}>Email</h5>
                                <input onClick={translateEmail} onBlur={()=>setEmailTranslated(false)} onChange={handleChange} className={`auth-input ${isEmailFocused || inputEmailValue ? "border-b-primary" : ""}`} type="email" name="email" value={inputEmailValue}/>
                            </div>
                            <div className="flex justify-start items-center">
                                <i className={`fas fa-lock input-icon ${isPasswordFocused || inputPasswordValue ? 'text-primary' : ''}`}></i>
                                <h5  className={`${isPasswordFocused || inputPasswordValue ? '-translate-y-7 text-primary font-medium' : 'translate-y-0'}`}>Password</h5>
                                <input onClick={translatePassword} onBlur={()=>setPasswordTranslated(false)} onChange={handleChange} className={`auth-input ${isPasswordFocused || inputPasswordValue ? "border-b-primary" : ""}`} type={`${passwordVisible ? "text" : "password"}`} name="password" value={inputPasswordValue}/>
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
                    <GoogleAuth handleGoogleAuth={handleGoogleAuth} />
                
                </div>
                </Slide>
            </div>
        </>
    )
}

export default UserAuth
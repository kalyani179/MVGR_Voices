import axios from 'axios';
import React, { useState } from 'react'
import toast,{Toaster} from "react-hot-toast";



const ForgotPassword = () => {

    /* To Translate the h5,change colors when clicked on the input */

    const [isEmailFocused,setEmailTranslated] = useState(false);

    const translateEmail = () =>{
        setEmailTranslated(!isEmailFocused);
    }

    const [inputEmailValue, setInputEmailValue] = useState('');

    const handleChange = (e) =>{
        const {name,value} = e.target;
        if(name === "email"){
            setInputEmailValue(value);
        }
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        let loadingToast = toast.loading("sending mail...")
        e.target.setAttribute("disabled",true);
        console.log(inputEmailValue);
        axios.post(process.env.REACT_APP_SERVER_DOMAIN+"/forgot-password",{email:inputEmailValue})
        .then((data)=>{
            toast.dismiss(loadingToast);
            return toast.success("Mail sent succesfully!");
        }).catch(({response})=>{
            toast.dismiss(loadingToast);
            return toast.error(response.data.error);
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
                        <h1 className={`text-center mb-5 heading`}>Forgot Password</h1>
                    </div>

                    {/* Form */}
                    <div className="m-3">
                        <form className="h-cover flex flex-col gap-5 items-center justify-center">
                    
                            <div className="flex justify-start items-center">
                                <i class={`fas fa-envelope input-icon ${isEmailFocused || inputEmailValue ? 'text-primary' : ''}`}></i>
                                <h5  className={`${isEmailFocused || inputEmailValue ? '-translate-y-7 text-primary font-medium' : 'translate-y-0'}`}>Email</h5>
                                <input onClick={translateEmail} onBlur={()=>setEmailTranslated(false)} onChange={handleChange} className={`auth-input ${isEmailFocused || inputEmailValue ? "border-b-primary" : ""}`} type="email" name="email" value={inputEmailValue}/>
                            </div>
                        
                            <button onClick={handleSubmit} type="submit" className="btn-purple font-medium w-80 rounded-md">Send Mail</button>
                        </form>
                    </div>
                
                </div>
            </div>
        </>
    )
}

export default ForgotPassword;
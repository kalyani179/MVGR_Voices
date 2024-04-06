import axios from 'axios';
import React, { useContext, useState } from 'react'
import {toast,Toaster} from 'react-hot-toast';
import { ThemeContext } from '../../App';

const ContactForm = () => {
    let {theme} = useContext(ThemeContext);
    const [isFullNameFocused,setFullNameTranslated] = useState(false);
    const [isEmailFocused,setEmailTranslated] = useState(false);
    const [isMessageFocused,setMessageTranslated] = useState(false);

    const translateFullName = () => {
        setFullNameTranslated(!isFullNameFocused);
    }
    const translateEmail = () => {
        setEmailTranslated(!isEmailFocused);
    }
    const translateMessage = () => {
        setMessageTranslated(!isMessageFocused);
    }

    const [inputFullNameValue,setInputFullNameValue] = useState('');
    const [inputEmailValue,setInputEmailValue] = useState('');
    const [inputMessageValue,setInputMessageValue] = useState('');
    const handleChange = (e) => {
        let {name,value} =  e.target;
        if(name==="fullname"){
            setInputFullNameValue(value);
        }
        if(name==="email"){
            setInputEmailValue(value);
        }
    }
    const handleMessageChange = (e) => {
        setInputMessageValue(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputEmailValue,inputFullNameValue,inputMessageValue)
        if(!inputFullNameValue.length){
            return toast.error("Please Enter Your Fullname..!");
        }
        if(!inputEmailValue.length){
            return toast.error("Please Enter Your Email..!");
        }
        if(!inputMessageValue.length){
            return toast.error("Please Enter The Message..!");
        }
        let loadingToast = toast.loading("sending mail...");
        e.target.setAttribute("disabled",true);
        axios.post(process.env.REACT_APP_SERVER_DOMAIN+"/query-mail",{fullname:inputFullNameValue,email:inputEmailValue,query:inputMessageValue})
        .then(response =>{
                e.target.removeAttribute("disabled");
                toast.success("Mail Sent Successfully!");
                toast.dismiss(loadingToast);
                setInputFullNameValue('');setInputEmailValue('');setInputMessageValue('');
        })
        .catch(({response})=>{
            e.target.removeAttribute("disabled");
            toast.error(response.data.error);
            // toast.error("Sorry!There is an error occured while sending mail...Please Try Again!");
            setInputFullNameValue('');setInputEmailValue('');setInputMessageValue('');
            toast.dismiss(loadingToast);
            console.log(response.data.error);
        })
    }
    return (
        <form className="bg-white opacity-90 flex flex-col gap-3 rounded-xl shadow-2xl p-10 sm:p-7">
            <Toaster />
            <div className="flex justify-start items-center">
                <i className={`fas fa-user absolute ${isFullNameFocused || inputFullNameValue ? 'text-primary' : ''}`}></i>
                <h6  className={`absolute pl-7 transition-transform duration-300 ease-in-out transform ${isFullNameFocused  || inputFullNameValue ? '-translate-y-7 text-primary font-medium' : 'translate-y-0'}`}>Full Name</h6>
                <input onClick={translateFullName} onBlur={()=>setFullNameTranslated(false)} onChange={handleChange} className={`auth-input  ${isFullNameFocused || inputFullNameValue ? "border-b-primary" : ""}`} type="text" name="fullname" value={inputFullNameValue}/>
            </div>
            <div className="flex justify-start items-center">
                <i className={`fas fa-envelope absolute ${isEmailFocused || inputEmailValue ? 'text-primary' : ''}`}></i>
                <h6  className={`absolute pl-7 transition-transform duration-300 ease-in-out transform ${isEmailFocused || inputEmailValue ? '-translate-y-7 text-primary font-medium' : 'translate-y-0'}`}>Email</h6>
                <input onClick={translateEmail} onBlur={()=>setEmailTranslated(false)} onChange={handleChange} className={`auth-input ${isEmailFocused || inputEmailValue ? "border-b-primary" : ""}`} type="email" name="email" value={inputEmailValue}/>
            </div>
            <div className="flex justify-start items-center">
                <i class={`absolute fi fi-sr-comment-alt mb-3 ${isMessageFocused|| inputMessageValue ?"text-primary":""}`}></i>
                <h6 className={`absolute pl-7 mb-5 transition-transform duration-300 ease-in-out transform ${isMessageFocused || inputMessageValue ? '-translate-y-7 text-primary font-medium' : 'translate-y-0'}`}>Type Message Here</h6>
                <textarea onClick={translateMessage} onBlur={()=>setMessageTranslated(false)} onChange={handleMessageChange} className={`resize-none bg-transparent w-full auth-input overflow-hidden text-area-input overflow-y-scroll ${isMessageFocused || inputMessageValue ? "border-b-primary" : ""}`} value={inputMessageValue}>
                </textarea>
            </div>
            <button onClick={handleSubmit} type="submit" className={`btn-purple ${theme==="light" ? "font-medium" : "font-bold"}  rounded-md`}>Send Message</button>
                
            
        </form>
    )
}

export default ContactForm
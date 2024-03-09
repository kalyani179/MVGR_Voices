import React, { useContext } from 'react';
import MVGR from "../../assets/images/contact/mvgr.png"
import MVGRVideo from "../../assets/videos/pond.mp4"
import ContactForm from './ContactForm';
import {ThemeContext} from "../../App.jsx";

const Contact = () => {
    let {theme,setTheme} = useContext(ThemeContext);
    return (
        <div>
        {/* <div className="bg-black h-screen"> */}
        {/* <video autoPlay loop muted className="w-full h-screen object-cover">
                    <source src={MVGRVideo} type="video/mp4"/>
        </video> */}
            <img className="object-cover w-full max-h-screen" src={MVGR} alt="background"/>
            <div className={`absolute inset-0 ${theme==="light" ? "bg-black" : "bg-white" } bg-opacity-90 ${theme==="light" ? "opacity-85" : "opacity-95"}`}>
                <div className="center flex-col gap-5 pt-10">
                    <h1 className="text-primary text-5xl font-extrabold font-gelasio tracking-wide">CONTACT US</h1>
                    <p className={`${theme==="light" ? "text-white" : "text-black"} text-xl font-medium w-[60%] sm:w-[95%] sm:text-lg text-center tracking-wide`}>Reach out to us for inquiries, collaborations, or to share your thoughts. We're here to listen and engage with our community.</p>
                </div>
                <div className="flex center justify-around sm:flex-col mt-12 m-20">
                <div className="flex flex-col gap-10">
                    <div className="flex items-center gap-5">
                        <div className="bg-white/80 w-12 h-12 center rounded-full">
                            <i class="fi fi-sr-marker text-xl text-black mt-1"></i>
                        </div>
                        <div>
                            <h1 className="text-primary font-medium text-lg">Address</h1>
                            <p className={`${theme==="light" ? "text-white" : "text-black"} w-64`}> Chintalavalasa, Vizianagaram, Andhra Pradesh 535005</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-5">
                        <div className="bg-white/80 w-12 h-12 center rounded-full">
                            <i class="fi fi-sr-phone-call text-xl text-black mt-1"></i>
                        </div>
                        <div>
                            <h1 className="text-primary font-medium text-lg">Phone</h1>
                            <p className={`${theme==="light" ? "text-white" : "text-black"} w-64`}>089222 41039</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-5">
                        <div className="bg-white/80 w-12 h-12 center rounded-full">
                            <i class="fi fi-sr-envelope text-xl text-black mt-1"></i>
                        </div>
                        <div>
                            <h1 className="text-primary font-medium text-lg">Email</h1>
                            <p className={`${theme==="light" ? "text-white" : "text-black"} w-64`}>mvgrvoices@gmail.com</p>
                        </div>
                    </div>
                </div>
                <div>
                    <ContactForm/>
                </div>
                </div>
                
            
            </div>
        </div>
    )
}

export default Contact
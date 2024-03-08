import React from 'react';
import MVGR from "../../assets/images/contact/mvgr.png"
import ContactForm from './ContactForm';

const Contact = () => {
    return (
        <div className="">
            <img className="object-cover w-full max-h-screen" src={MVGR} alt="background"/>
            <div className="absolute inset-0 bg-black bg-opacity-80 opacity-95">
                <div className="center flex-col gap-3 mt-5">
                    <h1 className="text-primary text-4xl font-bold tracking-wide">CONTACT US</h1>
                    <p className="text-white text-xl font-medium w-[60%] text-center tracking-wide">Reach out to us for inquiries, collaborations, or to share your thoughts. We're here to listen and engage with our community.</p>
                </div>
                <div className="flex center justify-around mt-16 m-20">
                <div className="flex flex-col gap-10">
                    <div className="flex items-center gap-5">
                        <div className="bg-white w-12 h-12 center rounded-full">
                            <i class="fi fi-sr-marker text-xl text-black mt-1"></i>
                        </div>
                        <div>
                            <h1 className="text-primary font-medium text-lg">Address</h1>
                            <p className="text-white w-64"> Chintalavalasa, Vizianagaram, Andhra Pradesh 535005</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-5">
                        <div className="bg-white w-12 h-12 center rounded-full">
                            <i class="fi fi-sr-phone-call text-xl text-black mt-1"></i>
                        </div>
                        <div>
                            <h1 className="text-primary font-medium text-lg">Phone</h1>
                            <p className="text-white w-64">089222 41039</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-5">
                        <div className="bg-white w-12 h-12 center rounded-full">
                            <i class="fi fi-sr-envelope text-xl text-black mt-1"></i>
                        </div>
                        <div>
                            <h1 className="text-primary font-medium text-lg">Email</h1>
                            <p className="text-white w-64">mvgrvoices@gmail.com</p>
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
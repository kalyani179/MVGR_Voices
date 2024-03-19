import React from 'react';
import ContactForm from './ContactForm';
import Navbar from '../Home/Navbar/Navbar.jsx';

const Contact = () => {
    return (
        <>
        <div>
        <div className="bg-cool-white">
                <div className="bg-white border-b border-grey">  
                    <Navbar activeLink="Contact" home={0}/>
                </div>
                <div className="center flex-col gap-4 mt-5">
                    <h1 className="text-primary text-4xl font-extrabold font-gelasio tracking-wide">CONTACT US</h1>
                    <p className={`text-dark-grey text-xl font-medium w-[60%] sm:w-[95%] sm:text-lg text-center tracking-wide`}>Reach out to us for inquiries, collaborations, or to share your thoughts.</p>
                </div>
                <div className="flex center justify-around sm:flex-col sm:gap-10 mt-10 m-20 mb-0 bg-cool-white pb-6">
                <div className="flex flex-col gap-10">
                    <div className="flex items-center gap-5">
                        <div className="bg-black/90 w-12 h-12 center rounded-full">
                            <i class="fi fi-sr-marker text-xl text-white mt-1"></i>
                        </div>
                        <div>
                            <h1 className="text-primary font-medium text-lg">Address</h1>
                            <p className={`text-black w-64 font-medium`}> Chintalavalasa, Vizianagaram, Andhra Pradesh 535005</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-5">
                        <div className="bg-black/90 w-12 h-12 center rounded-full">
                            <i class="fi fi-sr-phone-call text-xl text-white mt-1"></i>
                        </div>
                        <div>
                            <h1 className="text-primary font-medium text-lg">Phone</h1>
                            <p className={`text-black w-64`}>089222 41039</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-5">
                        <div className="bg-black/90 w-12 h-12 center rounded-full">
                            <i class="fi fi-sr-envelope text-xl text-white mt-1"></i>
                        </div>
                        <div>
                            <h1 className="text-primary font-medium text-lg">Email</h1>
                            <p className={`text-black w-64`}>mvgrvoices@gmail.com</p>
                        </div>
                    </div>
                </div>
                <div>
                    <ContactForm/>
                </div>
                </div>
                
            
            </div>
        </div>
        
        </>
    )
}

export default Contact
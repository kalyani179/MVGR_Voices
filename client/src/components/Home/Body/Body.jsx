import React from 'react'
import MVGRVideo from "../../../assets/videos/MVGR.mp4";
import Navbar from '../Navbar/Navbar';

const Body = () => {
    return (
        <div>
            <div>
                <video autoPlay loop muted className="w-full max-h-screen object-cover">
                    <source src={MVGRVideo} type="video/mp4"/>
                </video>
                <div className="absolute inset-0 bg-black bg-opacity-60 opacity-85">
                    <Navbar />
                </div>
            </div>
            
        </div>
    )
}

export default Body
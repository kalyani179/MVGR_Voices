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
                <div className="absolute inset-0 bg-black bg-opacity-80 opacity-80">
                    <Navbar />
                    <h1 className="text-6xl text-white font-extrabold mt-44 tracking-wide center">Welcome to <span className="text-6xl font-gelasio font-extrabold ml-6 text-primary"> MVGR VOICES</span></h1>
                    <p className="text-xl text-white font-semibold mt-8 tracking-widest center uppercase">It's the best platform for Students to share their cool stories in podcasts and blogs.</p>
                </div>
            </div>
            
        </div>
    )
}

export default Body
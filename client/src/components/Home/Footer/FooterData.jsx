import React from 'react';
import { Link } from 'react-router-dom';

let Platforms = [
    {name:"Spotify",icon:"fi fi-brands-spotify",link:"https://open.spotify.com/show/6J8UPeMRykeUM5f08vgkSg"},
    {name:"Google",icon:"",link:""},
    {name:"Apache",icon:"",link:""}
]
const FooterData = () => {
  return (
    <footer className="py-4 relative overflow-hidden bg-primary/95">

    <div className="center gap-10">
        {/* Subscribe */}
        <div className="center gap-10">
            <h1 className="text-white">SUBSCRIBE ON</h1>
            {
                Platforms.map((platform,i)=>{
                    return (
                        <Link to={`${platform.link}`} target="_blank" key={i} className="border border-white flex flex-row gap-3 p-2">
                            <i className={`${platform.icon} text-white`}></i>
                            <h1 className="text-white">{platform.name}</h1>
                        </Link>
                    );
                })
            }
        </div>
        {/* Social icons */}
        <div className="flex items-center mt-4 md:mt-0">
        
        </div>
      </div>
      {/* Copyright notice */}
      <div className="text-center text-gray-300 text-sm my-5 mt-10">
        © 2024 MVGR VOICES. All rights reserved.
      </div>
    </footer>
  );
}

export default FooterData;
import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../../../assets/icons/logo.png"

let Platforms = [
    {name:"Spotify",icon:"fi fi-brands-spotify",link:"https://open.spotify.com/show/6J8UPeMRykeUM5f08vgkSg"},
    {name:"Google",icon:"fi fi-brands-google",link:""},
]
let Links = [
  {name:"Home",link:"/"},
  {name:"Podcasts",link:"/podcasts"},
  {name:"Blogs",link:"/blogs"},
  {name:"Contact",link:"/contact"}
]
const FooterData = () => {
  return (
    <footer className="py-4 text-white relative overflow-hidden bg-primary">

    <div className="center justify-around mx-5">
    <img className="w-36 h-20 sm:hidden" src={logo} alt="Logo" />

      <div class="h-20 border-l border-grey/70 sm:border-none"></div>
        {/* Subscribe */}
        <div className="center gap-10 sm:flex-col sm:gap-5">
            <h1 className="text-white font-medium font-gelasio text-xl tracking-wide">SUBSCRIBE ON</h1>
            {
                Platforms.map((platform,i)=>{
                    return (
                        <Link to={`${platform.link}`} target="_blank" key={i} className="border border-white flex flex-row gap-3 p-2 px-3 hover:bg-grey/15">
                            <i className={`${platform.icon} text-white`}></i>
                            <h1 className="text-white font-merriweather">{platform.name}</h1>
                        </Link>
                    );
                })
            }
        </div>
        <div class="h-20 border-l border-grey/70 sm:border-none"></div>
      <div className="center flex-col gap-5 sm:hidden">
        <div className="flex gap-3 font-medium tracking-wide text-2xl text-grey/80">
          {
            Links.map((link,i)=>{
              return (
                <div key={i} className="flex gap-3">
                  <a href={link.link} className="hover:text-white font-gelasio">{link.name}</a>
                  <p className={`text-grey/50 ${link.name==="Contact" ? "hidden" : ""}`}>|</p>
                </div>
              )
            })
          }

        </div>
      
      </div>
      </div>
        {/* Copyright notice */}
        <div className="text-center text-grey/70 text-sm my-5 mt-10">
          <span className="rotate-180 inline-block">&copy;</span>  2024 MVGR VOICES All Rights Reserved
        </div>
    </footer>
  );
}

export default FooterData;
import React, { useContext, useState } from "react"
import UserAuth from "../../Authentication/UserAuth";
import { ThemeContext, UserContext } from "../../../App";
import { removeFromSession, storeInSession } from "../../../common/session";
import Animation from "../../../common/Animation";
import {Toaster,toast} from "react-hot-toast";
import logo from "../../../assets/icons/logo.png";
import logoDark from "../../../assets/icons/logoDark.png";
import { Link, useNavigate } from "react-router-dom";
import UserNavigationPanel from "./UserNavigationPanel";
import Footer from "../Footer/Footer";


const Navbar = ({home=1,activeLink="Home"}) => {
  let navigate = useNavigate();
  const {userAuth:{profile_img}} = useContext(UserContext);
  const [userNavPanel,setUserNavPanel] = useState(false);
  let {theme,setTheme} = useContext(ThemeContext);
  const {userAuth:{access_token},setUserAuth} = useContext(UserContext);

  const [showSignup,setShowSignup] = useState(false);
  const [showSignin,setShowSignin] = useState(false);


  const [searchBoxVisibility,setSearchBoxVisibility] = useState(false);
  const handleSearch = (e) => {
      let query = e.target.value;
      if(e.keyCode === 13){
          navigate(`/search/${query}`)
      }
  }

  let Links=[
    {name:"Home",link:"/"},
    {name:"Podcasts",link:"/"},
    {name:"Blogs",link:"/blogs"},
    {name:"Contact",link:"/contact"},
    {name:"Subscribe",link:""},
  ];
  const handleLinkClick = ({link}) =>{
    // if(!access_token) {
    //   toast.error("Please Sign In to Access " + link.name.charAt(0).toUpperCase() + link.name.slice(1)+"!");
    // }else{
      // setActiveLink(link.name);
      navigate(link.link);
    // }
    if (link.name === "Subscribe") {
      window.scrollTo(0, document.body.scrollHeight);
    }
  }
  const changeTheme = () => {
    let newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.body.setAttribute("data-theme",newTheme);
    storeInSession("theme",newTheme);
  }
  let [open,setOpen]=useState(false);

  return (
    <Animation>
    <Toaster 
      toastOptions={{
          success:{
              duration: 2000
          },
          error: {
              duration: 1500
          }
      }}
    />
      <div className="flex">
      <div className={`w-full opacity-85 sm:opacity-100`}>
            <div className="md:flex items-center justify-between py-3 pt-2 md:px-10 px-7">
            <div className="cursor-pointer">
                      <img width={110} height={110} src={`${theme==="light" ? home===1 ? logo :  logoDark : logo}`} alt="Logo" className="filter grayscale" />
            </div>
            
                <div className="fixed right-16 md:hidden top-2.5">
                  <button onClick={changeTheme} className={`rounded-full w-11 h-11 sm:w-8 sm:h-8 hover:bg-black/10 ${home===1 ? "bg-black/20" : "bg-grey/90"} relative`}>
                          <i className={`fi fi-rr-${theme === "light" ? "moon-stars" :"brightness"} ${home===1? "text-white" : "text-black"} text-xl sm:text-sm block mt-1`}></i>
                  </button>
                </div>
                
              <div onClick={()=>setOpen(!open) } className="text-white fixed right-8 top-6 sm:top-4 z-50 cursor-pointer md:hidden" >
                <i className={`fi ${!open? "fi-ss-menu-burger" : "fi-rs-circle-xmark text-xl text-black" } ${theme==="light" ? home===1 ? "text-white":"text-black" :"text-black"}`}></i>
                  {/* <ion-icon name={open ?"close":"menu"}></ion-icon> */}
              </div>
              <div className="sm:z-40 sm:fixed sm:right-0">
                <ul className={`md:flex ${theme==="light"?"sm:bg-black":"sm:bg-white"} sm:pr-10 md:items-center  sm:pt-10 sm:pb-20 sm:-mt-20 ${theme==="light" ? "text-white" : "text-black"} md:pb-0 pb:12 absolute md:static md:z-auto z-[-1] md:right-0 md:w-auto md:pl-0 pl-9 transition-all duration-500  ease-in sm:min-h-screen ${open ? "right-0":" right-[-200px]" }`} >
                <div className={`${(activeLink === "Podcasts" || activeLink === "Blogs") ? "show" : "hidden"} flex items-center ml-auto gap-3 md:gap-6`}>
                  <div className={`absolute left-0 w-full top-16 mt-0.5  px-[5vw] py-4 pb-1 border-b border-grey duration-500 md:-m-6 md:ml-2  md:border-0 md:block md:relative md:inset-0 md:p-0 md:w-auto md:show ${searchBoxVisibility ? "show" : "hide"}`}>
                  <input 
                      type='text'
                      placeholder='Search'
                      className='w-full md:w-auto bg-grey p-3 pl-6 pr-[12%] md:pr-6 rounded-full md:pl-12 text-black'
                      onKeyDown={handleSearch}
                  />
                  <i className="fi fi-rr-search absolute right-[10%] top-1/2 sm:-translate-y-2 md:top-3 md:pointer-events-none md:left-5 text-lg text-dark-grey"></i>
                </div>
                    <Link>
                        <button className="md:hidden bg-grey rounded-full w-11 h-11 center"
                        onClick={()=>setSearchBoxVisibility(!searchBoxVisibility)}
                        >
                            <i className="fi fi-rr-search block text-lg mt-1"></i>
                        </button>
                    </Link>
                </div>
                  {
                      Links.map((link)=>(
                        <li key={link.name} className="md:ml-8 md:my-0 my-7 sm:my-10">
                          <h4
                              className={`hover:border-b-2 leading-relaxed text-[22px] ${theme==="light" ? home===1 ? "text-white" : "text-dark-grey" : "text-black/60"} hover:border-b-primary duration-500 tracking-wide font-inter cursor-pointer border-b-2 ${
                                activeLink === link.name ? theme==="light" ? "border-primary" : "border-primary" : "border-transparent"}`}
                              onClick={()=> handleLinkClick({link})}
                            >{link.name}</h4>
                        </li>

                      ))
                  }
                  {activeLink === "Subscribe" && <Footer />}
                    {/* Theme Change */}
                  <div className="ml-4">
                  <Link>
                    <button onClick={changeTheme} className={`rounded-full w-11 h-11 sm:hidden hover:bg-black/10 ${home===1 ? "bg-black/20" : "bg-grey/90"} relative`}>
                            <i className={`fi fi-rr-${theme === "light" ? "moon-stars" :"brightness"} ${home===1? "text-white" : "text-black"} text-xl block mt-1`}></i>
                    </button>
                  </Link>
                  </div>
                  
                  <div className="md:ml-8 space-x-3 sm:mr-6">  
                      {
                        access_token ? 
                        <>
                        <div className="z-50" onClick={()=>setUserNavPanel(!userNavPanel)} onBlur={()=>{setTimeout(()=>setUserNavPanel(false),200)}}>
                        <button className={`w-11 h-11 mt-1 rounded-full ${activeLink==="profile" ? "border-2 border-primary" : ""}`}>
                            <img className="w-full h-full object-cover rounded-full" src={profile_img} alt="profile"/>
                        </button>
                        {
                            userNavPanel ? <UserNavigationPanel /> : ""
                        }
                        
                      </div>
                        </>
                        : 
                        <>
                        
                          
                          <button onClick={()=>setShowSignin(true)} className={`btn-purple ${theme === "light" ? "text-white" : "text-black"} md:text-xl sm:text-sm font-inter tracking-wide`}>Sign In</button>
                        
                          {/* <button onClick={()=>setShowSignup(true)} className="btn-purple md:text-xl sm:text-sm font-inter tracking-wide">Sign Up</button> */}
                        
                        </>
                      }              
                  </div>                                    
                </ul>
                </div>
            </div> 
          </div>
          {showSignup && <UserAuth type="signup" close={()=>setShowSignup(false)} open={()=>{setShowSignup(false);setShowSignin(true);}}/>}
          {showSignin && <UserAuth type="signin" close={()=>setShowSignin(false)} open={()=>{setShowSignin(false);setShowSignup(true);}}/>}
      </div>
    </Animation>
  )
}

export default Navbar;
import React, { useContext, useEffect, useState } from "react"
import UserAuth from "../../Authentication/UserAuth";
import { SearchContext, ThemeContext, UserContext } from "../../../App";
import { removeFromSession, storeInSession } from "../../../common/session";
import Animation from "../../../common/Animation";
import {Toaster,toast} from "react-hot-toast";
import logo from "../../../assets/icons/logo.png";
import logoDark from "../../../assets/icons/logoDark.png";
import { Link, useNavigate } from "react-router-dom";
import UserNavigationPanel from "./UserNavigationPanel";
import Footer from "../Footer/Footer";
import axios from "axios";


const Navbar = ({home=1,activeLink="Home"}) => {
  let navigate = useNavigate();
  const [userNavPanel,setUserNavPanel] = useState(false);
  let {theme,setTheme} = useContext(ThemeContext);
  const {userAuth,userAuth:{access_token,profile_img,new_notification_available},setUserAuth} = useContext(UserContext);

  const [showSignup,setShowSignup] = useState(false);
  const [showSignin,setShowSignin] = useState(false);


  const {searchBoxVisibility,setSearchBoxVisibility} = useContext(SearchContext);
  useEffect(() => {
    if (access_token) {
      axios.get(process.env.REACT_APP_SERVER_DOMAIN + '/new-notification', {
        headers: {
          'Authorization': `Bearer ${access_token}`
        }
      })
      .then((response) => {
        //console.log(response.data); // Log the response to see its structure
        setUserAuth({ ...userAuth, ...response.data }); // Update state based on response
      })
      .catch(err => {
        console.log(err);
      });
    }
  }, [access_token]);

  const handleBlogSearch = (e) => {
      let query = e.target.value;
      if(e.keyCode === 13){
          navigate(`/search/${query}`)
      }
  }
  const handlePodcastSearch = (e) => {
    let query = e.target.value;
    if(e.keyCode === 13){
        navigate(`podcasts/search/${query}`)
    }
}

  let Links=[
    {name:"Home",link:"/"},
    {name:"Podcasts",link:"/podcasts"},
    {name:"Blogs",link:"/blogs"},
    {name:"Contact",link:"/contact"},
    {name:"Subscribe"},
  ];
  const handleLinkClick = ({link}) =>{
    // if(!access_token) {
    //   toast.error("Please Sign In to Access " + link.name.charAt(0).toUpperCase() + link.name.slice(1)+"!");
    // }else{
      // setActiveLink(link.name);
      if (link.name === "Subscribe") {
        window.scrollTo(0, document.body.scrollHeight);
      }
      navigate(link.link);
    // }
  }
  const handleNotificationClick=()=>{
    if(!access_token) {
      toast.error("Please Sign In to Access Notifications!");
    }else{
      navigate("/dashboard/notifications");
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
            <div className="flex items-center justify-between py-3 pt-2 px-7">
            <div className="cursor-pointer">
            <img src={`${theme==="light" ? home===1 ? logo :  logoDark : logo}`} alt="Logo" className={`filter grayscale w-full md:w-28 md:h-14  sm:w-18 sm:h-9`} />
            </div>
          {/* mobile screens */}
          <div className="md:hidden flex items-center justify-center gap-4">
              <div className="flex gap-3">
              {/* search button */}
                <div className={`${activeLink==="Blogs" || activeLink==="Podcasts" ? "show" : "hidden"} flex items-center ml-auto gap-3 md:gap-6`}>
                  <div className={`absolute left-0 w-full top-12 mt-0.5 px-[5vw] py-4 pb-1 border-b border-grey duration-500 md:-m-6 md:ml-2 md:border-0 md:block md:relative md:inset-0 md:p-0 md:w-auto md:show ${searchBoxVisibility ? "show" : "hide"}`}>
                  <input 
                      type='text'
                      placeholder='Search'
                      className='w-full realtive md:w-auto bg-grey sm:bg-white p-3 pl-6 pr-[12%] md:pr-6 rounded-full md:pl-12 text-black'
                      onKeyDown={activeLink==="Podcasts" ? handlePodcastSearch : handleBlogSearch}
                  />
                  <i className="fi fi-rr-search absolute right-[10%] top-1/2 sm:-translate-y-2 md:top-3 md:pointer-events-none md:left-5 text-lg text-dark-grey"></i>
                </div>
                    <Link>
                        <button className="md:hidden bg-grey rounded-full w-11 h-11 sm:w-8 sm:h-8 center"
                        onClick={()=>setSearchBoxVisibility(!searchBoxVisibility)}
                        >
                            <i className="fi fi-rr-search block text-sm mt-1"></i>
                        </button>
                    </Link>
                </div>

                  {/* theme button */}
                <div>
                  <button onClick={changeTheme} className={`rounded-full w-11 h-11 sm:w-8 sm:h-8 hover:bg-black/10 ${home===1 ? "bg-black/20" : "bg-grey/90"} relative`}>
                          <i className={`fi fi-rr-${theme === "light" ? "moon-stars" :"brightness"} ${home===1? "text-white" : "text-black"} text-xl sm:text-sm block mt-1`}></i>
                  </button>
                </div>
                  {/* Notifications */}
                <div>
                  <Link to="/dashboard/notifications">
                    <button  className={`rounded-full w-11 h-11 sm:w-8 sm:h-8 hover:bg-black/10 ${home===1 ? "bg-black/20" : "bg-grey/90"} relative`}>
                
                      <i className={`fi fi-rr-bell sidebar-icon text-xl sm:text-sm block mt-1 ${home===1? "text-white" : "text-black"}`}></i>
                      {
                        new_notification_available ?<span className="bg-red w-3 h-3 rounded-full absolute z-10 top-2 right-2"></span>:""
                      }
                    </button>
                  </Link>
                  </div>
                  <div className="">  
                      {
                        access_token ? 
                        <>
                        <div className="z-40" onClick={()=>setUserNavPanel(!userNavPanel)} onBlur={()=>{setTimeout(()=>setUserNavPanel(false),200)}}>
                        <button className={`w-11 h-11 sm:w-7 sm:h-7 mt-0.5 rounded-full ${activeLink==="profile" ? "border-2 border-primary" : ""}`}>
                            <img className="w-full h-full object-cover rounded-full" src={profile_img} alt="profile"/>
                        </button>
                        {
                            userNavPanel ? <UserNavigationPanel /> : ""
                        }
                        
                      </div>
                        </>
                        : 
                        <>
                        
                          
                          <button onClick={()=>setShowSignin(true)} className={`btn-purple ${theme === "light" ? "text-white" : "text-black"} md:text-xl sm:text-xs font-inter tracking-wide`}>Sign In</button>
                        
                          {/* <button onClick={()=>setShowSignup(true)} className="btn-purple md:text-xl sm:text-sm font-inter tracking-wide">Sign Up</button> */}
                        
                        </>
                      }              
                  </div>   
                
              </div>

              <div onClick={()=>setOpen(!open) } className={`text-white sm:top-4 z-50 cursor-pointer md:hidden`}>
                  <i className={`fi ${!open? "fi-ss-menu-burger" : "fi-rs-circle-xmark text-xl text-black" } ${theme==="light" ? home===1 ? "text-white":"text-black" :"text-black"}`}></i>
                    {/* <ion-icon name={open ?"close":"menu"}></ion-icon> */}
              </div>

          </div>
          
    
            {/* larger screens */}
              <div className="sm:z-40 sm:mt-20 sm:fixed sm:right-0">
                <ul className={`md:flex ${home===1?"sm:bg-black":"sm:bg-white"} ${theme==="light"?"sm:bg-black":"sm:bg-white"} sm:pr-10 md:items-center sm:pt-12 sm:pb-20 sm:-mt-20 ${theme==="light" ? "text-white" : "text-black"} md:pb-0 pb:12 absolute md:static md:z-auto z-[-1] md:right-0 md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in sm:min-h-screen ${open ? "right-0":" right-[-200px]" }`} >
                <div className={`sm:hidden ${activeLink==="Blogs" || activeLink==="Podcasts" ? "show" : "hidden"} flex items-center ml-auto gap-3 md:gap-6`}>
                  <div className={`absolute left-0 w-full top-16 mt-0.5  px-[5vw] py-4 pb-1 border-b border-grey duration-500 md:-m-6 md:ml-2  md:border-0 md:block md:relative md:inset-0 md:p-0 md:w-auto md:show ${searchBoxVisibility ? "show" : "hide"}`}>
                  <input 
                      type='text'
                      placeholder='Search'
                      className='w-full md:w-auto bg-grey p-3 pl-6 pr-[12%] md:pr-6 rounded-full md:pl-12 text-black'
                      onKeyDown={activeLink==="Podcasts" ? handlePodcastSearch : handleBlogSearch}
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

                  {/* Notifiactions */}
                  <div className="ml-4 sm:hidden">
                  
                    <button onClick={handleNotificationClick} className={`rounded-full w-11 h-11 hover:bg-black/10 ${home===1 ? "bg-black/20" : "bg-grey/90"} relative`}>
                
                      <i className={`fi fi-rr-bell sidebar-icon text-xl block mt-1 ${home===1? "text-white" : "text-black"}`}></i>
                      {
                        new_notification_available ?<span className="bg-red w-3 h-3 rounded-full absolute z-10 top-2 right-2"></span>:""
                      }
                    </button>
                  
                  </div>
                  
                  <div className="md:ml-8 sm:hidden space-x-3 sm:mr-6">  
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
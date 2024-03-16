import React, { useContext, useState } from "react"
import UserAuth from "../../Authentication/UserAuth";
import { ThemeContext, UserContext } from "../../../App";
import { removeFromSession, storeInSession } from "../../../common/session";
import Animation from "../../../common/Animation";
import {Toaster,toast} from "react-hot-toast";
import logo from "../../../assets/icons/logo.png";
import logoDark from "../../../assets/icons/logoDark.png";
import { Link, useNavigate } from "react-router-dom";
import UserNavigationPanel from "../../Blogs/Blogs Navbar/UserNavigationPanel";


const Navbar = ({home=1,activeLink="Home"}) => {
  let navigate = useNavigate();
  const {userAuth:{profile_img}} = useContext(UserContext);
  const [userNavPanel,setUserNavPanel] = useState(false);
  let {theme,setTheme} = useContext(ThemeContext);
  const {userAuth:{access_token},setUserAuth} = useContext(UserContext);

  const [showSignup,setShowSignup] = useState(false);
  const [showSignin,setShowSignin] = useState(false);

  const signOut = () => {
    let loadingToast = toast.loading("Signing Out...");
    setTimeout(()=>{
      toast.dismiss(loadingToast);
      toast.success("Signed Out Successfully...");
      removeFromSession("user");
      setUserAuth({access_token:null});
    },500);

  }

  let Links=[
    {name:"Home",link:"/"},
    {name:"Podcasts",link:"/"},
    {name:"Blogs",link:"/blogs"},
    {name:"Contact",link:"/contact"},
    {name:"Subscribe",link:"/"},
  ];
  const handleLinkClick = ({link}) =>{
    if(!access_token) {
      toast.error("Please Sign In to Access " + link.name.charAt(0).toUpperCase() + link.name.slice(1)+"!");
    }else{
      // setActiveLink(link.name);
      navigate(link.link);
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
      <div className={`w-full opacity-85`}>
            <div className="md:flex items-center justify-between py-3 pt-2 md:px-10 px-7">
            <div className="cursor-pointer">
                      <img width={110} height={110} src={`${theme==="light" ? home===1 ? logo :  logoDark : logo}`} alt="Logo" className="filter grayscale" />
            </div>
              <div onClick={()=>setOpen(!open) } className="text-3xl text-white absolute right-8 top-6 cursor-pointer md:hidden" >
                  <ion-icon name={open ?"close":"menu"}></ion-icon>
              </div>
                <ul className={`md:flex md:items-center ${theme==="light" ? "text-white" : "text-black"} md:pb-0 pb:12 absolute md:static md:z-auto z-[-1] right-0 md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? "top-20 ":" top-[-490px] " }`} >

                  {
                      Links.map((link)=>(
                        <li key={link.name} className="md:ml-8 md:my-0 my-7">
                          <h4
                              className={`hover:border-b-2 leading-relaxed text-[22px] ${theme==="light" ? home===1 ? "text-white" : "text-dark-grey" : "text-black"} hover:border-b-primary duration-500 tracking-wide font-inter cursor-pointer border-b-2 ${
                                activeLink === link.name ? theme==="light" ? "border-primary" : "border-primary" : "border-transparent"}`}
                              onClick={()=> handleLinkClick({link})}
                            >{link.name}</h4>
                        </li>

                      ))
                  }
            
                    {/* Theme Change */}
                  <div className="ml-4">
                  <Link>
                    <button onClick={changeTheme} className={`bg-grey rounded-full w-11 h-11 hover:bg-black/10 ${home===1 ? "bg-black/60" : "bg-grey"} relative`}>
                            <i className={`fi fi-rr-${theme === "light" ? "moon-stars" :"brightness"} ${home===1? "text-white" : "text-black"} text-xl block mt-1`}></i>
                    </button>
                  </Link>
                  </div>
                  
                  <div className="md:ml-8 space-x-3 sm:mr-6">  
                      {
                        access_token ? 
                        <>
                        <div className="z-30" onClick={()=>setUserNavPanel(!userNavPanel)} onBlur={()=>{setTimeout(()=>setUserNavPanel(false),200)}}>
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
          {showSignup && <UserAuth type="signup" close={()=>setShowSignup(false)} open={()=>{setShowSignup(false);setShowSignin(true);}}/>}
          {showSignin && <UserAuth type="signin" close={()=>setShowSignin(false)} open={()=>{setShowSignin(false);setShowSignup(true);}}/>}
      </div>
    </Animation>
  )
}

export default Navbar;
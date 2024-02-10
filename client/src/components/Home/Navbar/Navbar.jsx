import React, { useContext, useState } from "react"
import UserAuth from "../../Authentication/UserAuth";
import { UserContext } from "../../../App";
import { removeFromSession } from "../../../common/session";
import Animation from "../../../common/Animation";
import {Toaster,toast} from "react-hot-toast";
import logo from "../../../assets/icons/logo.png"


const Navbar = () => {
  const {userAuth:{access_token},setUserAuth,isValidToken,setValidToken} = useContext(UserContext);

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
  const [activeLink, setActiveLink] = useState("Home");

  let Links=[
    {name:"Home",link:"/"},
    {name:"Podcast",link:"/"},
    {name:"Blogs",link:"/blogs"},
    {name:"Contact",link:"/"},
    {name:"Subscribe",link:"/"},
  ];

  let [open,setOpen]=useState(false);
  
  return (
    <Animation>
    <Toaster />
      <div className="flex">
      <div className={`w-full opacity-85`}>
            <div className="md:flex items-center justify-between py-4 pt-2 md:px-10 px-7">
            <div className=" cursor-pointer ">
                      <img width={125} height={125} src={logo} alt="Logo" />
            </div>
              <div onClick={()=>setOpen(!open) } className="text-3xl text-white absolute right-8 top-6 cursor-pointer md:hidden" >
                  <ion-icon name={open ?"close":"menu"}></ion-icon>
              </div>
                <ul className={`md:flex md:items-center text-white md:pb-0 pb:12 absolute md:static md:z-auto z-[-1] right-0 md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? "top-20 ":" top-[-490px] " }`} >

                  {
                            Links.map((link)=>(
                              <li key={link.name} className="md:ml-8 text-xl md:my-0 my-7">
                                <a
                                    href={link.link}
                                    className={`hover:border-b-2 hover:border-white duration-500 md:text-2xl tracking-wide font-inter ${
                                      activeLink === link.name ? "border-b-2 border-white" : "border-b-2 border-transparent"}`}
                                    onClick={() => setActiveLink(link.name)}
                                  >{link.name}</a>
                              </li>

                            ))
                  }
                  <div className="md:ml-8 space-x-3 sm:mr-6">           
                      {
                        access_token ? 
                        <>
                          <button onClick={signOut} className="btn-purple text-xl">Sign Out</button>
                        </>
                        : 
                        <>
                        {
                          isValidToken ?
                          <button onClick={()=>setShowSignin(true)} className="btn-purple md:text-xl sm:text-sm font-inter tracking-wide">Sign In</button>
                          :
                          <button onClick={()=>setShowSignup(true)} className="btn-purple md:text-xl sm:text-sm font-inter tracking-wide">Sign Up</button>
                        }
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

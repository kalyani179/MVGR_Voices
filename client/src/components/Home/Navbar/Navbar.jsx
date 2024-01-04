import React, { useContext, useState } from 'react'
import UserAuth from '../../Authentication/UserAuth';
import { UserContext } from '../../../App';
import { removeFromSession } from '../../../common/session';
import Animation from "../../../common/Animation";


const Navbar = () => {
  const {userAuth:{access_token},setUserAuth} = useContext(UserContext);

  const [showSignup,setShowSignup] = useState(false);
  const [showSignin,setShowSignin] = useState(false);

  const signOut = () => {
    // window.location.reload();
    removeFromSession("user");
    setUserAuth({access_token:null});
  }
  
  return (
    <Animation>
      <div className="navbar flex">
          <div className="absolute right-0 space-x-3 mr-5">
            {
              access_token ? 
              <>
                <button onClick={signOut} className="btn-purple">Sign Out</button>
              </>
              : 
              <>
                <button onClick={()=>setShowSignup(true)} className="btn-purple">SignUp</button>
                <button onClick={()=>setShowSignin(true)} className="btn-purple">SignIn</button>
              </>
            }
              
          </div>
          {showSignup && <UserAuth type="signup" close={()=>setShowSignup(false)} open={()=>{setShowSignup(false);setShowSignin(true);}}/>}
          {showSignin && <UserAuth type="signin" close={()=>setShowSignin(false)} open={()=>{setShowSignin(false);setShowSignup(true);}}/>}
      </div>
    </Animation>
  )
}

export default Navbar;
import React, { useState } from 'react'
import UserAuth from '../../../common/UserAuth';


const Navbar = () => {
  const [showSignup,setShowSignup] = useState(false);
  const [showSignin,setShowSignin] = useState(false);
  
  return (
    <div className="navbar flex">
        <div className="absolute right-0 space-x-3 mr-5">
            <button onClick={()=>setShowSignup(true)} className="btn-purple">SignUp</button>
            <button onClick={()=>setShowSignin(true)} className="btn-purple">SignIn</button>
        </div>
      {showSignup && <UserAuth type="signup" close={()=>setShowSignup(false)} />}
      {showSignin && <UserAuth type="signin" close={()=>setShowSignin(false)} />}
    </div>
  )
}

export default Navbar;
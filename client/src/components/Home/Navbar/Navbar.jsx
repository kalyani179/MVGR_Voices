import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="navbar flex">
        <div className="flex gap-4 center">
            <Link className="btn-purple" to="/signup">SignUp</Link>
            <Link className="btn-purple" to="/signin">SignIn</Link>
        </div>
       
    </div>
  )
}

export default Navbar
import React from 'react'

const Signin = ({closeSignin}) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 center">
            <div className="bg-white p-2 rounded">
            <h1>Sign In</h1>
            <button onClick={closeSignin}><i class="fi fi-rr-circle-xmark"></i></button>
            </div>
        </div>
    )
}

export default Signin
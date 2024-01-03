import React from 'react';
import google from "../../assets/images/Icons/search.png";


const GoogleAuth = ({handleGoogleAuth}) => {
    return (
        <div className="google-button">
            <img className="w-5 h-5" src={google} alt="" />
            <button onClick={handleGoogleAuth}>Continue with Google</button>
        </div>
    )
}

export default GoogleAuth;
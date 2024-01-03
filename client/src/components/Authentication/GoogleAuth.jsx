import React from 'react'
import { authWithGoogle } from '../../common/firebase';
import google from "../../assets/images/Icons/search.png";
import toast from "react-hot-toast";
import axios from 'axios';

const GoogleAuth = ({handleGoogleAuth}) => {
    return (
        <div className="google-button">
            <img className="w-5 h-5" src={google} alt="" />
            <button onClick={handleGoogleAuth}>Continue with Google</button>
        </div>
    )
}

export default GoogleAuth
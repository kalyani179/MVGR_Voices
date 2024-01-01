import React from 'react'
import { authWithGoogle } from '../../common/firebase';
import google from "../../assets/images/Icons/search.png";
import toast from "react-hot-toast";
import axios from 'axios';

const GoogleAuth = () => {

    const handleGoogleAuth = (e) =>{
        e.preventDefault();

        authWithGoogle()
        .then((user) => {
            let formData = {
                access_token : user.accessToken
            }
            axios.post("http://localhost:3000/google-auth",formData)
            .then(({data})=>{console.log(data);
                if(data.status) return toast.success(data.status);
            })
            .catch(({response})=>{
                return toast.error(response.data.error);
            })
            
            console.log(user);
        })
        .catch(err=>{
            toast.error("There is some error in signing with google,Please try with Email");
            return console.log(err);
        })
    }
    return (
        <div className="google-button">
            <img className="w-5 h-5" src={google} alt="" />
            <button onClick={handleGoogleAuth}>Continue with Google</button>
        </div>
    )
}

export default GoogleAuth
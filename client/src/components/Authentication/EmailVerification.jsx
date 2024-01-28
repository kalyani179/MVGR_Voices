import axios from 'axios';
import React, { useContext, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../../App';
import {BeatLoader} from "react-spinners"

const EmailVerification = () => {
    let navigate = useNavigate();
    let {username} = useParams();
    let {access_token} = useParams();
    let {isValidToken,setValidToken} = useContext(UserContext);
    const verifyEmail = (username,token) =>{
        axios.post(process.env.REACT_APP_SERVER_DOMAIN+"/verifyEmailToken",{username,token})
        .then(response => {
            if(response.data.status === "okay"){
                setValidToken(true);
                console.log(isValidToken);
            }
        })
    }   
    useEffect(()=>{
        verifyEmail(username,access_token);
    },[])
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            navigate("/");
        }, 5000);

        return () => clearTimeout(timeoutId); // Cleanup the timer on component unmount
    }, []);
    return (
        <div>
            {
                isValidToken ?
                <div className="center flex-col space-y-10">
                    <i class="fi fi-ss-check-circle text-9xl text-green mt-28"></i>
                    <BeatLoader color='#32CD32'/>
                    <p className="text-2xl font-inter">Your Email Has been Verified Successfully! You Can now Signin to access your account!</p>
                </div>
                :
                <div className="center"> Couldn't verify your EmailId or Token has expired.Try again!</div>
            }
        </div>
    )
}

export default EmailVerification;
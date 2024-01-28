import axios from 'axios';
import React, { useContext, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../../App';
import Loader from '../../common/Loader';

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
    return (
        <div>
            {
                isValidToken ?
                <div className="center">
                    Your Email Has been Verified! You are redirected Back to Home.
                    <Loader />
                    {
                        setTimeout(()=>{
                            navigate("../");
                        },5000)
                    }
                </div>
                :
                <div> Couldn't verify your EmailId or Token has expired.Try again!</div>
            }
        </div>
    )
}

export default EmailVerification;
import axios from 'axios';
import React, { useContext, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import { UserContext } from '../../App';

const EmailVerification = () => {
    let {username} = useParams();
    let {access_token} = useParams();
    let {isValidToken,setValidToken} = useContext(UserContext);
    const verifyEmail = (username,token) =>{
        axios.post(process.env.REACT_APP_SERVER_DOMAIN+"/verifyEmailToken",{username,token})
        .then(response => {
            if(response.data.status === "okay"){
                setValidToken(true);
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
                    Email Has been verified. YOu can now
                    <Link to="/">login</Link>
                </div>
                :
                <div> Couldn't verify your EmailId or Token has expired.Try again!</div>
            }
        </div>
    )
}

export default EmailVerification
import axios from 'axios';
import React, { useState } from 'react'
import {Toaster,toast} from "react-hot-toast";

const Signup = ({closeSignup}) => {

    const [data,setData] = useState({fullname:"",email:"",password:""});

    const handleChange = (e) =>{
        setData({...data,[e.target.name]:e.target.value});
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        axios.post("http://localhost:3000/signup",data)
        .then(({data})=>{console.log(data);
            if(data.status) return toast.success(data.status);
            setData({fullname:"",email:"",password:""}); })
        .catch(({response})=>{
            return toast.error(response.data.error)

        })
    }
    return (
        <>
            <Toaster />
            <div className="fixed inset-0 bg-black bg-opacity-50 center">
                
                <div className="bg-white relative p-5 pt-8 rounded-md">
                    <button className="absolute top-2 right-2" onClick={closeSignup}><i className="fi fi-bs-cross-small text-xl text-dark-grey"></i></button>
                    <div className="center">
                        <h1 className="text-center m-5 mb-8">Sign Up</h1>
                    </div>
                    <div>
                        <form className="h-cover flex flex-col gap-5 items-center justify-center">
                            <div className="flex justify-start items-center">
                                <i className="fas fa-user absolute left-8"></i>
                                <input onChange={handleChange} className="pl-7" type="text" name="fullname" placeholder="Full Name" />
                            </div>
                            <div className="flex justify-start items-center">
                                <i class="fas fa-envelope absolute left-8"></i>
                                <input onChange={handleChange} className="pl-7" type="email" name="email" placeholder="Email" />
                            </div>
                            <div className="flex justify-start items-center">
                                <i className="fas fa-lock absolute left-8"></i>
                                <input onChange={handleChange}className="pl-7" type="password" name="password" placeholder="Password" />
                            </div>
                            <button onClick={handleSubmit} type="submit" className="btn-purple font-medium">Submit</button>
                        </form>
                    </div>
                
                </div>
            </div>
        </>
    )
}

export default Signup
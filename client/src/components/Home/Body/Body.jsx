import React from 'react'
//import MVGRVideo from "../../../assets/videos/MVGR.mp4";
import Navbar from '../Navbar/Navbar';
import _top from 'C:/MyLearning/MVGR_Voices/client/src/components/Home/Body/top.jsx'
import _pod1 from './pod1';
import _blog2 from './blog2';
import _faq from './faq';
import {useState } from "react"
const Body = () => {
    const [list,setList]=useState([
        {
            question:'What is your name ?',
            answer:'my name is harshitha',
            active:1
        },
        {
            question:'what do you do ?',
            answer:'pursuing btech 3rd year'
        },
        {
            question:'what do you do ?',
            answer:'pursuing btech 3rd year'
        },
        {
            question:'what do you do ?',
            answer:'pursuing btech 3rd year'
        }
    ]);
    return (             
            <div className="bg-black  ">
               
                    <Navbar />
                    <_top />
                    <_pod1/>
                    <_blog2/>
                    <div className="  flex items-center justify-center ">                     
                        <h1 className="text-[52px] font-semibold mb-4 leading-normal text-primary">FAQ</h1> 
                    </div>                   
                    <div className="flex  p-20 items-center justify-center">
                        <div className="list">
                                    {
                                        list.map((item, key) => (
                                            <_faq key={key} datas={item}/>
                                        ))
                                    }

                        </div>                                    
                    </div> 
                
            </div>
          
    )
}

export default Body
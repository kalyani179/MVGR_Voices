import React from 'react'
//import MVGRVideo from "../../../assets/videos/MVGR.mp4";
import Navbar from '../Navbar/Navbar';
import Top from 'C:/MyLearning/MVGR_Voices/client/src/components/Home/Body/Top.jsx'
import Pod1 from './Pod1';
import Blog2 from './Blog2';
import Faq from './Faq';
import {useState } from "react"
import { Fade } from "react-awesome-reveal";
const Body = () => {
    const [list]=useState([
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

        <div className="bg-black">
                    
           
            <Navbar />    
             <Top/>  
                                  
            <Pod1/>
            <Blog2/>
            <div className=" mt-4 flex items-center justify-center "> 
            <Fade direction='down'>                    
                <h1 className="text-[52px] font-semibold mb-4 leading-normal text-primary">FAQ</h1> 
            </Fade>
            </div>                   
            <div className="flex  p-20 items-center justify-center">
                <Fade>
                <div className="list">
                {
                    list.map((item, key) => (
                        <Faq key={key} datas={item}/>
                    ))                             
                }
                </div>                                    
                </Fade>
            </div> 

        </div>
                        
    )
}

export default Body
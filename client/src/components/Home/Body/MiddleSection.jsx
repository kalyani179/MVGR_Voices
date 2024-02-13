import React from 'react'
import {Zoom, AttentionSeeker } from "react-awesome-reveal";
const MiddleSection = (props) => {
    return (
    <div className="lg:py-40">
            <AttentionSeeker effect="pulse">
                <img className={`absolute -ml-24 -mt-20 rotate-12 ${props.index % 2 === 0 ? "left-0" : "hidden"}`} src={props.img} width={300} height={300} alt=""></img>
            </AttentionSeeker>
            <div className="h-full lg:px-72 text-center flex flex-col justify-center items-center text-white">  
            <Zoom>
                <h1 className="text-6xl tracking-wide uppercase font-merriweather font-semibold mb-8 leading-normal text-primary">{props.title}</h1>
            </Zoom>
                <p className="text-xl tracking-wide">{props.description}</p>
            </div>


        </div>
    )
}

export default MiddleSection;
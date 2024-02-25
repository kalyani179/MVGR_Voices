import React from 'react'
import {Zoom, AttentionSeeker } from "react-awesome-reveal";
const MiddleSection = (props) => {
    return (
    <div className="lg:py-32">
            <AttentionSeeker effect="pulse">
                <img className={`absolute rotate-12 ${props.index===2 ? "h-[350px] w-[250px] -ml-5 -mt-10" : props.index===3 ? "right-0 -mr-20 rotate-6 -mt-32 h-[400px]" : props.index % 2 === 0 ? "left-0 -ml-24 -mt-20" : "right-0 -mr-14 rotate-12 -mt-20 h-[400px]"}`} src={props.img} width={300} height={300} alt=""></img>
            </AttentionSeeker>
            <div className="h-full lg:px-72 text-center flex flex-col justify-center items-center text-white">  
            <Zoom>
                <h1 className="text-6xl tracking-wide uppercase font-merriweather font-semibold mb-8 leading-normal text-primary">{props.title}</h1>
            </Zoom>
                <p className="text-xl tracking-wide w-[90.5%]">{props.description}</p>
            </div>
        </div>
    )
}

export default MiddleSection;
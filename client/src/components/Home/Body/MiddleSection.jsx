import React from 'react'
import { Zoom } from "react-awesome-reveal";
const MiddleSection = (props) => {
    return (
    <div className="  lg:px-56 px-10 lg:py-0 py-10 text-center gap-5 lg:text-start flex lg:flex-row flex-col-reverse justify-between lg:gap-28 items-center">
            <img src={props.img} width={350} height={350} alt=""></img>

            <div className="h-full lg:py-40 flex flex-col justify-center lg:items-start items-center text-white">  
            <Zoom>
                <h1 className="text-6xl tracking-wide uppercase font-merriweather font-semibold mb-8 leading-normal text-primary">{props.title}</h1>
            </Zoom>
                <p className="text-lg tracking-wider">{props.description}</p>
            </div>


        </div>
    )
}

export default MiddleSection;
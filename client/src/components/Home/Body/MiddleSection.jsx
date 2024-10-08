import React, { useContext } from 'react'
import {Zoom, AttentionSeeker } from "react-awesome-reveal";
import { ThemeContext } from '../../../App';
import Lottie from 'lottie-react';
import contact from "../../../assets/animations/contact.json";
import subscribe from "../../../assets/animations/subscribe.json";
import blogs from "../../../assets/animations/blogs.json";
const MiddleSection = (props) => {
    let {theme} = useContext(ThemeContext);
    return (
        <div className="lg:py-32 relative text-center sm:p-5 sm:px-10">
        <AttentionSeeker effect="pulse">
        {
            props.index===2 ?
            <div className="w-[27%] md:absolute md:rotate-2 md:-ml-16 md:-mt-20 z-0 mx-auto sm:w-[100%]">
                <Lottie animationData={contact}/>
            </div>
            : props.index===3?
            <div className="w-[35%] md:absolute md:rotate-5 right-0 md:-mr-24 md:-mt-28 sm:w-[100%]">
                <Lottie animationData={subscribe}/>
            </div>
            :
            <img
                className={`md:absolute z-0 md:rotate-12 mx-auto mt-6 lg:-mt-24 md:mt-0 ${
                props.index === 2
                    ? "sm:h-[200px] sm:w-[150px] md:h-[350px] md:w-[250px] md:-ml-5"
                    : props.index === 3
                    ? "right-0 md:-mr-20 rotate-6 sm:h-[250px]"
                    : props.index % 2 === 0
                    ? "left-0 md:-ml-24 sm:h-[230px] sm:w-[200px]"
                    : "right-0 md:-mr-14 rotate-12 sm:h-[250px] md:h-[400px]"
                } `} /* Centering on smaller screens */
                src={props.img}
                width={300}
                height={300}
                alt=""
            />
        }
            </AttentionSeeker>
        
            <div className={`lg:px-72 mt-5 lg:mt-0 md:mt-0 xl:mt-0 center flex-col ${theme === "light" ? "text-white" : "text-black"}`}>
            <Zoom>
                <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-6xl tracking-wide uppercase font-merriweather font-semibold mb-4 md:mb-8 leading-normal text-primary">{props.title}</h1>
            </Zoom>
            <p className="text-xs md:text-base lg:text-xl xl:text-xl tracking-wide w-full md:w-[90.5%] lg:w-[90.5%]">{props.description}</p>
        </div>

        </div>
    )
}

export default MiddleSection;
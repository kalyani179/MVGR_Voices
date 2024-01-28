import React from 'react'
import { Fade } from "react-awesome-reveal";
const PodBlog = (props) => {
  return (
<div className="  lg:px-56 px-10 lg:py-0 py-10 text-center gap-5 lg:text-start flex lg:flex-row flex-col-reverse justify-between  lg:gap-28 items-center">
        <img src={props.img} width={290} height={290} className="rounded-full border-2 p-1" alt=""></img>
          
        <div className="h-full lg:py-40 flex flex-col justify-center lg:items-start items-center text-white">  
        <Fade direction="down">
               
          <h1 className="text-[52px] font-semibold mb-8 leading-normal text-primary">{props.title}</h1>
        </Fade>
        <Fade direction="up">       
            <p>{props.description}</p></Fade>
        </div>
        
      
    </div>
  )
}

export default PodBlog;

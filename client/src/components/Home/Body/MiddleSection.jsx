import React, { useContext } from 'react'
import {Zoom, AttentionSeeker } from "react-awesome-reveal";
import { ThemeContext } from '../../../App';
const MiddleSection = (props) => {
    let {theme,setTheme} = useContext(ThemeContext);
    return (
<div className="lg:py-32 relative text-center">
  <AttentionSeeker effect="pulse">
    <img
      className={`md:absolute md:rotate-12 mx-auto ${
        props.index === 2
          ? "sm:h-[200px] sm:w-[150px] md:h-[350px] md:w-[250px] md:-ml-5 md:-mt-10"
          : props.index === 3
          ? "right-0 md:-mr-20 rotate-6 md:-mt-32 sm:h-[250px] md:h-[400px]"
          : props.index % 2 === 0
          ? "left-0 md:-ml-24 md:-mt-20"
          : "right-0 md:-mr-14 rotate-12 md:-mt-10 sm:h-[250px] md:h-[400px]"
      } mt-5 lg:mt-0 md:mt-0 xl:mt-0`} /* Centering on smaller screens */
      src={props.img}
      width={300}
      height={300}
      alt=""
    />
  </AttentionSeeker>

  <div className={`lg:px-72 mt-5 lg:mt-0 md:mt-0 xl:mt-0 ${theme === "light" ? "text-white" : "text-black"}`}>
    <Zoom>
      <h1 className="text-5xl md:text-5xl lg:text-6xl xl:text-7xl tracking-wide uppercase font-merriweather font-semibold mb-4 md:mb-8 leading-normal text-primary">{props.title}</h1>
    </Zoom>
    <p className="text-base md:text-xl lg:text-xl xl:text-xl tracking-wide w-full md:w-[90.5%] lg:w-[90.5%]">{props.description}</p>
  </div>
</div>








    )
}

export default MiddleSection;
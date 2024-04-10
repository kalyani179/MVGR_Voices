import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


import React, { useContext, useState } from 'react'
import axios from "axios";
import { ThemeContext } from "../../../App";


const ReviewCarousel = () => {
  const [data, setData] = useState([]);
  let {theme} = useContext(ThemeContext);
  axios.get(process.env.REACT_APP_SERVER_DOMAIN+"/get-all-feedbacks")
  .then(response => {
    setData(response.data);
  }).catch(error => {
    console.log(error);
  })
 
    const settings = {
        autoplay: true,
        autoplaySpeed: 2000, // Adjust the speed as needed
        pauseOnHover: true,
        dots: false,
        infinite: true,
        speed: 2000,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 768, // Adjust the breakpoint according to your design
            settings: {
              slidesToShow: 1
            }
          },
          {
            breakpoint: 1024, // Adjust the breakpoint according to your design
            settings: {
              slidesToShow: 2
            }
          },
          {
            breakpoint: 1440, // Adjust the breakpoint according to your design
            settings: {
              slidesToShow: 3
            }
          }
        ]
    };
    return (
        <div className="block m-auto bg-cool-black w-full">
            <div className="bg-cool-black p-10">
            <Slider {...settings}>
                {data.map((d,i) => (
                <div key={i} className={`flex items-center justify-center ${theme==="light"?"text-white":"text-black"} rounded-xl`}>
                    <div className="flex gap-10 p-4 flex-col items-center justify-center">
                    <p className="text-2xl font-medium font-merriweather text-center tracking-wider">{d.title}</p>
                    <div className="flex gap-3">
                    {Array.from({ length: d.stars }).map((_, index) => (
                                <i key={index} className="fi fi-ss-star text-primary text-xl"></i>
                    ))}
                    </div>
                    <p className="tracking-wider text-base leading-7 text-white font-normal font-lato">{d.review}</p>
                    </div>
                </div>
                ))}
            </Slider>
            </div>
            
        </div>
    );
}


export default ReviewCarousel;
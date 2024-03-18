import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import React from 'react'

const ReviewCarousel = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1
    };
    return (
        <div className="block m-auto w-full">
            <div className="m-10">
            <Slider {...settings}>
                {data.map((d) => (
                <div key={d.name} className="flex items-center justify-center text-white rounded-xl">
                    <div className="flex gap-10 p-4 flex-col items-center justify-center">
                    <p className="text-2xl font-medium font-merriweather tracking-wider">{d.name}</p>
                    <div className="flex gap-2">
                    {Array.from({ length: d.stars }).map((_, index) => (
                                <i key={index} className="fi fi-ss-star text-primary"></i>
                    ))}
                    </div>
                    
                    
                    <p className="text-xl text-center font-inter">{d.review}</p>
                    </div>
                </div>
                ))}
            </Slider>
            </div>
            
        </div>
    );
}

const data = [
  {
    name: `John Morgan`,
    stars:'5',
    img: `/students/John_Morgan.jpg`,
    review: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua`
  },
  {
    name: `Ellie Anderson`,
    stars:'5',
    review: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`
  },
  {
    name: `Nia Adebayo`,
    stars:'5',
    review: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`
  },
  {
    name: `Rigo Louie`,
    stars:'5',
    review: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`
  },
  {
    name: `Mia Williams`,
    stars:'5',
    review: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`
  },
  
];

export default ReviewCarousel;
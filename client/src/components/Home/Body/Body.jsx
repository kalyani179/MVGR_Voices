import React,{useContext, useState} from 'react'
import MVGRVideo from "../../../assets/videos/MVGR.mp4";
import Navbar from '../Navbar/Navbar';
import Faq from './FAQ';
import { Fade, Zoom } from 'react-awesome-reveal';
import MiddleSection from './MiddleSection';
import Content from './Content';
import { ThemeContext } from '../../../App';

import ReviewCarousel from '../Review Carousel/Carousel';
import FeedbackForm from '../Review Carousel/FeedBackForm';
import Footer from '../Footer/Footer';
import FooterData from '../Footer/FooterData';


const Body = () => {
    let {theme,setTheme} = useContext(ThemeContext);

    const [list]=useState([
        {
            question:'How Can I upload the Audio?',
            answer:'you can go to the podcast section,and click on upload and provide mentioned details of the Audio.',
            active:1
        },
        {
            question:'How Can I write the blogs?',
            answer:'You have the option write in the blogs section to write the blogs.'
        },
        {
            question:'How will my Audio or Blog get published?',
            answer:'Your Audio or Blog will be reviewed by the Admin and then gets published.'
        },
        {
            question:'How Can I know if any podcast or blog published?',
            answer:'You will get a mail to ur registered Email ID whenever a blog or podcast is published on this website.'
        }
    ]);
    return (
        <div>
            <div>
                <video autoPlay loop muted className="w-full max-h-screen object-cover">
                    <source src={MVGRVideo} type="video/mp4"/>
                </video>
                <div className={`absolute inset-0 ${theme === "light" ? "background" : "background"}`}>
                    <Navbar />
                    <div className="center flex-col gap-8 md:mt-11">
                        <h1 className={`text-4xl md:text-5xl lg:text-6xl xl:text-6xl  ${theme === "light" ? "text-white" : "text-black"} font-extrabold mt-5 md:mt-20 lg:mt-28 xl:mt-32 tracking-wider text-center opacity-80`}>
                        Welcome to <span className="text-4xl md:text-5xl lg:text-6xl xl:text-6xl font-extrabold ml-2 text-primary tracking-normal"> MVGR VOICES</span>
                        </h1>
                        <p className={`sm:text-sm text-base md:text-lg lg:text-xl ${theme === "light" ? "text-white" : "text-black"} font-semibold tracking-widest uppercase text-center opacity-80`}>
                        It's the best platform for Students to share their cool stories in podcasts and blogs.
                        </p>
                    </div>

                </div>
            </div>
            <div className={`${theme==="light" ? "bg-black" : "bg-white"}`}>
                {Content.map((Content,index) =>(
                    <MiddleSection 
                        index={index}
                        title={Content.title}
                        description={Content.description}
                        img={Content.img}
                    />  
                ))}
            </div>                
            <div className={`${theme==="light" ? "bg-black" : "bg-white"} pt-20 flex items-center justify-center`}> 
            <Fade direction='down' delay={0.2}>                    
                <h1 className="text-6xl font-merriweather font-semibold leading-normal text-primary">FAQ's</h1> 
            </Fade>
            </div>                   
            <div className={`${theme==="light" ? "bg-black" : "bg-white"} flex p-20 pt-8 items-center justify-center`}>
                <Zoom>
                <div className="list">
                {
                    list.map((item, key) => (
                        <Faq key={key} datas={item}/>
                    ))                             
                }
                </div>                                    
                </Zoom>
            </div> 
            <div className="bg-black p-8 pt-20">
                <Zoom>
                    <h1 className="text-5xl text-center font-gelasio tracking-wider font-semibold leading-normal text-primary">What Users Are Saying !</h1>
                </Zoom>
                <ReviewCarousel />
            </div>
                
            <div className="fixed left-11 bottom-11">
                <FeedbackForm />
            </div>

            <div className="bg-black">
                <Footer />
            </div>

            </div>
    )
}

export default Body;
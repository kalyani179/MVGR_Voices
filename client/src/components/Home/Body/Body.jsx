import React,{useContext, useState} from 'react'
import MVGRVideo from "../../../assets/videos/MVGR.mp4";
import Navbar from '../Navbar/Navbar';
import Faq from './FAQs';
import { Fade, Zoom } from 'react-awesome-reveal';
import MiddleSection from './MiddleSection';
import Content from './Content';
import { ThemeContext } from '../../../App';

import ReviewCarousel from '../Review Carousel/Carousel';
import FeedbackForm from '../Review Carousel/FeedBackForm';
import Footer from '../Footer/Footer';



const Body = () => {
    let {theme,setTheme} = useContext(ThemeContext);

    const [list]=useState([
        {
            question:'Who is eligible to write blogs or upload podcasts on MVGR Voices?',
            answer:'Anyone who is interested in sharing their ideas, expertise, or stories is welcome to contribute to MVGR Voices by writing blogs or uploading podcasts.',
            active:1
        },
        {
            "question": "How do I submit my own podcast or blog post to MVGR Voices?",
            "answer": "Simply sign in, go to your profile, and access the dashboard. From there, you can click on 'Upload' to submit a podcast or 'Write' to create a blog. It's that easy!"
        },
        {
            question:'Are there any restrictions on the type of content I can upload?',
            answer:'While there are no specific restrictions, we encourage contributors to ensure their content is of good quality and interesting to our audience.'
        },
        {
            question:'Do I need to sign in to listen to podcasts or read blogs?',
            answer:"You can access the blogs and podcasts sections without signing in, but to listen to podcasts or view blog content, you'll need to sign in."
        }
    ]);
    return (
        <div className="bg-black">
            <div className="bg-black">
                <video autoPlay loop muted className="w-full max-h-screen object-cover">
                    <source src={MVGRVideo} type="video/mp4"/>
                </video>
                <div className={`absolute inset-0 ${theme === "light" ? "background" : "background"}`}>
                    <Navbar />
                    <div className="center flex-col gap-8 md:mt-11">
                        <h1 className={`text-3xl md:text-5xl lg:text-6xl xl:text-6xl ${theme === "light" ? "text-white" : "text-black"} font-extrabold mt-5 md:mt-20 lg:mt-28 xl:mt-32 tracking-wider text-center opacity-80`}>
                            Welcome to <span className="text-3xl md:text-5xl lg:text-6xl xl:text-6xl font-extrabold ml-2 text-primary tracking-normal">MVGR VOICES</span>
                        </h1>
                        <p className={`sm:text-xs text-base md:text-lg lg:text-xl ${theme === "light" ? "text-white" : "text-black"} font-semibold tracking-widest uppercase text-center opacity-80`}>
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
            <div className={`${theme==="light" ? "bg-black" : "bg-white"} pt-10 md:pt-20 flex items-center justify-center`}> 
    <Fade direction='down' delay={0.2}>                    
        <h1 className="md:text-6xl text-4xl font-merriweather font-semibold leading-normal text-primary">FAQ's</h1> 
    </Fade>
</div>                   

<div className={`${theme==="light" ? "bg-black" : "bg-white"} flex flex-col md:flex-row px-6 md:px-20 mb-6 md:mb-20 py-4 md:py-8 items-center justify-center`}>
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
            <div className="bg-cool-black p-8 pt-20 shadow-xl">
                <Zoom>
                    <h1 className="text-5xl text-center font-gelasio tracking-wider font-semibold leading-normal text-primary pb-10">What Users Are Saying !</h1>
                </Zoom>
                <ReviewCarousel />
            </div>
                
            <div className="fixed left-11 bottom-11">
                <FeedbackForm />
            </div>

            <div className="bg-cool-black">
                <Footer />
            </div>

            </div>
    )
}

export default Body;
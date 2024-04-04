import React, { useContext } from 'react';
import PageNotFoundImage from "../assets/images/Home/404.png"
import PageNotFoundAnimation from "../assets/animations/pageNotFound.json";
import DarkPageNotFoundAnimation from "../assets/animations/DarkPageNotFound.json"
import { Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import { ThemeContext } from '../App';

const PageNotFound = () => {
    let {theme} = useContext(ThemeContext);
    return(
        <section className={`h-screen ${theme==="light" ? "bg-white" : "bg-cool-black"} bg-cool-black relative p-10 flex flex-col items-center gap-5 text-center`}>
            {/* <img src={PageNotFoundImage} className="select-none border-2 border-grey w-72 aspect-square object-cover rounded" alt="404"/> */}
            {
                theme==="light" ?
                <div className="w-[35%] sm:w-[100%]">
                    <Lottie animationData={PageNotFoundAnimation}/>
                </div> :
                <div className="w-[35%] sm:w-[100%]">
                    <Lottie animationData={DarkPageNotFoundAnimation}/>
                </div>
            }
            {/* <h1 className="text-4xl font-gelasio leading-7">Page Not Found</h1> */}
            <p className="text-dark-grey text-lg sm:text-xs sm:leading-5">The Page you are looking for doesn't exists.Please Head Back to the <Link to="/" className="text-primary underline">Home Page</Link> !</p>
        </section>
    )
}

export default PageNotFound
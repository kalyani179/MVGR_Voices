import React from 'react';
import PageNotFoundImage from "../assets/images/Home/404.png"
import PageNotFoundAnimation from "../assets/animations/pageNotFound.json";
import { Link } from 'react-router-dom';
import Lottie from 'lottie-react';

const PageNotFound = () => {
    return (
        <section className="h-screen relative p-10 flex flex-col items-center gap-5 text-center">
            {/* <img src={PageNotFoundImage} className="select-none border-2 border-grey w-72 aspect-square object-cover rounded" alt="404"/> */}
            <div className="w-[35%]">
                <Lottie animationData={PageNotFoundAnimation}/>
            </div>
            {/* <h1 className="text-4xl font-gelasio leading-7">Page Not Found</h1> */}
            <p className="text-dark-grey text-lg">The Page you are looking for doesn't exists.Please Head Back to the <Link to="/" className="text-primary underline">Home Page</Link> !</p>
        </section>
    )
}

export default PageNotFound
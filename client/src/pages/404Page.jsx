import React from 'react';
import PageNotFoundImage from "../assets/images/Home/404.png"
import { Link } from 'react-router-dom';

const PageNotFound = () => {
    return (
        <section className="h-cover relative p-10 flex flex-col items-center gap-20 text-center">
            <img src={PageNotFoundImage} className="select-none border-2 border-grey w-72 aspect-square object-cover rounded"/>
            <h1 className="text-4xl font-gelasio leading-7">Page Not Found</h1>
            <p className="text-dark-grey text-lg leading-7 -mt-8">The Page you are looking for doesn't exists.Please Head Back to the <Link to="/" className="text-primary underline">Home Page</Link></p>
        </section>
    )
}

export default PageNotFound
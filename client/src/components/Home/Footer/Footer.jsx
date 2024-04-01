import React from 'react';
import FooterData from './FooterData';

const Footer = () => {
    return (
        <>
        <div className="relative w-full h-48 overflow-hidden">
            <div className="bg-wave bg-wave1"></div>
            {/* <div className=" bg-wave bg-wave2"></div> */}
            {/* <div className=" bg-wave bg-wave3"></div> */}
            {/* <div className="  bg-wave bg-wave4"></div> */}
        </div>
        <FooterData />
        </>
    );
}

export default Footer;
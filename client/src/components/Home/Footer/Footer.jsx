import React from 'react';
import FooterData from './FooterData';

const Footer = () => {
    return (
        <>
        <div className="relative w-auto h-48 overflow-hidden z-10">
            <div className="bg-wave sm:h-28 bg-wave1"></div>
            {/* <div className=" bg-wave bg-wave2"></div> */}
            {/* <div className=" bg-wave bg-wave3"></div> */}
            {/* <div className="  bg-wave bg-wave4"></div> */}
        </div>
        <FooterData />
        </>
    );
}

export default Footer;
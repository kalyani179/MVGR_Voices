import React from 'react';
import FooterData from './FooterData';

const Footer = () => {
    return (
        <>
        <div className="relative w-full h-56 overflow-hidden">
            <div className="absolute bottom-0 left-0 w-full h-24 bg-wave bg-wave1"></div>
            <div className="absolute bottom-0 left-0 w-full h-24 bg-wave bg-wave2"></div>
            <div className="absolute bottom-0 left-0 w-full h-24 bg-wave bg-wave3"></div>
            <div className="absolute bottom-0 left-0 w-full h-24 bg-wave bg-wave4"></div>
        </div>
        <FooterData />
        </>
    );
}

export default Footer;
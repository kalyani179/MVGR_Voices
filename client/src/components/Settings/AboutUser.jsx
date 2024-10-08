import React from 'react'
import { Link } from 'react-router-dom';
import { getFullDate } from '../../common/Date';

const AboutUser = ({className,bio,social_links,joinedAt}) => {
    return (
        <div className={"md-w-[90%] "+className}>
            <p className="text-lg leading-7">{bio.length ? bio : "Nothing to read here"}</p>
            <div className="flex gap-x-7 gap-y-2 flex-wrap my-2 items-center text-dark-grey">
                {
                    Object.keys(social_links).map((key)=>{
                        let link = social_links[key];
                        return link ? 
                        <Link to={link} key={key} target="_blank">
                            <i className={`key ${key!=="website" ?"fi-brands-"+key : "fi-rr-globe"} text-2xl hover:text-black`}></i>
                        </Link> :
                        ""
                    })
                }
            </div>
            <p className="text-lg text-dark-grey">Joined on {getFullDate(joinedAt)}</p>
        </div>
    )
}

export default AboutUser
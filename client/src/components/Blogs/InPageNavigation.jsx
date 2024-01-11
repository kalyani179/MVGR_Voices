import React,{useEffect, useState} from 'react'
import axios from 'axios';

const InPageNavigation = ({routes,children}) => {
    const [activeTab,setActiveTab] = useState("home");
    return (
        <>
            <div className="relative mb-8 bg-white border-b border-grey flex flex-nowrap overflow-x-auto">
                {
                    routes.map((route,index)=>{
                        return(
                            <button onClick={()=>setActiveTab(route)} key={index} className={`p-4 px-5 capitalize text-lg ${activeTab===route ?"border-b border-black text-black":"text-dark-grey" } ${route==="trending blogs" ? "md:hidden" : ""}`}>{route}</button>
                        ) 
                    })
                }
            </div>
            {children}
            {/* <div>
                {
                    activeTab==="home" && <h1>This is Home</h1>
                }
                {
                    activeTab === "trending blogs" && <h1>This is Trending Blogs</h1>
                }
            </div> */}
        </>
    )
}

export default InPageNavigation
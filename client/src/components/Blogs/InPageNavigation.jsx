import React,{useState} from 'react'

const InPageNavigation = ({routes}) => {
    const [activeTab,setActiveTab] = useState("home");
    return (
        <>
            <div className="relative mb-8 bg-white border-b border-grey flex flex-nowrap overflow-x-auto">
                {
                    routes.map((route,index)=>{
                        return(
                            <button onClick={()=>setActiveTab(route)} key={index} className={`p-4 px-5 capitalize text-dark-grey text-lg ${activeTab===route ?"text-black border-b border-black":"" } ${route==="trending blogs" ? "md:hidden" : ""}`}>{route}</button>
                        ) 
                    })
                }
            </div>
            <div>
                {
                    activeTab==="home" && <h1>This is Home</h1>
                }
                {
                    activeTab === "trending blogs" && <h1>This is Trending Blogs</h1>
                }
            </div>
        </>
    )
}

export default InPageNavigation
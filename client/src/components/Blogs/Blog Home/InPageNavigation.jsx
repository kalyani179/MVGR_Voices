import React,{useEffect, useState} from 'react'

const InPageNavigation = ({routes,defaultHidden=[],defaultActiveTab = 0,children}) => {
    const [activeTab,setActiveTab] = useState(defaultActiveTab);
    let [isResizeEventAdded,setIsResizeEventAdded] = useState(false);
    let [width,setWidth] = useState(window.innerWidth);
    useEffect(()=>{
        if(width>768 && activeTab!==defaultActiveTab){
            setActiveTab(defaultActiveTab);
        }
        if(!isResizeEventAdded){
            window.addEventListener("resize",()=>{
                if(!isResizeEventAdded) setIsResizeEventAdded(true);
                setWidth(window.innerWidth);
            })
        }
    },[width])
    return (
        <>
            <div className="relative mb-8 border-b border-white/80 flex flex-nowrap overflow-x-auto">
                {
                    routes.map((route,index)=>{
                        return(
                            <button key={index} 
                            onClick={()=>{setActiveTab(index)}} className={`p-4 px-5 capitalize text-xl tracking-wide  ${activeTab===index ? "text-primary font-medium border-b-2 border-primary" : "text-dark-grey"} ${defaultHidden.includes(route) ? "md:hidden":""}`}>{route}</button>
                        )
                    })
                }
            </div>
            {Array.isArray(children) ? children[activeTab] : children}
        </>
    )
}

export default InPageNavigation
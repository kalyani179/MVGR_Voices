import React,{useState} from 'react'

const InPageNavigation = ({routes,defaultHidden=[],defaultActiveTab = 0,children}) => {
    const [activeTab,setActiveTab] = useState(defaultActiveTab);
    return (
        <>
            <div className="relative mb-8 bg-white border-b border-grey flex flex-nowrap overflow-x-auto">
                {
                    routes.map((route,index)=>{
                        return(
                            <button key={index} 
                            onClick={()=>{setActiveTab(index)}} className={`p-4 px-5 capitalize text-lg tracking-wide  ${activeTab===index ? "text-primary font-medium border-b-2 border-primary" : "text-dark-grey"} ${defaultHidden.includes(route) ? "md:hidden":""}`}>{route}</button>
                        )
                    })
                }
            </div>
            {Array.isArray(children) ? children[activeTab] : children}
        </>
    )
}

export default InPageNavigation
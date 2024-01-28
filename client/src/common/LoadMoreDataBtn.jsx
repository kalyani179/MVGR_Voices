import React from 'react'

const LoadMoreDataBtn = ({state,fetchDataFunc}) => {
    if(state!=null && state.totalDocs > state.results.length){
        return (
            <button onClick={()=>fetchDataFunc({page:state.page+1})}
            className="text-primary font-medium p-2 px-3 rounded-md flex items-center">
                Load More
            </button>
        )
    }
}

export default LoadMoreDataBtn
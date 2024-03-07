import React from 'react'

const NoBlogsDataMessage = ({message}) => {
    return (
        <div>
            <p className="text-center w-full p-4 rounded-full bg-grey/50 mt-4">{message}</p>
        </div>
    )
}

export default NoBlogsDataMessage;
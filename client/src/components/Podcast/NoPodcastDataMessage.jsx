import React from 'react'

const NoPodcastDataMessage = ({message}) => {
    return (
        <div className="">
            <p className="text-center text-primary text-xl font-medium p-4 px-20 rounded-full bg-grey/85 mt-4">{message}</p>
        </div>
    )
}

export default NoPodcastDataMessage;
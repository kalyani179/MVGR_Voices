import React from 'react'

const NoDataMessage = ({message}) => {
    return (
        <div className="">
            <p className="text-center text-primary text-lg font-medium p-4 px-20 rounded-full bg-grey/10 mt-4">{message}</p>
        </div>
    )
}

export default NoDataMessage;
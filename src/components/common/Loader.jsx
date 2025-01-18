import React from 'react'

const Loader = ({height}) => {
    return (
        <div className={`${height} h-[${height}]  flex justify-center items-center bg-gray-500`}>
            <div className="loader"></div>
        </div>
    )
}

export default Loader;

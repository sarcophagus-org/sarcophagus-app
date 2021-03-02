import React from 'react'

const MockSarcophagus = ({message, handleClick}) => {
    return (
        <div className="border border-white text-white text-md flex px-4 my-8 pt-2 justify-between relative max-w-128" style={{height: '4.375rem'}}>
            <div className="text-center h-full w-full text-white absolute top-0 left-0 flex justify-center items-center cursor-pointer" onClick={handleClick}>{message}</div>
        </div>
    )
}

export default MockSarcophagus
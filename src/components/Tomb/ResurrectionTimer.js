import React from 'react'

const ResurrectionTimer = ({state, timer, color="text-gray-400", timers}) => {
    return (
        <div className={`text-sm ${timers ? color : 'text-red'}`} style={{lineHeight: '1.0625rem'}}>
            {state !== 2 && `Resurrection: ${timer}`}
        </div>
    )
}

export default ResurrectionTimer
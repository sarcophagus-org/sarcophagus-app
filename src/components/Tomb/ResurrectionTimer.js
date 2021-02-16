import React from 'react'

const ResurrectionTimer = ({timer, color="text-gray-400", timers}) => {
    return (
        <div className={`text-sm ${timers ? color : 'text-red'}`} style={{lineHeight: '1.0625rem'}}>
            Resurrection: {timer}
        </div>
    )
}

export default ResurrectionTimer
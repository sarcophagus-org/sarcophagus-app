import React from 'react'
import { useResurrectionTimer } from '../customHooks/useTimers'

const ResurrectionTimer = ({resurrectionTime}) => {
    const { timeTillResurrection } = useResurrectionTimer(resurrectionTime)
    return (
        <div className="text-sm" style={{lineHeight: '1.0625rem'}}>
            Resurrection: {timeTillResurrection}
        </div>
    )
}

export default ResurrectionTimer
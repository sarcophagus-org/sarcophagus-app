
import { useState, useEffect } from "react"
import { TIMER_DEFAULT } from "../../constants"
import { makeNumeral } from "../../utils/bigNumbers"
import { getTimeRemaining } from "../../utils/datetime"


const useResurrectionTimer = (resurrectionTime) => {
    const [ timeTillResurrection, setTime ] = useState(TIMER_DEFAULT)

    useEffect(() => {
        // Multiply time by 1000 to get correct UTC time
        const UTCTime = makeNumeral(resurrectionTime, 0).value() * 1000
        const resurrectionDate = new Date(UTCTime)
        setInterval(() => {
            const remainingTime = getTimeRemaining(resurrectionDate)
            setTime(remainingTime)
            if(Math.sign(UTCTime - Date.now().valueOf() < 0)) clearInterval()
        }, 1000)
        return () => clearInterval()
    }, [resurrectionTime])
    
    
    

    return {timeTillResurrection}
}

export { useResurrectionTimer }
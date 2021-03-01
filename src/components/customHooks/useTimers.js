
import { useState, useEffect, useCallback } from "react"
import { TIMER_DEFAULT, DEFAULT_COLOR, STATUSES } from "../../constants"
import { makeNumeral } from "../../utils/bigNumbers"
import { getTimeRemaining } from "../../utils/datetime"


const useResurrectionTimer = (time, resWindowTime, currentStatus) => {
    const [ resWindowTimerActive, setResWindowTimer ] = useState(false)
    const [ timer, setTime ] = useState(TIMER_DEFAULT)
    const [ timers, setTimers ] = useState(true)
    const [ color, setColor ] = useState(DEFAULT_COLOR)

    const setColors = useCallback((time) => {
        // ensure timezone offset is applied
        const timeZoneOffset = time.getTimezoneOffset()
        time.setMinutes(time.getMinutes() + timeZoneOffset)
        const total = time - Date.parse(new Date());
        const days = Math.floor( total/(1000*60*60*24) );
        const hours = Math.floor( (total/(1000*60*60)) % 24);
        if(resWindowTimerActive) return setColor('text-yellow')
        else if (days === 0 && hours < 24) return setColor('text-red')
        else return setColor('text-gray-400')
    },[setColor, resWindowTimerActive])


    useEffect(() => {
        if(currentStatus === STATUSES.TRANSACTION_MINING_IN_PROGRESS) {
            setTime('re-calculating...')
            return
        }
        if(resWindowTimerActive) return
        const UTCTime = makeNumeral(time, 0).value() * 1000
        const timer = setInterval(() => {
            if(Math.sign(UTCTime - Date.now().valueOf() <= 0)) {
                setResWindowTimer(true)
                return clearInterval(timer)
            }
            const resDate = new Date(UTCTime)
            const remainingTime = getTimeRemaining(resDate)
            setTime(remainingTime)
            setColors(resDate)
            }, 1000)
        return () => clearInterval(timer)
    }, [time, timers, setColors, resWindowTimerActive, currentStatus])

    useEffect(() => {
        if(!resWindowTimerActive) return
        const UTCTime = makeNumeral(time, 0).value() * 1000
        const UTCWindow = makeNumeral(resWindowTime, 0).value() * 1000
        const timer = setInterval(() => {
            if(Math.sign((UTCTime + UTCWindow) - Date.now().valueOf() <= 0)) {
                setTime(TIMER_DEFAULT)
                setColor('text-red')
                setTimers(false)
                return clearInterval(timer)
            }
            const resDate = new Date(UTCTime + UTCWindow)
            const remainingTime = getTimeRemaining(resDate)
            setTime(remainingTime)
            setColors(resDate)
            }, 1000)
        return () => clearInterval(timer)
    }, [resWindowTime, resWindowTimerActive, setColors, time])
    
    return {timer, color, timers}
}

export { useResurrectionTimer }
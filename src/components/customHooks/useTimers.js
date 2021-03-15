
import { useState, useEffect, useCallback, useRef } from "react"
import { TIMER_DEFAULT, DEFAULT_COLOR, STATUSES } from "../../constants"
import { getTimeRemaining } from "../../utils/datetime"


const useResurrectionTimer = (time, resWindowTime, currentStatus, setCurrentStatus) => {
    const timerID = useRef(null)
    const [ resTime, setResTime ] = useState(time.toNumber())
    const [ resWindow, setWindowTime ] = useState(resWindowTime.toNumber())
    const [ inWindow, setInWindow ] = useState(false)
    const [ timer, setTime ] = useState(TIMER_DEFAULT)
    const [ timers, setTimers ] = useState(false)
    const [ color, setColor ] = useState(DEFAULT_COLOR)

    const setColors = useCallback((resTime) => {
        if(inWindow) return setColor('text-yellow')
        const total = resTime - Date.parse(new Date());
        const days = Math.floor( total/(1000*60*60*24) );
        const hours = Math.floor( (total/(1000*60*60)) % 24);
        if (days === 0 && hours < 24) return setColor('text-red')
        else return setColor('text-gray-400')
    },[setColor, inWindow])


    // resets all timers
    const refreshTimers = useCallback(() => {
        setResTime(0)
        setWindowTime(0)
        setTime('recalculating...')
        clearInterval(timerID.current)
    },[ timerID ])

    // checks for changes
    useEffect(() => {
        setResTime(time.toNumber())
        setWindowTime(resWindowTime.toNumber())
    }, [time, resWindowTime])

    // sets current timer
    useEffect(() => {
        if(!resTime) return setTimers(false)
        const resurrectionTime = resTime * 1000
        const windowTime = (resTime + resWindow) * 1000
        if(currentStatus === STATUSES.TRANSACTION_MINING_IN_PROGRESS) {
            refreshTimers()
            return
        }
        else if(!!Math.sign(resurrectionTime - Date.now().valueOf() <= 0)) {
            setCurrentStatus?.(STATUSES.UNWRAPPING)
            // resurrection window active
            setInWindow(true)
            setTimers(true)
            timerID.current = setInterval(() => {
                const currentWindowTime = new Date(windowTime)
                const remainingTime = getTimeRemaining(currentWindowTime)
                setTime(remainingTime)
                setColors(currentWindowTime)
                if(!!Math.sign(windowTime - Date.now().valueOf() <= 0)) {
                    setTimers(false)
                    setTime(TIMER_DEFAULT)  
                    clearInterval(timerID.current)
                }
            }, 1000)
            return () => clearInterval(timerID.current)
        } else if(!!Math.sign(windowTime - Date.now().valueOf() <= 0)) {
            // no timers active
            setTimers(false)
            setInWindow(false)
        } else {
            // resurrection timer active
            setInWindow(false)
            setTimers(true)
            timerID.current = setInterval(() => {
                const currentDateTime = new Date(resurrectionTime)
                const remainingTime = getTimeRemaining(currentDateTime)
                setTime(remainingTime)
                setColors(currentDateTime)
                if(!!Math.sign(resurrectionTime - Date.now().valueOf() <= 0)) {
                    setInWindow(true)
                    setTime(TIMER_DEFAULT)
                    clearInterval(timerID.current)
                }
            }, 1000)
        return () => clearInterval(timerID.current)
        }

    },[ resTime, resWindow, setColors, currentStatus, resWindowTime, refreshTimers, setCurrentStatus]) 

    return {timer, color, timers, refreshTimers}
}

export { useResurrectionTimer }
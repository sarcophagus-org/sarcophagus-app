import React from 'react'
import { CANCEL_TOOLTIP, CLEAN_TOOlTIP, STATUSES } from '../../../constants'
import { useSarcophagiData } from '../../Context/SarcophagiContext'

import Tooltip from '../../layout/Tooltip'
import Button from '../../layout/Button'
import Rewrap from './Rewrap'

const Sign = ({sarcophagus, setCurrentStatus, refresh, toggle, refreshTimers, setError}) => { 
    const { updateSarcophagus, cancelSarcophagus } = useSarcophagiData()

    const handleUpdate = async () => {
        await updateSarcophagus(sarcophagus, setCurrentStatus, refresh, toggle, setError)
    }

    const handleCancel = async () => {
        await cancelSarcophagus(sarcophagus, setCurrentStatus, toggle, refresh, refreshTimers)
    }
    return (
        <div className="flex flex-col items-center justify-center h-full relative gap-8" style={{height: '12.0625rem'}}>
            <Button type="button" onClick={handleUpdate} label="Sign" />
            <div className="whitespace-nowrap flex underline cursor-pointer" onClick={handleCancel}>
                <span className="mr-2">Cancel this sarcophagus</span>
                <Tooltip content={CANCEL_TOOLTIP} />
            </div>
        </div>
    )
}

const ErrorOptions = ({sarcophagus, refresh, toggle, setCurrentStatus, refreshTimers, setError}) => {
    const { cancelSarcophagus } = useSarcophagiData()
    const handleCancel = async () => {
        await cancelSarcophagus(sarcophagus, setCurrentStatus, toggle, refresh, refreshTimers)
        await setError(false)
    }
    return (
        <div className="flex flex-col items-center justify-center h-full gap-8" style={{height: '12.0625rem'}}>
            <div className="whitespace-nowrap flex underline cursor-pointer" onClick={handleCancel}>
                <span className="mr-2">Cancel this sarcophagus</span>
                <Tooltip content={CANCEL_TOOLTIP} />
            </div>
        </div>
    )
}

const WindowClosed = ({sarcophagus, toggle, refresh, archaeologist, setCurrentStatus, refreshTimers, setError}) => {
    const { cleanSarcophagus } = useSarcophagiData()
    const handleClean = async () => {
        await cleanSarcophagus(sarcophagus, setCurrentStatus, archaeologist, toggle, refresh, refreshTimers)
        await setError(false)
    }
    return (
        <div className="flex flex-col items-center justify-center h-full relative gap-8" style={{height: '12.0625rem'}}>
        <div className="whitespace-nowrap flex underline cursor-pointer" onClick={handleClean}>
            <span className="mr-2">Clean this sarcophagus</span>
            <Tooltip content={CLEAN_TOOlTIP} />
        </div>
    </div>
        )
}

const SarcophagusExpanded = ({ sarcophagus, archaeologist, currentStatus, error, setError, setCurrentStatus, toggle, refresh, refreshTimers }) => {
    return (
        <div className="text-white text-md relative flex flex-col overflow-x-scroll hide-scrollbar max-w-128">
            {error && <ErrorOptions setError={setError} sarcophagus={sarcophagus} refresh={refresh} toggle={toggle} error={error} setCurrentStatus={setCurrentStatus} refreshTimers={refreshTimers}/>}
            {/* If resurrection window is closed*/}
            {currentStatus === STATUSES.WINDOW_CLOSED && <WindowClosed setError={setError} sarcophagus={sarcophagus} archaeologist={archaeologist} refresh={refresh} toggle={toggle} setCurrentStatus={setCurrentStatus} refreshTimers={refreshTimers}/>}
            {/* If status is signing needed */}
            {currentStatus === STATUSES.SARCOPHAGUS_AWAIT_SIGN && <Sign sarcophagus={sarcophagus} setCurrentStatus={setCurrentStatus} refresh={refresh} toggle={toggle} refreshTimers={refreshTimers} setError={setError}/>}
            {/* if active then allow rewrap */}
            {currentStatus === STATUSES.ACTIVE && !!archaeologist &&  <Rewrap sarcophagus={sarcophagus} archaeologist={archaeologist} refreshTimers={refreshTimers} setCurrentStatus={setCurrentStatus} toggle={toggle} refresh={refresh} />}

        </div>
    )}

export default SarcophagusExpanded 
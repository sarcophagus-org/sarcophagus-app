import React from 'react'
import { STATUSES } from '../../../constants'
import useCollaspe from '../../customHooks/useCollaspe'
import { useResurrectionTimer } from '../../customHooks/useTimers'
import SarcophagusCollasped from './SarcophagusCollasped'
import SarcophagusExpanded from './SarcophagusExpanded'

const SarcophagusContainer = ({ sarcophagus, currentStatus, setCurrentStatus, error, archaeologist , refresh}) => {
    const { timer, color, timers } = useResurrectionTimer(sarcophagus.resurrectionTime, sarcophagus.resurrectionWindow, currentStatus)
    const { collasped, toggle } = useCollaspe(true, true)
    return (
        <div className="border border-gray-500 px-4 my-8 pt-3 ">

            <SarcophagusCollasped sarcophagus={sarcophagus} currentStatus={currentStatus} error={currentStatus === STATUSES.TRANACTION_MINING_IN_PROGRESS ? false : error} expandedOption={currentStatus === STATUSES.TRANACTION_MINING_IN_PROGRESS ? false : currentStatus === STATUSES.SARCOPHAGUS_AWAIT_SIGN || currentStatus === STATUSES.PROCESS_COMPLETE || !!error || !timers} toggle={toggle} timer={timer} color={color} timers={timers}/>
            {!collasped && (
                <SarcophagusExpanded sarcophagus={sarcophagus} currentStatus={currentStatus} refresh={refresh} setCurrentStatus={setCurrentStatus} error={error} toggle={toggle} archaeologist={archaeologist} timer={timer} color={color} timers={timers} />
                )}
        </div>
    )
}

export default SarcophagusContainer
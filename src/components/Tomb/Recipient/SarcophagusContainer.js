import React from 'react'
import { RECIPIENT_STATUSES } from '../../../constants'
import useCollapse from '../../customHooks/useCollapse'
import { useResurrectionTimer } from '../../customHooks/useTimers'
import SarcophagusCollapsed from './SarcophagusCollapsed'
import SarcophagusExpanded from './SarcophagusExpanded'

const RecipientSarcophagusContainer = ({ sarcophagus, currentStatus, error, ...rest }) => {
    const { timer, color, timers } = useResurrectionTimer(sarcophagus.resurrectionTime, sarcophagus.resurrectionWindow, currentStatus)
    const { collapsed, toggle } = useCollapse(true, true)
    return (
        <div className="border border-gray-500 px-4 my-8 pt-3">
            <SarcophagusCollapsed sarcophagus={sarcophagus} toggle={toggle} collapsed={collapsed} expandedOption={currentStatus === RECIPIENT_STATUSES.UNWRAPPED || !!error} status={currentStatus} error={error} timer={timer} color={color} timers={timers}/>
            {!collapsed && (
                <SarcophagusExpanded sarcophagus={sarcophagus} currentStatus={currentStatus} error={error} toggle={toggle} {...rest} />
            )}
        </div>
    )
}

export default RecipientSarcophagusContainer
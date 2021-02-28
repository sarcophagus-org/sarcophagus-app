import React from 'react'
import classnames from 'classnames'
import ResurrectionTimer from '../ResurrectionTimer'
import StatusBadge from '../../layout/StatusBadge'
import { STATUSES } from '../../../constants'
import arrowRight from '../../../assets/images/arrowRight.svg'
import arrowDown from '../../../assets/images/arrowDown.svg'

const base = "text-white text-md flex justify-between relative cursor-default max-w-128"
const pointer = "cursor-pointer"


const SarcophagusCollasped = ({ sarcophagus, currentStatus, error, toggle, collasped, expandedOption=false, timer, color, timers }) => {
    return (
        <div className={!expandedOption ? classnames(base) : classnames(base, pointer)} onClick={!expandedOption ? () => null : () => toggle()} style={{height: '4.375rem'}}>
            <div>
                <div className="text-base font-bold text-white" style={{lineHeight: '1.625rem'}}>{sarcophagus.name}</div>
                <ResurrectionTimer timer={timer} color={color} timers={timers}/>
            </div>
            <div className="flex flex-col">
                {expandedOption && (
                    <div className="flex cursor-pointer">
                        {collasped && <img alt="" src={arrowDown} className="mr-2"/>} 
                        {!collasped && <img alt="" src={arrowRight} className="mr-2"/>}
                        <span>
                            { 
                                !!error 
                                ? "Details" 
                                : currentStatus === STATUSES.PROCESS_COMPLETE 
                                ? 'Rewrap' 
                                : currentStatus === STATUSES.SARCOPHAGUS_AWAIT_SIGN 
                                ? STATUSES.SARCOPHAGUS_AWAIT_SIGN 
                                : currentStatus === STATUSES.WINDOW_CLOSED
                                ? "Details"
                                : ""
                            }
                        </span>
                    </div>
                )}
                <StatusBadge status={error || currentStatus} error={!!error || currentStatus === STATUSES.WINDOW_CLOSED} isActive={currentStatus === STATUSES.PROCESS_COMPLETE} />
            </div>
        </div>
    )
}
export default SarcophagusCollasped 
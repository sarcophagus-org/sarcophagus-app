import React from 'react'
import classnames from 'classnames'
import ResurrectionTimer from '../ResurrectionTimer'
import arrowRight from '../../../assets/images/arrowRight.svg'
import StatusBadge from '../../layout/StatusBadge'
import { STATUSES } from '../../../constants'

const base = "text-white text-md flex justify-between relative cursor-default"
const pointer = "cursor-pointer"


const SarcophagusCollasped = ({ sarcophagus, currentStatus, error, toggle, expandedOption=false, timer, color, timers }) => {
    return (
        <div className={!expandedOption ? classnames(base) : classnames(base, pointer)} onClick={!expandedOption ? () => null : () => toggle()} style={{height: '4.375rem', maxWidth: '34.4375rem'}}>
            <div>
                <div className="text-base font-bold text-white" style={{lineHeight: '1.625rem'}}>{sarcophagus.name}</div>
                <ResurrectionTimer timer={timer} color={color} timers={timers}/>
            </div>
            <div className="flex flex-col">
                {expandedOption && (
                    <div className="flex cursor-pointer">
                        <img alt="" src={arrowRight} className="mr-2" />
                        <span>
                            { 
                                !!error || currentStatus === STATUSES.WINDOW_CLOSED 
                                ? "Details" 
                                : currentStatus === STATUSES.PROCESS_COMPLETE 
                                ? 'Rewrap' 
                                : currentStatus === STATUSES.SARCOPHAGUS_AWAIT_SIGN 
                                ? STATUSES.SARCOPHAGUS_AWAIT_SIGN : "" 
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
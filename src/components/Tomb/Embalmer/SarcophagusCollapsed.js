import React from 'react'
import classnames from 'classnames'
import ResurrectionTimer from '../ResurrectionTimer'
import StatusBadge from '../../layout/StatusBadge'
import { STATUSES } from '../../../constants'
import arrowRight from '../../../assets/images/arrowRight.svg'
import arrowDown from '../../../assets/images/arrowDown.svg'
import { truncate } from '../../../utils'
import Tippy from '@tippyjs/react'

const base = "text-white text-md flex justify-between relative cursor-default max-w-128"
const pointer = "cursor-pointer"


const SarcophagusCollapsed = ({ sarcophagus : { name }, currentStatus, error, toggle, collapsed, expandedOption=false, timer, color, timers }) => {
    return (
        <div className={!expandedOption ? classnames(base) : classnames(base, pointer)} onClick={!expandedOption ? () => null : () => toggle()} style={{height: '4.375rem'}}>
            <div>
            {name.length > 30
                ? (
                    <Tippy content={name} className="border-2 border-white rounded text-center text-xs font-normal p-2 bg-gray-900 break-words whitespace-pre-wrap">
                        <div className="text-base font-bold text-white" style={{lineHeight: '1.625rem'}}>{truncate(name, 25, "...", 18)}</div>
                    </Tippy>
                )
                : (
                    <div className="text-base font-bold text-white" style={{lineHeight: '1.625rem'}}>{name}</div>
            )}
                <ResurrectionTimer timer={timer} color={color} timers={timers}/>
            </div>
            <div className="flex flex-col">
                {expandedOption && (
                    <div className="flex cursor-pointer">
                        {!collapsed && <img alt="" src={arrowDown} className="mr-2"/>}
                        {collapsed && <img alt="" src={arrowRight} className="mr-2"/>}
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
export default SarcophagusCollapsed
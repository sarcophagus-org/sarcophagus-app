import React from 'react'
import arrowRight from '../../../assets/images/arrowRight.svg'
import arrowDown from '../../../assets/images/arrowDown.svg'
import StatusBadge from '../../layout/StatusBadge'
import classnames from 'classnames'

const base = "text-white text-md flex justify-between relative cursor-default max-w-128"
const pointer = "cursor-pointer"

const SarcophagusCollasped = ({ sarcophagus, error, toggle, status, collasped, expandedOption=false}) => (
    <div className={!expandedOption ? classnames(base) : classnames(base, pointer)} onClick={!expandedOption ? () => null : () => toggle()} style={{height: '4.375rem'}}>
        <div>
            <div className="text-base font-bold text-white" style={{lineHeight: '1.625rem'}}>{sarcophagus.name}</div>
        </div>

        <div className="flex flex-col">
            {expandedOption && (
                    <div className="flex cursor-pointer">
                    {!collasped && <img alt="" src={arrowDown} className="mr-2"/>} 
                    {collasped && <img alt="" src={arrowRight} className="mr-2"/>}
                    <span>{ error ? "Details" : "Resurrect" }</span>
                </div>
            )}
            <StatusBadge status={status} isActive={sarcophagus?.state === 1} isOver={sarcophagus?.state === 2} error={error} />
        </div>
    </div>
)

export default SarcophagusCollasped 
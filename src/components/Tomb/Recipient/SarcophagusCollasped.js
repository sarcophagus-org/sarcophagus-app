import React from 'react'
import arrowRight from '../../../assets/images/arrowRight.svg'
import StatusBadge from '../../layout/StatusBadge'

const SarcophagusCollasped = ({ sarcophagus, error, toggle, status, expandedOption=false}) => (
    <div className="border border-gray-500 text-white text-md flex px-4 my-8 pt-2 justify-between relative" style={{height: '4.375rem', maxWidth: '34.4375rem'}}>
        <div>
            <div className="text-base font-bold text-white" style={{lineHeight: '1.625rem'}}>{sarcophagus.name}</div>
        </div>

        <div className="flex flex-col">
            {expandedOption && (
                <div className="flex cursor-pointer" onClick={toggle}>
                    <img alt="" src={arrowRight} className="mr-2" />
                    <span>{ error ? "Details" : "Resurrect" }</span>
                </div>
            )}
            <StatusBadge status={status} isActive={sarcophagus?.state === 1} isOver={sarcophagus?.state === 2} error={error} />
        </div>
    </div>
)

export default SarcophagusCollasped 
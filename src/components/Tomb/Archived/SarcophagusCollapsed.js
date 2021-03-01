import React from 'react'
import StatusBadge from '../../layout/StatusBadge'

const SarcophagusCollapsed = ({ sarcophagus, currentStatus}) => (
    <div className="border border-gray-500 text-white text-md flex px-4 my-8 pt-2 justify-between relative max-w-128" style={{height: '4.375rem'}}>
        <div>
            <div className="text-base font-bold text-white" style={{lineHeight: '1.625rem'}}>{sarcophagus.name}</div>
        </div>

        <div className="flex flex-col">
            <StatusBadge status={currentStatus} isArchived={sarcophagus?.state === 2} />
        </div>
    </div>
)

export default SarcophagusCollapsed
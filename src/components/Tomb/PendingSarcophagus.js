import React from 'react'
import StatusBadge from '../layout/StatusBadge'

const PendingSarcophagus = ({sarcophagus}) => (
  <div className="border border-white text-white text-md flex justify-between relative cursor-default max-w-128 px-4 pt-3" style={{height: '4.375rem'}}>
      <div className="flex flex-col">
          <div className="text-base font-bold text-white" style={{lineHeight: '1.625rem'}}>{sarcophagus.sarcophagusName}</div>
      </div>

      <div className="flex flex-col">
          <StatusBadge status='Sarcophagus is being mined' isActive={false} isOver={false} error={false} />
      </div>
  </div>
)

export default PendingSarcophagus
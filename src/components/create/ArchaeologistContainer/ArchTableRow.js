import React from 'react'
import { FEE_ARCH_TOOLTIP, BOUNTY_ARCH_TOOLTIP, DIGGING_FEE_ARCH_TOOLTIP, TABLE_HEADER_ARCHAEOLOGISTS, TABLE_HEADER_BOUNTY, TABLE_HEADER_FEE, TABLE_HEADER_DIGGING_FEE, TABLE_HEADER_METRICS } from '../../../constants'
import Tooltip from '../../layout/Tooltip'

const gridStyles = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
  gridTemplateRow: '4.375rem',
  columnGap: '2rem',
  rowGap: '2rem',
  height: '2.375rem',
  alignItems: 'center',
  width: '50rem'
}

const ArchTableRow = ({ length }) => (
  <div className="text-md text-gray-400 mb-4" style={gridStyles}>
    <div className="ml-6">
      {`${TABLE_HEADER_ARCHAEOLOGISTS} (${length})`}
    </div>
    <div className="flex items-center">
      <span className="mr-2 pl-6">{TABLE_HEADER_FEE}</span>
      <Tooltip content={FEE_ARCH_TOOLTIP} />
    </div>
    <div className="flex items-center">
      <span className="mr-2">
        {TABLE_HEADER_BOUNTY}
      </span>
      <Tooltip content={BOUNTY_ARCH_TOOLTIP} />
    </div>
    <div className="flex items-center -ml-4">
      <span className="mr-2">
        {TABLE_HEADER_DIGGING_FEE}
      </span>
      <Tooltip content={DIGGING_FEE_ARCH_TOOLTIP} />
    </div>
    <div className="">
      {TABLE_HEADER_METRICS}
    </div>
  </div>
)

export default ArchTableRow
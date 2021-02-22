import React from 'react'
import Tooltip from '../../layout/Tooltip'

const gridStyles = {
  display: 'grid',
  gridTemplateColumns: '12.5rem 1fr 1fr 1fr 1fr',
  columnGap: '1rem',
  width: '50rem'
}

const ArchTableRow = ({ headerOne, headerTwo, headerThree, headerFour, headerFive }) => (
  <div className="text-md text-gray-400 mb-4" style={gridStyles}>
    <div className="ml-6">{headerOne}</div>
    <div className="flex items-center">
      <span className="mr-2">{headerTwo}</span>
      <Tooltip>
        Total fee in $SARCO to create this sarcophagus.
      </Tooltip>
    </div>
    <div className="flex items-center">
      <span className="mr-2">{headerFour}</span>
      <Tooltip>
        This Archaeologists minimum bounty requirement.
      </Tooltip>
    </div>
    <div className="flex items-center -ml-4">
      <span className="mr-2">{headerThree}</span>
      <Tooltip>
        This Archaeologists minimum digging fee for your resurrection date/time.
      </Tooltip>
    </div>
    <div className="">{headerFive}</div>
  </div>
)

export default ArchTableRow
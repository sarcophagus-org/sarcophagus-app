import React from 'react' 
import FlyoutContainer from '../layout/Flyout'
import { getDecimalNumber } from '../../utils/bigNumbers'
import { truncate } from '../../utils'

const Metrics = ({archaeologist}) => (
  <FlyoutContainer>
    <span className="font-semibold">Arch {truncate( archaeologist.archaeologist, 25, null, 2 )}</span>
    <ul className="text-sm mt-2 text-gray-400">
      <li>Max Resurrection Time: {getDecimalNumber(archaeologist.maximumResurrectionTime, 18)}</li>
      <li>Bounty: {getDecimalNumber(archaeologist.minimumBounty, 18)}</li>
      <li>Digging Fees: {getDecimalNumber(archaeologist.minimumDiggingFee, 18)}</li>
      <li>Cursed Bonds: {getDecimalNumber(archaeologist.cursedBond, 18)}</li>
      <li>Bonded: {getDecimalNumber(archaeologist.freeBond, 18)}</li>
    </ul>
  </FlyoutContainer>
)

export default Metrics
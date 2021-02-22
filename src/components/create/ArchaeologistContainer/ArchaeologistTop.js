import React from 'react'
import arrowRightBlack from '../../../assets/images/arrowRightBlack.svg'
import arrowRight from '../../../assets/images/arrowRight.svg'
import { getStorageFee, getDecimalNumber } from '../../../utils/bigNumbers';
import arrowDownBlack from '../../../assets/images/arrowDownBlack.svg'
import arrowDown from '../../../assets/images/arrowDown.svg'
import icon from '../../../assets/images/icon.svg'
import iconBlack from '../../../assets/images/iconBlack.svg'
import { truncate } from '../../../utils';


const gridStyles = {
  display: 'grid',
  gridTemplateColumns: '11rem 1fr 1fr 1fr 1fr',
  columnGap: '1rem',
  height: '4.375rem',
  alignItems: 'center',
  width: '50rem'
}

const ArchaeologistTop = ({archaeologist, handleClick, toggle, file, selected, isDisabled, collasped}) => {
    return (
        <div className={isDisabled ? 'cursor-default' : 'cursor-pointer'} onClick={handleClick} style={gridStyles}>
            <div className="">{truncate( archaeologist.paymentAddress, 10, null)}</div>
            <div className="">
                {file && <img src={selected === archaeologist.paymentAddress ? iconBlack : icon} alt="" className="inline-block w-4 h-auto mr-2"/>}
                {getStorageFee(archaeologist, file)}
            </div>
            <div className="-ml-1 flex items-center">
                <img src={selected === archaeologist.paymentAddress ? iconBlack : icon} alt="" className="inline-block w-4 h-auto mr-2"/>
                {getDecimalNumber(archaeologist.minimumBounty)}
            </div>
            <div className="-ml-7 flex items-center">
                <img src={selected === archaeologist.paymentAddress ? iconBlack : icon} alt="" className="inline-block w-4 h-auto mr-2"/>
                {getDecimalNumber(archaeologist.minimumDiggingFee)}
            </div>
            <div className="flex items-center cursor-pointer -ml-5" onClick={(e) => {e.stopPropagation(); toggle()}}>
                {selected === archaeologist.paymentAddress && collasped && <img alt="" src={arrowRightBlack} className="mr-2"/>} 
                {selected === archaeologist.paymentAddress && !collasped && <img alt="" src={arrowDownBlack} className="mr-2"/>}
                {selected !== archaeologist.paymentAddress && collasped && <img alt="" src={arrowRight} className="mr-2"/>} 
                {selected !== archaeologist.paymentAddress && !collasped && <img alt="" src={arrowDown} className="mr-2"/>}
            <u>Metrics</u>
            </div>
      </div>
    )
}

export default ArchaeologistTop
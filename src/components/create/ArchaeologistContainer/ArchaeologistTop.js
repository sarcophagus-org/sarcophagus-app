import React from 'react'
import { truncate } from '../../../utils';
import { getTotalFee, getDecimalNumber } from '../../../utils/bigNumbers';
import arrowDown from '../../../assets/images/arrowDown.svg'
import arrowDownBlack from '../../../assets/images/arrowDownBlack.svg'
import arrowRight from '../../../assets/images/arrowRight.svg'
import arrowRightBlack from '../../../assets/images/arrowRightBlack.svg'
import icon from '../../../assets/images/icon.svg'
import iconBlack from '../../../assets/images/iconBlack.svg'

const gridStyles = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
    gridTemplateRow: '4.375rem',
    columnGap: '2rem',
    rowGap: '2rem',
    height: '4.375rem',
    alignItems: 'center',
    width: '50rem'
}

const ArchaeologistTop = ({archaeologist, handleClick, toggle, file, selected, isDisabled, collapsed}) => {
    return (
        <div className={isDisabled ? 'cursor-default' : 'cursor-pointer'} onClick={handleClick} style={gridStyles}>
            <div className="">{truncate( archaeologist.address, 18, null)}</div>
            <div className="pl-6">
                {file && <img src={selected === archaeologist.address ? iconBlack : icon} alt="" className="inline-block w-4 h-auto mr-2"/>}
                {getTotalFee(archaeologist, file)}
            </div>
            <div className="-ml-1 flex items-center">
                <img src={selected === archaeologist.address ? iconBlack : icon} alt="" className="inline-block w-4 h-auto mr-2"/>
                {getDecimalNumber(archaeologist.minimumBounty)}
            </div>
            <div className="-ml-7 flex items-center">
                <img src={selected === archaeologist.address ? iconBlack : icon} alt="" className="inline-block w-4 h-auto mr-2"/>
                {getDecimalNumber(archaeologist.minimumDiggingFee)}
            </div>
            <div className="flex items-center cursor-pointer -ml-5" onClick={(e) => {e.stopPropagation(); toggle()}}>
                {selected === archaeologist.address && collapsed && <img alt="" src={arrowRightBlack} className="mr-2"/>}
                {selected === archaeologist.address && !collapsed && <img alt="" src={arrowDownBlack} className="mr-2"/>}
                {selected !== archaeologist.address && collapsed && <img alt="" src={arrowRight} className="mr-2"/>}
                {selected !== archaeologist.address && !collapsed && <img alt="" src={arrowDown} className="mr-2"/>}
            <u>Metrics</u>
            </div>
      </div>
    )
}

export default ArchaeologistTop
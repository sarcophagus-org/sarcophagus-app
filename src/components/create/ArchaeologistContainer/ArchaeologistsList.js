import React, { useEffect, useState } from 'react'
import { truncate } from '../../../utils';
import { getStorageFee, getDecimalNumber, getCursedPercentage } from '../../../utils/bigNumbers';
import classnames from 'classnames'
import icon from '../../../assets/images/icon.svg'
import iconBlack from '../../../assets/images/iconBlack.svg'
import { utils } from 'ethers';
import useCollaspe from '../../customHooks/useCollaspe';
import arrowRightBlack from '../../../assets/images/arrowRightBlack.svg'
import arrowRight from '../../../assets/images/arrowRight.svg'
// TODO update if expanded and seleted to show correct arrow
// import arrowDownBlack from '../../../assets/images/arrowDownBlack.svg'
// import arrowDown from '../../../assets/images/arrowDown.svg'
import { getDatefromBigNumber } from '../../../utils/datetime';

const base = "pl-6 text-md"
const baseBorder = "border border-gray-500 text-white bg-gray-600"
const selectedBorder = "border border-white text-black bg-white"
const disabledBorder = "border border-gray-500 text-gray-400"

const gridStyles = {
  display: 'grid',
  gridTemplateColumns: '11rem 1fr 1fr 1fr 1fr',
  columnGap: '1rem',
  height: '4.375rem',
  alignItems: 'center',
  width: '50rem'
}

const ArchaeologistsList = ({ archaeologist, file, gtSign, bounty, diggingFee, selected, handleSelected, setFieldValue }) => {
  const [isDisabled, setIsDisabled ] = useState(true)
  const { collasped, toggle } = useCollaspe(true, true)

  useEffect(() => {
    if(!bounty || !diggingFee ) return
    const isBountyLess = archaeologist.minimumBounty.lte(utils.parseEther(bounty.toString()))
    const isDiggingFeeLess = archaeologist.minimumDiggingFee.lte(utils.parseEther(diggingFee.toString()))
    if(isBountyLess && isDiggingFeeLess && !!file) setIsDisabled(false)
    else setIsDisabled(true)
  },[bounty, diggingFee, archaeologist, file])

  useEffect(() => {
    if(selected === archaeologist.paymentAddress && isDisabled) handleSelected(false, false)
  }, [archaeologist, selected, isDisabled, handleSelected])


  const handleClick = () => {
    if(isDisabled) return
    setFieldValue('address', archaeologist.paymentAddress); 
    handleSelected(archaeologist, getStorageFee(archaeologist, file, true))
  }
  
  if(collasped) return (
    <div onClick={handleClick} className={isDisabled ?  classnames(base, disabledBorder) : selected === archaeologist.paymentAddress ? classnames(base, selectedBorder) : classnames(base, baseBorder)} style={gridStyles}>
      <div className="">{truncate( archaeologist.paymentAddress, 10, null)}</div>
      <div className="">
        {file && <img src={selected === archaeologist.paymentAddress ? iconBlack : icon} alt="" className="inline-block w-4 h-auto mr-2"/>}
        {getStorageFee(archaeologist, file)}
        </div>
      <div className="flex items-center">
        <img src={selected === archaeologist.paymentAddress ? iconBlack : icon} alt="" className="inline-block w-4 h-auto mr-2"/>
        {getDecimalNumber(archaeologist.minimumBounty)}
      </div>
      <div className="-ml-4 flex items-center">
        <img src={selected === archaeologist.paymentAddress ? iconBlack : icon} alt="" className="inline-block w-4 h-auto mr-2"/>
        {getDecimalNumber(archaeologist.minimumDiggingFee)}
      </div>
      <div className="flex items-center cursor-pointer" onClick={(e) => {e.stopPropagation(); toggle()}}>
        <img alt="" src={selected === archaeologist.paymentAddress ? arrowRightBlack : arrowRight} className="mr-2"/>
        <u>Metrics</u>
      </div>
    </div>
  )
  else return (
    <div className={isDisabled ?  classnames(disabledBorder) : classnames(baseBorder)} style={{width: '50rem'}}>
      <div onClick={handleClick} className={isDisabled ?  classnames(base, disabledBorder) : selected === archaeologist.paymentAddress ? classnames(base, selectedBorder) : classnames(base, baseBorder)} style={gridStyles}>
      <div className="">{truncate( archaeologist.paymentAddress, 10, null)}</div>
      <div className="">
        {file && <img src={selected === archaeologist.paymentAddress ? iconBlack : icon} alt="" className="inline-block w-4 h-auto mr-2"/>}
        {getStorageFee(archaeologist, file)}
        </div>
      <div className="flex items-center">
        <img src={selected === archaeologist.paymentAddress ? iconBlack : icon} alt="" className="inline-block w-4 h-auto mr-2"/>
        {getDecimalNumber(archaeologist.minimumBounty)}
      </div>
      <div className="-ml-4 flex items-center">
        <img src={selected === archaeologist.paymentAddress ? iconBlack : icon} alt="" className="inline-block w-4 h-auto mr-2"/>
        {getDecimalNumber(archaeologist.minimumDiggingFee)}
      </div>
      <div className="flex items-center cursor-pointer" onClick={(e) => {e.stopPropagation(); toggle()}}>
        <img alt="" src={selected === archaeologist.paymentAddress ? arrowRightBlack : arrowRight} className="mr-2"/>
        <u>Metrics</u>
      </div>
    </div>
      {/* Bottom Details */}
      <div className="border-t border-gray-500 py-4 px-8 w-full">
        <div className="flex mb-4">
          <span className="text-gray-400 mr-2">Arch </span>
          <span>{archaeologist.paymentAddress}</span>
        </div>
        <div className="grid grid-cols-2 text-sm">
    
          <div className="">
            <div className="flex">
              <span className="text-gray-400 mr-2">Early Resurrections: </span>
              <span className="text-white"></span>
            </div>
            <div className="flex">
              <span className="text-gray-400 mr-2">Late | Missed Resurrections: </span>
              <span className="text-white"></span>
            </div>
            <div className="flex">
              <span className="text-gray-400 mr-2">Malacious Volume:</span>
              <span className="text-white"></span>
            </div>
            <div className="flex">
              <span className="text-gray-400 mr-2">Bounded </span>
              <span className="text-white"></span>
            </div>
            <div className="flex">
              <span className="text-gray-400 mr-2">Percent Cursed:</span>
              <span className="text-white">{getCursedPercentage(archaeologist.cursedBond, archaeologist.freeBond)}%</span>
            </div>
            <div className="flex whitespace-nowrap">
              <span className="text-gray-400 mr-2">Max Resurrection Time:</span>
              <span className="text-white">{getDatefromBigNumber(archaeologist.maximumResurrectionTime)}</span>
            </div>
            <div className="flex">
              <span className="text-gray-400 mr-2">First Curse</span>
              <span className="text-white"></span>
            </div>
          </div>
          <div> 
            <div className="flex">
              <span className="text-gray-400 mr-2">Min Digging Fee:</span>
              <span className="text-white">{getDecimalNumber(archaeologist.minimumDiggingFee, 18)}</span>
            </div>
            <div className="flex">
              <span className="text-gray-400 mr-2">Min Bounty:</span>
              <span className="text-white">{getDecimalNumber(archaeologist.minimumBounty, 18)}</span>
            </div>
            <div className="flex">
              <span className="text-gray-400 mr-2">Fee per byte:</span>
              <span className="text-white">{getDecimalNumber(archaeologist.feePerByte, 18)}</span>
            </div>
            <div className="flex">
              <span className="text-gray-400 mr-2">Total Storage Fee</span>
              <span className="text-white">{getStorageFee(archaeologist , file)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ArchaeologistsList
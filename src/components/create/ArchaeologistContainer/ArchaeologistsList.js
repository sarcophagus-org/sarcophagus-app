import React, { useEffect, useState } from 'react'
import classnames from 'classnames'
import { utils } from 'ethers';
import { getStorageFee } from '../../../utils/bigNumbers';
import useCollaspe from '../../customHooks/useCollaspe';
import ArchaeologistTop from './ArchaeologistTop';
import ArchaeologistMetrics from './ArchaeologistMetrics'

const base = "px-6 text-md"
const baseBorder = "border border-gray-500 text-white bg-gray-600"
const selectedBorder = "border border-white text-black bg-white"
const disabledBorder = "border border-gray-500 text-gray-400"

const ArchaeologistsList = ({ archaeologist, file, bounty, diggingFee, selected, handleSelected, setFieldValue }) => {
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
  
  return (
    <div className={isDisabled ?  classnames(base, disabledBorder) : selected === archaeologist.paymentAddress ? classnames(base, selectedBorder) : classnames(base, baseBorder)} style={{width: '50rem'}}>
      <ArchaeologistTop archaeologist={archaeologist} handleClick={handleClick} toggle={toggle} file={file} selected={selected} isDisabled={isDisabled} collasped={collasped} />
      {!collasped && <ArchaeologistMetrics archaeologist={archaeologist} file={file}/>}
    </div>
  )
}

export default ArchaeologistsList
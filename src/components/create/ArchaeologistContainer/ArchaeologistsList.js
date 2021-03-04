import React, { useEffect, useState } from 'react'
import classnames from 'classnames'
import { utils } from 'ethers';
import { getTotalFee } from '../../../utils/bigNumbers';
import useCollapse from '../../customHooks/useCollapse';
import ArchaeologistTop from './ArchaeologistTop';
import ArchaeologistMetrics from './ArchaeologistMetrics'

const base = "px-6 text-md"
const baseBorder = "border border-gray-500 text-white bg-gray-600"
const selectedBorder = "border border-white text-black bg-white"
const disabledBorder = "border border-gray-500 text-gray-400"

const ArchaeologistsList = ({ archaeologist, file, bounty, diggingFee, selected, handleSelected, setFieldValue }) => {
  const [isDisabled, setIsDisabled ] = useState(true)
  const { collapsed, toggle } = useCollapse(true, true)

  // useEffect(() => {
  //   if(!bounty || !diggingFee) {
  //     setIsDisabled(true)
  //     return
  //   }
  //   const isBountyLess = archaeologist.minimumBounty.lte(utils.parseEther(bounty.toString()))
  //   const isDiggingFeeLess = archaeologist.minimumDiggingFee.lte(utils.parseEther(diggingFee.toString()))
  //   const isFreeBondGreater = archaeologist.freeBond.gte(utils.parseEther(getTotalFee(archaeologist, file).toString()))
  //   if(isBountyLess && isDiggingFeeLess && isFreeBondGreater && !!file) setIsDisabled(false)
  //   else setIsDisabled(true)
    
  // },[bounty, diggingFee, archaeologist, file])

  // useEffect(() => {
  //   if(selected === archaeologist.address && isDisabled) handleSelected(false, false)
  // }, [archaeologist, selected, isDisabled, handleSelected])

  const handleClick = () => {
    if(isDisabled) return
    setFieldValue('address', archaeologist.address); 
    handleSelected(archaeologist, getTotalFee(archaeologist, file, true))
  }
  
  return (
    <div className={isDisabled ?  classnames(base, disabledBorder) : selected === archaeologist.address ? classnames(base, selectedBorder) : classnames(base, baseBorder)} style={{width: '50rem'}}>
      <ArchaeologistTop archaeologist={archaeologist} handleClick={handleClick} toggle={toggle} file={file} selected={selected} isDisabled={isDisabled} collapsed={collapsed} />
      {!collapsed && <ArchaeologistMetrics archaeologist={archaeologist} file={file} isSelected={selected === archaeologist.address}/>}
    </div>
  )
}

export default ArchaeologistsList
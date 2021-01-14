import React, { useEffect, useState } from 'react'
import { truncate } from '../../utils'
import { useData } from '../BlockChainContext'
import warning from '../../assets/images/warning.svg'
import Title from '../layout/Title'
import classnames from 'classnames'
import Button from '../layout/Button'
import { getBountyFees } from '../../utils/bigNumbers'
import { utils } from 'ethers'
import Metrics from './ArchaeologistMetrics'

const baseBorder = "my-3 border border-white rounded grid"
const selectedBorder = "my-3 border-4 border-white rounded grid"

const ArcInfoBox = ({archaeologist, handleSelected, handleSelect, selected, file, showMetrics, setShowMetrics}) => {
  const handleShowMetrics = (archaeologist) => {
    if(showMetrics === archaeologist) return setShowMetrics(false)
    setShowMetrics(archaeologist)
  }
  return (
    <div className={selected === archaeologist.archaeologist ? classnames(selectedBorder) : classnames(baseBorder)} style={{height: '5rem'}}>
      <div className="flex flex-col col-start-1 pt-3 pl-4 relative mr-4">
        <span className="">Arch {truncate( archaeologist.archaeologist, 20, null, 2 )}</span>
        <button type="button" className="absolute bottom-0 text-gray-400 border-b border-gray-400 mb-3 cursor-pointer focus:outline-none" onClick={() => handleShowMetrics(archaeologist.archaeologist)}>Show Metrics</button>
      </div>
      {showMetrics === archaeologist.archaeologist && <Metrics archaeologist={archaeologist} />}

      <div className="h-full border-l border-white col-start-2 pt-3 cursor-pointer" onClick={() => {handleSelected(archaeologist); handleSelect(archaeologist)}}>
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-content">{getBountyFees(archaeologist, file)} <div className="h-4 w-8 ">
            <img className="w-full h-full" alt="" src={warning} />
          </div>
        </div>
        <div className="text-center">Total</div>
        </div>
      </div>
  </div>
  )
}

const ArchaeologistList = ({ handleSelected, fees, archSelected, file }) => {
  const { archaeologists } = useData()
  const [ selected, setSelected ] = useState(false)
  const [showMetrics, setShowMetrics ] = useState(false)

  useEffect(() => {
    if(archSelected) {
    
    
    setSelected(archSelected)
  }}, [archSelected, setSelected])
  
  const _handleSelect = (archaeologist) => setSelected(archaeologist.archaeologist)

  if (!Array.isArray(archaeologists) || !archaeologists.length) return <div className="text-red text-center w-full my-2">No archaeologists Available</div>
  return archaeologists
    .filter(v => !v.freeBond.isZero())
    .filter(v => v.minimumBounty.gte(utils.parseEther(fees.bounty)))
    .filter(v => v.minimumDiggingFee.gte(utils.parseEther(fees.diggingFee)))
    .sort((a, b) => getBountyFees(a, file) - getBountyFees(b, file))
    .map((archaeologist) => <ArcInfoBox key={archaeologist.archaeologist} showMetrics={showMetrics} setShowMetrics={setShowMetrics} handleSelected={handleSelected} archaeologist={archaeologist} handleSelect={_handleSelect} selected={selected} file={file} />)
}

const base = "w-full bg-white text-gray-900 mt-6 mb-4"
const disabled = "w-full bg-gray-400 text-gray-900 mt-6 mb-4"

const Archaeologists = ({ handleSelected, selected, handleEmbalming, setExpanded, setCompleted, file, fees }) => (
  <div className="relative w-full h-full px-4"> 
    <Title title="Archaeologists" />
    <ArchaeologistList handleSelected={handleSelected} archSelected={selected} file={file} fees={fees}/>
    <Button label="Submit: Complete Embalming" _classNames={selected ? classnames(base) : classnames(disabled)} height="lg" type="button" onClick={() => handleEmbalming(setExpanded, setCompleted)} isDisabled={!selected}/>
  </div>
)


export default Archaeologists
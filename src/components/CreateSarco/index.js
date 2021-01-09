import React, { useState } from 'react'
import { labels } from '../../constants'
import MenuItem from '../layout/SideBar/MenuItem'
import Archaeologists from './Archaeologists'
import Create from './Create'
import Settings from './FeeSettings'

const CreateSarco = () => {
  const [ step, setStep ] = useState(0)
  const [ file, setFile ] = useState(false)

  const [ sarcoData, setSarcoData ] = useState( {
    resurrectionTime: false,
    recipientAddress: false,
    sarcophagusName: false,
    bountyFees: false,
    diggingFees: false,
    archeaologist: false,
  } )
  
  const _handleCreateSubmit = ({recipientAddress, resurrectionTime, file, sarcophagusName}, setExpanded) => {
    if(!recipientAddress || !resurrectionTime ||  !file || !sarcophagusName) return
    setSarcoData(sarcoData => ({...sarcoData, file: file, resurrectionTime: resurrectionTime, recipientAddress: recipientAddress, sarcophagusName: sarcophagusName}))
    setStep(1)
    setExpanded(false)
  }

  // const _handleFeesSumbit = () => {

  // }

  const _handleFileChange = (e, setFieldValue) => {
    e.preventDefault()
    setFieldValue("file", e.currentTarget.files[0])
    setFile(e.currentTarget.files[0])
  }

  const DevelopmentContent = () => (
    <div className="absolute right-0 top-0">
      <ul>
        <li>resurrectionTime: {!!sarcoData.resurrectionTime ? Date.UTC(sarcoData.resurrectionTime.getFullYear(), sarcoData.resurrectionTime.getMonth(), sarcoData.resurrectionTime.getDate(), sarcoData.resurrectionTime.getHours(), sarcoData.resurrectionTime.getMinutes(), sarcoData.resurrectionTime.getSeconds()) + " (Converted to UTC)" : "None"}</li>
        <li>file: {file?.name || "None"}</li>
        <li>recipientAddress: {sarcoData.recipientAddress || "None"}</li>
        <li>sarcophagusName: {sarcoData.sarcophagusName || "None"}</li>
        <li>bountyFees: {sarcoData.bountyFees || "None"}</li>
        <li>diggingFees: {sarcoData.diggingFees || "None"}</li>
        <li>archeaologist: {sarcoData.archeaologist || "None"}</li>
      </ul>
    </div>
  )
  
  return (
    <div className="relative"> 
      {/* Left Side */}
      <div className=""></div>
  
      <div className="h-full">
        <MenuItem label={labels.createSarco}>
          {setExpanded => (
            <Create fileInfo={file} handleSubmit={_handleCreateSubmit} handleFileChange={_handleFileChange} setExpanded={setExpanded}/>
          )}
        </MenuItem>
        
        <MenuItem label={labels.feeSettings} isDisabled={step >= 1 && step >= 4}>
          <Settings />
        </MenuItem>
        <MenuItem label={labels.pickArchaeologist} isDisabled={step !== 3}>
            <Archaeologists />
        </MenuItem>
        <MenuItem label={labels.completeEmbalming} isDisabled={step !== 4}>
          {/* I'm guessing heavily relient on Smart Contract Events */}
        </MenuItem>
      </div>
      <DevelopmentContent />
  </div>
  )
}

export default CreateSarco
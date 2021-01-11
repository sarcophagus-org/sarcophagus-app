import React, { useState } from 'react'
import { labels } from '../../constants'
import MenuItem from '../layout/SideBar/MenuItem'
import Archaeologists from './Archaeologists'
import Create from './Create'
import EmbalmingProcess from './EmbalmingProcess'
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
  
  const _handleCreateSubmit = ({recipientAddress, resurrectionTime, file, sarcophagusName}, setExpanded, setCompleted) => {
    if(!recipientAddress || !resurrectionTime ||  !file || !sarcophagusName) return
    setSarcoData(sarcoData => ({...sarcoData, file: file, resurrectionTime: resurrectionTime, recipientAddress: recipientAddress, sarcophagusName: sarcophagusName}))
    setStep(1)
    setExpanded(false)
    setCompleted(true)
  }

  const _handleFeesSumbit = ({ bountyFees, diggingFees }, setExpanded, setCompleted) => {
    if(!bountyFees || !diggingFees) return
    setSarcoData(sarcoData => ({...sarcoData, bountyFees: bountyFees, diggingFees: diggingFees}))
    setStep(2)
    setExpanded(false)
    setCompleted(true)
  }

  const _handleSelected = (selectedArchaeologist) => {
    if(!selectedArchaeologist) return
    setSarcoData(sarcoData => ({...sarcoData, archeaologist: selectedArchaeologist}))
  }

  const _handleEmbalming = (setExpanded, setCompleted) => {
    setStep(3)
    setExpanded(false)
    setCompleted(true)
  }

  const _handleFileChange = (e, setFieldValue) => {
    e.preventDefault()
    setFieldValue("file", e.currentTarget.files[0])
    setFile(e.currentTarget.files[0])
  }

  const DevelopmentContent = () => (
    <div className="absolute right-0 top-0 border border-white p-8" style={{width: '28.5rem'}}>
      <ul>
        <li>resurrectionTime: {!!sarcoData.resurrectionTime ? Date.UTC(sarcoData.resurrectionTime.getFullYear(), sarcoData.resurrectionTime.getMonth(), sarcoData.resurrectionTime.getDate(), sarcoData.resurrectionTime.getHours(), sarcoData.resurrectionTime.getMinutes(), sarcoData.resurrectionTime.getSeconds()) + " (Converted to UTC)" : "None"}</li>
        <li>file: {file?.name || "None"}</li>
        <li>recipientAddress: {sarcoData.recipientAddress || "None"}</li>
        <li>sarcophagusName: {sarcoData.sarcophagusName || "None"}</li>
        <li>bountyFees: {sarcoData.bountyFees || "None"}</li>
        <li>diggingFees: {sarcoData.diggingFees || "None"}</li>
        <li>archeaologist: {sarcoData.archeaologist.archaeologist || "None"}</li>
      </ul>
    </div>
  )
  
  return (
    <div className="relative"> 
      {/* Left Side */}
      <div className=""></div>
  
      <div className="h-full">
        <MenuItem label={labels.createSarco} isDisabled={step === 3}>
          {(setExpanded, setCompleted) => (
            <Create fileInfo={file} handleSubmit={_handleCreateSubmit} handleFileChange={_handleFileChange} setExpanded={setExpanded} setCompleted={setCompleted}/>
          )}
        </MenuItem>
        <MenuItem label={labels.feeSettings} step={step} isDisabled={step < 1 || step === 3}>
          {(setExpanded, setCompleted) => (
            <Settings handleSubmit={_handleFeesSumbit} setExpanded={setExpanded} setCompleted={setCompleted}/>
          )}
        </MenuItem>
        <MenuItem label={labels.pickArchaeologist} step={step} isDisabled={step < 2 || step === 3}>
          {(setExpanded, setCompleted) => (
            <Archaeologists handleSelected={_handleSelected} setExpanded={setExpanded} handleEmbalming={_handleEmbalming} selected={sarcoData.archeaologist.archaeologist || ""} setCompleted={setCompleted}/>
          )}
        </MenuItem>
        <MenuItem label={labels.completeEmbalming} step={step} isDisabled={step !== 3}>
          {(setExpanded) => ( 
            <EmbalmingProcess />
          )}
        </MenuItem>
      </div>
      <DevelopmentContent />
  </div>
  )
}

export default CreateSarco
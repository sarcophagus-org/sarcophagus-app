import React, { useEffect, useState } from 'react'
import { labels } from '../../constants'
import MenuItem from '../layout/SideBar/MenuItem'
import Archaeologists from './Archaeologists'
import Create from './Create'
import EmbalmingProcess from './EmbalmingProcess'
import Settings from './FeeSettings'
import useFileEncryption from '../customHooks/useFileEncryption'
import { sarcophagusInitialValues } from '../../constants'

const CreateSarco = () => {
  const [ step, setStep ] = useState(0)
  const { file, setFile, setrecipientAddress, setArchaeologistAddress, encryptedFile, assetDoubleHash } = useFileEncryption()

  const [ sarcoData, setSarcoData ] = useState(sarcophagusInitialValues)

  useEffect(() => {
    if(!encryptedFile) return
    setSarcoData(sarcoData => ({...sarcoData, file: encryptedFile}))
  },[encryptedFile])

  const _handleCreateSubmit = ({recipientAddress, resurrectionTime, sarcophagusName}, setExpanded, setCompleted) => {
    if(!recipientAddress || !resurrectionTime || !file || !sarcophagusName) return
    setSarcoData(sarcoData => ({...sarcoData, resurrectionTime: resurrectionTime, recipientAddress: recipientAddress, sarcophagusName: sarcophagusName}))
    setrecipientAddress(recipientAddress)
    setCompleted(true)
    setStep(1)
    setExpanded(false)
  }

  const _handleFeesSumbit = ({ bountyFees, diggingFees }, setExpanded, setCompleted) => {
    if(!bountyFees || !diggingFees) return
    setSarcoData(sarcoData => ({...sarcoData, bountyFees: bountyFees, diggingFees: diggingFees}))
    setCompleted(true)
    setStep(2)
    setExpanded(false)
  }

  const _handleSelected = (selectedArchaeologist) => {
    if(!selectedArchaeologist) return
    setArchaeologistAddress(selectedArchaeologist.currentPublicKey)
    setSarcoData(sarcoData => ({...sarcoData, archeaologist: selectedArchaeologist}))
  }

  const _handleEmbalming = async (setExpanded, setCompleted) => {
    return
  }
  const _handleFileChange = (e, setFieldValue) => {
    e.preventDefault()
    setFieldValue("file", e.currentTarget.files[0])
    setFile(e.currentTarget.files[0])
  }
  
  return (
    <div className="relative"> 
      <div className="">
        {/* Content */}
      </div>
  
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
            <Archaeologists fees={{bountyFees: sarcoData.bountyFees, diggingFees: sarcoData.diggingFees}} handleSelected={_handleSelected} file={file} setExpanded={setExpanded} handleEmbalming={_handleEmbalming} selected={sarcoData.archeaologist.archaeologist || ""} setCompleted={setCompleted}/>
          )}
        </MenuItem>
        <MenuItem label={labels.completeEmbalming} step={step} isDisabled={step !== 3}>
          {(setExpanded) => ( 
            <EmbalmingProcess />
          )}
        </MenuItem>
      </div>
  </div>
  )
}

export default CreateSarco
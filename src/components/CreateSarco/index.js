import React, { useState } from 'react'
import { labels } from '../../constants'
import MenuItem from '../layout/SideBar/MenuItem'
import Archaeologists from './Archaeologists'
import Create from './Create'
import EmbalmingProcess from './EmbalmingProcess'
import Settings from './FeeSettings'
import useSarcophagusCreate from '../customHooks/useSarcophagusCreate'

const CreateSarco = () => {
  const [ step, setStep ] = useState(0)
  const { sarcophagusSettings, file, handleSettings, handleFees, handleArchaeologistSelect, handleEmbalming, handleFileChange} = useSarcophagusCreate(setStep)
  
  return (
    <div className="relative grid grid-cols-2"> 
      <div className="">
        {/* Content */}
      </div>
  
      <div className="h-full">
        <MenuItem label={labels.createSarco} isDisabled={step === 3}>
          {(setExpanded, setCompleted) => (
            <Create 
              fileInfo={file} 
              handleSubmit={handleSettings} 
              handleFileChange={handleFileChange} 
              setExpanded={setExpanded} 
              setCompleted={setCompleted} />
          )}
        </MenuItem>
        <MenuItem label={labels.feeSettings} step={step} isDisabled={step < 1 || step === 3}>
          {(setExpanded, setCompleted) => (
            <Settings 
              handleSubmit={handleFees} 
              setExpanded={setExpanded} 
              setCompleted={setCompleted} />
          )}
        </MenuItem>
        <MenuItem label={labels.pickArchaeologist} step={step} isDisabled={step < 2 || step === 3}>
          {(setExpanded, setCompleted) => (
            <Archaeologists 
              fees={{bounty: sarcophagusSettings.bounty, diggingFee: sarcophagusSettings.diggingFee}} 
              file={file} 
              handleEmbalming={handleEmbalming} 
              handleSelected={handleArchaeologistSelect} 
              selected={sarcophagusSettings.archaeologist.archaeologist || ""} 
              setCompleted={setCompleted} 
              setExpanded={setExpanded} />
          )}
        </MenuItem>
        <MenuItem label={labels.completeEmbalming} step={step} isDisabled={step !== 3}>
          {(setExpanded) => ( 
            <EmbalmingProcess handleEmbalming={handleEmbalming} />
          )}
        </MenuItem>
      </div>
  </div>
  )
}

export default CreateSarco
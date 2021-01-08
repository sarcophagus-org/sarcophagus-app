import React, { useState, useEffect, useCallback } from 'react'
import MenuItem from '../layout/SideBar/MenuItem'
import Archeologists from './Archeologists'
import FileUpload from './FileUpload'
import Settings from './SarcoSettings'

const CreateSarco = () => {
  // Step 1 Upload File, Resurrection Time, Recipient Address
  const [ step, setStep ] = useState(0)
  const [ file, setFile ] = useState(false)
  
  const [ sarcoData, setSarcoData ] = useState( {
    resurrectionTime: null,
    recipientAddress: null,
    bountyFees: null,
    diggingFees: null,
    archeaologist: false,
  } )
  
  // Step 2 Bounty and digging fees
  // Step 3 Choose Archeaologist
  // Step 4 Embalming Status
  return (
    <div className="relative"> 
      {/* Left Side */}
    <div className="w-full bg-red">

    </div>
      {/* Side Bar Container */}
    <div className="absolute right-0">
      {/* Cards Create*/}
       <MenuItem label="Create Sarcophagus" isDisabled={file && step !== 0}>
          <FileUpload file={file} />
       </MenuItem>
       <MenuItem label="Sarcophagus Settings">
          <Settings />
       </MenuItem>
       <MenuItem label="Pick an Archeologist">
          <Archeologists />
       </MenuItem>
       <MenuItem label="Complete Embalming">
        {/* I'm guessing heavily relient on Smart Contract Events */}
       </MenuItem>
    </div>
  </div>
  )
}

export default CreateSarco
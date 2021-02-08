import React from 'react'

const SarcophagusComplete = ({sarcophagus}) => {
    // TODO Will need to add active and disabled states
    return (
      <div className="absolute" style={{right: '1rem', top: '1rem'}}>
        <span className="text-white underline">{">"} Rewrap</span>
      </div>
    )
  }

export default SarcophagusComplete
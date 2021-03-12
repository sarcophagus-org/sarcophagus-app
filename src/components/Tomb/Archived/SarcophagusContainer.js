import React from 'react'
import SarcophagusCollapsed from './SarcophagusCollapsed'

const SarcophagusContainer = ({ sarcophagus, currentStatus }) => {
    return (
        <SarcophagusCollapsed sarcophagus={sarcophagus} currentStatus={currentStatus} />
    )
}

export default SarcophagusContainer
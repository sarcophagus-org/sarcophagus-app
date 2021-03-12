import React from 'react'
import { useCheckArchivedStatus } from '../../customHooks/useCheckArchivedStatus/index.js'
import SarcophagusContainer from './SarcophagusContainer.js'
import { useArchData } from '../../Context/ArchaeologistContext/index.js'

const Wrapper = ({sarcophagus}) => {
    const { archaeologists } = useArchData()
    const { currentStatus } = useCheckArchivedStatus(sarcophagus, archaeologists)
    return (
        <SarcophagusContainer sarcophagus={sarcophagus} currentStatus={currentStatus} />
    )
}

export default Wrapper
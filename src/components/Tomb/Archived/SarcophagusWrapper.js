import React from 'react'
import { useCheckArchivedStatus } from '../../customHooks/useCheckArchivedStatus/index.js'
import SarcophagusContainer from './SarcophagusContainer.js'
import { useData } from '../../BlockChainContext'

const Wrapper = ({sarcophagus}) => {
    const { archaeologists } = useData()
    const { currentStatus } = useCheckArchivedStatus(sarcophagus, archaeologists)
    return (
        <SarcophagusContainer sarcophagus={sarcophagus} currentStatus={currentStatus} />
    )
}

export default Wrapper
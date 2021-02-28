import React from 'react'
import { useCheckOverStatus } from '../../customHooks/useCheckOverStatus/index.js'
import SarcophagusContainer from './SarcophagusContainer.js'
import { useData } from '../../BlockChainContext'

const Wrapper = ({sarcophagus}) => {
    const { archaeologists } = useData()
    const { currentStatus } = useCheckOverStatus(sarcophagus, archaeologists)
    return (
        <SarcophagusContainer sarcophagus={sarcophagus} currentStatus={currentStatus} />
    )
}

export default Wrapper
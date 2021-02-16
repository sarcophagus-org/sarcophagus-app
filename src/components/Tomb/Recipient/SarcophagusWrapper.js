import React from 'react'
import useCheckReceivedSarcophagi from '../../customHooks/useCheckReceivedSarcophagi.js'
import RecipientSarcophagusContainer from './SarcophagusContainer.js'

const Wrapper = ({sarcophagus}) => {
    const { currentStatus, error } = useCheckReceivedSarcophagi(sarcophagus)
    return (
        <RecipientSarcophagusContainer currentStatus={currentStatus} error={error} sarcophagus={sarcophagus}/>
    )
}

export default Wrapper
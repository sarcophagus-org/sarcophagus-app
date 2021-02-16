import React from 'react'
import useCollaspe from '../../customHooks/useCollaspe'
import SarcophagusCollasped from './SarcophagusCollasped'

const RecipientSarcophagusContainer = ({ sarcophagus, currentStatus, error }) => {
    const { toggle } = useCollaspe()
    // !TODO if current state is 2 resurrection option available
    return (
        <SarcophagusCollasped sarcophagus={sarcophagus} toggle={toggle} expandedOption={false} status={currentStatus} error={error} />
    )
}

export default RecipientSarcophagusContainer
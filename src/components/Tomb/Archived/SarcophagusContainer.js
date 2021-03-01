import React from 'react'
import useCollapse from '../../customHooks/useCollapse'
import SarcophagusCollapsed from './SarcophagusCollapsed'

const SarcophagusContainer = ({ sarcophagus, currentStatus }) => {
    const { toggle } = useCollapse()
    // !TODO if current state is 2 resurrection option available
    return (
        <SarcophagusCollapsed sarcophagus={sarcophagus} currentStatus={currentStatus} toggle={toggle} expandedOption={false} />
    )
}

export default SarcophagusContainer
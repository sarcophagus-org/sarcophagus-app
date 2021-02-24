import React from 'react'
import Button from '../../layout/Button'
import Resurrect from './Resurrect'

const SarcophagusExpanded = ({ sarcophagus, currentStatus, error, setCurrentStatus, toggle, refresh }) => {
    return (
        <div className="text-white text-md relative flex flex-col overflow-x-scroll hide-scrollbar" style={{maxWidth: '34.4375rem'}}>
            <Resurrect sarcophagus={sarcophagus} />
        </div>
    )}

export default SarcophagusExpanded
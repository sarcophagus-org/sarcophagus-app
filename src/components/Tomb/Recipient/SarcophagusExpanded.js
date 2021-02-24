import React from 'react'
import Resurrect from './Resurrect'

const SarcophagusExpanded = ({ sarcophagus, ...rest }) => {
    return (
        <div className="text-white text-md relative flex flex-col overflow-x-scroll hide-scrollbar" style={{maxWidth: '34.4375rem'}}>
            <Resurrect sarcophagus={sarcophagus} {...rest} />
        </div>
    )}

export default SarcophagusExpanded
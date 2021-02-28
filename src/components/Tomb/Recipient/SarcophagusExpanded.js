import React from 'react'
import Resurrect from './Resurrect'

const SarcophagusExpanded = ({ sarcophagus, ...rest }) => {
    return (
        <div className="text-white text-md relative flex flex-col overflow-x-scroll hide-scrollbar max-w-128">
            <Resurrect sarcophagus={sarcophagus} {...rest} />
        </div>
    )}

export default SarcophagusExpanded
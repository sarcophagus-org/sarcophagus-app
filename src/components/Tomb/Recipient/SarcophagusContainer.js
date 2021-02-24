import React from 'react'
import { RECIPIENT_STATUSES } from '../../../constants'
import useCollaspe from '../../customHooks/useCollaspe'
import SarcophagusCollasped from './SarcophagusCollasped'
import SarcophagusExpanded from './SarcophagusExpanded'

const RecipientSarcophagusContainer = ({ sarcophagus, currentStatus, error, ...rest }) => {
    const { collasped, toggle } = useCollaspe(true, true)
    return (
        <div className="border border-gray-500 px-4 my-8 pt-3">
            <SarcophagusCollasped 
                sarcophagus={sarcophagus} 
                toggle={toggle} 
                collasped={collasped}
                expandedOption={currentStatus === RECIPIENT_STATUSES.UNWRAPPED || !!error} 
                status={currentStatus} 
                error={error} 
            />
            {!collasped && (
                <SarcophagusExpanded sarcophagus={sarcophagus} currentStatus={currentStatus} error={error} toggle={toggle} {...rest}/>
            )}
        </div>
    )
}

export default RecipientSarcophagusContainer
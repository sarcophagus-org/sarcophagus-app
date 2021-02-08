import React from 'react'
import { STATUSES } from '../../constants'
import useCheckStatus from '../customHooks/useCheckStatus'
import ResurrectionTimer from './ResurrectionTimer'
import SarcophagusComplete from './SarcophagusComplete'
import SarcophagusPending from './SarcophagusPending'

const SarcophagusContainer = ({sarcophagus}) => {
    const { currentStatus, setCurrentStatus, error } = useCheckStatus(sarcophagus.AssetDoubleHash, sarcophagus)
    
    return (
        <div className="border border-gray-500 text-white text-md flex px-4 my-8 items-center relative" style={{height: '4.375rem', width: '24.6875rem'}}>
        <div>
            <div className="text-base font-bold text-white" style={{lineHeight: '1.625rem'}}>{sarcophagus.name}</div>
            <ResurrectionTimer resurrectionTime={sarcophagus.resurrectionTime} />
        </div>
        {currentStatus === STATUSES.PROCESS_COMPLETE 
            ? (<SarcophagusComplete sarcophagus={sarcophagus} />)
            : (<SarcophagusPending sarcophagus={sarcophagus} error={error} currentStatus={currentStatus} setCurrentStatus={setCurrentStatus}/>)
        }
    </div>
    )
}

export default SarcophagusContainer
import React from 'react'
import { STATUSES } from '../../constants'
import { useData } from '../BlockChainContext'

const SarcophagusPending = ({sarcophagus, currentStatus, setCurrentStatus, error}) => {
    const { updateSarcophagus } = useData()

    const handleUpdate = async () => {
        updateSarcophagus(sarcophagus, setCurrentStatus)
    }
    return (
        <>
            {currentStatus === STATUSES.SARCOPHAGUS_AWAIT_SIGN 
            ? (
                <>
                    <div className="absolute top-0 -mt-3" style={{right: '1rem'}}>
                        { currentStatus }
                    </div>
                    <div className="absolute top-0 right-0">
                        <button type="button" onClick={handleUpdate} className="text-black bg-white pb-1 border border-background mt-5 mr-4 text-xs font-medium flex justify-center items-center focus:outline-none" 
                        style={{height: '1.325rem', width: '5.25rem' }} > Finalize </button>
                    </div>
                    <div className="absolute bottom-0 -mb-2 text-2xs italic underline text-red bg-background px-2 z-20" style={{right: '.5rem'}}>
                        Cancel
                    </div>
                </>
            ) : (
                <>
                    <div className="absolute top-0 -mt-3" style={{right: '1rem'}}>
                        {currentStatus}
                    </div>
                    <div className="absolute bottom-0 -mb-1 text-2xs italic underline text-red bg-background px-2 z-20" style={{right: '.5rem'}}>
                        Cancel
                    </div>
                </>
            )}
        </>
    )
}

export default SarcophagusPending
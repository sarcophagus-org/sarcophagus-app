import { useEffect, useState } from 'react'
import { RECIPIENT_STATUSES, STATUSES } from "../../../constants"


const useCheckReceivedSarcophagi = (sarcophagus) => {
    const [ currentStatus, setCurrentStatus ] = useState(STATUSES.CHECKING_STATUS)
    const [ error, setError ] = useState(false)

    useEffect(() => {
        if (sarcophagus?.privateKey !== "0x0000000000000000000000000000000000000000000000000000000000000000") {
            setCurrentStatus(RECIPIENT_STATUSES.UNWRAPPED)
        }
        else if (sarcophagus?.assetId){
            setCurrentStatus(RECIPIENT_STATUSES.ACTIVE)
        }
        else if(!sarcophagus?.assetId){
            setCurrentStatus(RECIPIENT_STATUSES.CREATED)
        }
        else {setError('There was an error checking state')}
    }, [ sarcophagus ])

    return { currentStatus, error }
}

export default useCheckReceivedSarcophagi
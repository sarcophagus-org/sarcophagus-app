import { useEffect, useState } from 'react'
import { RECIPIENT_STATUSES, STATUSES } from "../../../constants"
import { checkReceivedStatus } from '../../../utils'


const useCheckReceivedSarcophagi = (sarcophagus) => {
    const [ currentStatus, setCurrentStatus ] = useState(STATUSES.CHECKING_STATUS)
    const [ error, setError ] = useState(false)

    useEffect(() => {
        const { isUnwrapped, isActive } = checkReceivedStatus(sarcophagus.resurrectionTime, sarcophagus.resurrectionWindow, sarcophagus.privateKey, sarcophagus.state)
        if (isUnwrapped) {
            setCurrentStatus(RECIPIENT_STATUSES.UNWRAPPED)
        }
        else if (sarcophagus?.assetId && isActive){
            setCurrentStatus(RECIPIENT_STATUSES.ACTIVE)
        }
        else if(!sarcophagus?.assetId && isActive){
            setCurrentStatus(RECIPIENT_STATUSES.CREATED)
        }
        else {
            setCurrentStatus('Sarcophagus was not unwrapped in time')
            setError('Sarcophagus was not unwrapped in time')
        }
    }, [ sarcophagus ])

    return { currentStatus, error }
}

export default useCheckReceivedSarcophagi
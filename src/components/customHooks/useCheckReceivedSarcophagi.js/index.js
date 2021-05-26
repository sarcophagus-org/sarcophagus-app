import { useEffect, useState } from 'react'
import { RECIPIENT_STATUSES, STATUSES } from "../../../constants"


const useCheckReceivedSarcophagi = (sarcophagus) => {
    const [ currentStatus, setCurrentStatus ] = useState(STATUSES.CHECKING_STATUS)
    const [ error, setError ] = useState(false)

    useEffect(() => {
        const resurrectionTimePlusWindow = (sarcophagus.resurrectionTime.toNumber() + sarcophagus.resurrectionWindow.toNumber()) * 1000
        const isActive = sarcophagus.state === 1 && resurrectionTimePlusWindow >= Date.now().valueOf() 
        if (sarcophagus?.privateKey !== "0x0000000000000000000000000000000000000000000000000000000000000000" && sarcophagus.state === 2) {
            setCurrentStatus(RECIPIENT_STATUSES.UNWRAPPED)
        }
        else if (sarcophagus?.assetId && isActive){
            setCurrentStatus(RECIPIENT_STATUSES.ACTIVE)
        }
        else if(!sarcophagus?.assetId && isActive){
            setCurrentStatus(RECIPIENT_STATUSES.CREATED)
        }
        else {setError('Sarcophagus was not unwrapped in time')}
    }, [ sarcophagus ])

    return { currentStatus, error }
}

export default useCheckReceivedSarcophagi
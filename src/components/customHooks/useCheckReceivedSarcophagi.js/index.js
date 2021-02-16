import { STATUSES } from "../../../constants"

const { useEffect, useState } = require("react")

const useCheckReceivedSarcophagi = (sarcophagus) => {
    const [ currentStatus, setCurrentStatus ] = useState(STATUSES.CHECKING_STATUS)
    const [ error, setError ] = useState(false)

    useEffect(() => {
        if(sarcophagus.state === 2) {
            setCurrentStatus('Resurrection available')
        } 
        else if(!sarcophagus?.assetId){
            setCurrentStatus('Sarcophagus creation in progress, resurrection unavailable')
        }
        else if (sarcophagus?.assetId) {
            setCurrentStatus('Sarcophagus Active, resurrection available')
        }
        else {setError('There was an error checking state')}
    }, [ sarcophagus ])

    return { currentStatus, error }
}

export default useCheckReceivedSarcophagi
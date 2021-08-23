import React, { useEffect, useState } from 'react'
import { useArchData } from '../../Context/ArchaeologistContext'
import useCheckStatus from '../../customHooks/useCheckStatus'
import SarcophagusContainer from './SarcophagusContainer'

const Wrapper = ({sarcophagus, refresh, ...rest}) => {
    const { currentStatus, setCurrentStatus, error, setError, checkStatus } = useCheckStatus(sarcophagus, refresh)
    const { archaeologists } = useArchData()
    const [ archaeologist, setArchaeologist] = useState({})

    useEffect(() => {
        const singleArch = archaeologists?.filter((v) => v.address === sarcophagus.archaeologist)
        setArchaeologist(singleArch[0])
    }, [archaeologists, sarcophagus])

    useEffect(() => {
        checkStatus(sarcophagus)
    }, [checkStatus, sarcophagus])
    
    return (
        <SarcophagusContainer sarcophagus={sarcophagus} currentStatus={currentStatus} setCurrentStatus={setCurrentStatus} error={error} setError={setError} archaeologist={archaeologist} refresh={refresh} {...rest}/>
    )
}

export default Wrapper
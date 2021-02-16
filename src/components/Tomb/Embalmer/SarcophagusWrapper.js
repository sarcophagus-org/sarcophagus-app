import React, { useEffect, useState } from 'react'
import { useData } from '../../BlockChainContext'
import useCheckStatus from '../../customHooks/useCheckStatus'
import SarcophagusContainer from './SarcophagusContainer'

const Wrapper = ({sarcophagus, refresh, ...rest}) => {
    const { currentStatus, setCurrentStatus, error } = useCheckStatus(sarcophagus.AssetDoubleHash, sarcophagus, refresh)
    const { archaeologists } = useData()
    const [ archaeologist, setArchaeologist] = useState({})

    useEffect(() => {
        const singleArch = archaeologists?.filter((v) => v.paymentAddress === sarcophagus.archaeologist)
        setArchaeologist(singleArch[0])
    }, [archaeologists, sarcophagus])
    return (
        <SarcophagusContainer sarcophagus={sarcophagus} currentStatus={currentStatus} setCurrentStatus={setCurrentStatus} error={error} archaeologist={archaeologist} refresh={refresh} {...rest}/>
    )
}

export default Wrapper
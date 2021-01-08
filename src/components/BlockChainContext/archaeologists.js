import { useState, useEffect, useCallback } from 'react'

const useArcheologists = (sarcophagusContract) => {
  const [ archaeologists, setArchaeologists ] = useState([])
  const [ arcAddresses, setAddresses ] = useState(false) 
  const [ arcCount, setArcCount ] = useState(false)
  
  const getArchaeologistCount = useCallback( async (sarcophagusContract) => {const count = await sarcophagusContract.archaeologistCount(); setArcCount(count)}, [])
  const getArchaeologistIndexes = useCallback( async (sarcophagusContract, count) => {
    const arcAddresses = []
    for(let i = 0; i <= count - 1; i++) {
      const address = await sarcophagusContract.archaeologistAddresses(i)
      arcAddresses.push(address)
    }
    await setAddresses(arcAddresses)
  },[])

  const getArchaeologistInfo = useCallback(async (sarcophagusContract) => {
    const archaeologists = await Promise.all(arcAddresses.map( async (address) => await sarcophagusContract.archaeologists(address) ))
    setArchaeologists(archaeologists)
  },[arcAddresses])

  
  useEffect(() => {
    if(!sarcophagusContract) return
    getArchaeologistCount(sarcophagusContract)
  },[ getArchaeologistCount, sarcophagusContract ])


  useEffect(() => {
    if (!arcCount || !sarcophagusContract) return
    if (arcCount.isZero()) return
    getArchaeologistIndexes(sarcophagusContract, arcCount.toNumber())
  },[ arcCount, getArchaeologistIndexes, sarcophagusContract ])

  useEffect(() => {
    if(!arcCount || !sarcophagusContract || !arcAddresses) return
    getArchaeologistInfo(sarcophagusContract) 
  },[ getArchaeologistCount, getArchaeologistIndexes, getArchaeologistInfo, arcAddresses, arcCount, sarcophagusContract ])
  
  return { archaeologists }
}

export {
  useArcheologists
}
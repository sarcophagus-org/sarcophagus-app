import { useState, useEffect, useCallback } from 'react'

const useArcheologists = (sarcophagusContract) => {
  const [ archaeologists, setArchaeologists ] = useState([])
  const [ arcAddresses, setAddresses ] = useState(false) 
  const [ arcCount, setArcCount ] = useState(false)
  
  const getArchaeologistCount = useCallback( async (sarcophagusContract) => {
    try {
      const count = await sarcophagusContract.archaeologistCount() 
      setArcCount(count)
    } catch (error) {
      console.error(error)
    }
  }, [])

  const getArchaeologistIndexes = useCallback( async (sarcophagusContract, count) => {
    try {
      const arcAddresses = []
      for(let i = 0; i <= count - 1; i++) {
        const address = await sarcophagusContract.archaeologistAddresses(i)
        arcAddresses.push(address)
      }
      await setAddresses(arcAddresses)
    } catch (error) {
      console.error(error)
    }
  },[])

  const getArchaeologistInfo = useCallback(async (sarcophagusContract) => {
    try {
      const archaeologists = await Promise.all(arcAddresses.map( async (address) => await sarcophagusContract.archaeologists(address) ))
      const filteredArchaeologists = archaeologists.filter(v => !v.freeBond.isZero())
      setArchaeologists(filteredArchaeologists)
    } catch (error) {
      console.error(error)
    }
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
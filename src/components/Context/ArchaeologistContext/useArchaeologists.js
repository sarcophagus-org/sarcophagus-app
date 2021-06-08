import { useState, useEffect, useCallback } from 'react'

const useArcheologists = (sarcophagusContract) => {
  const [ rawArchaeologists, setArchaeologists ] = useState([])
  const [ arcAddresses, setAddresses ] = useState(false) 
  const [ arcCount, setArcCount ] = useState(false)
  
  const getArchaeologistCount = useCallback( async () => {
    try {
      const count = await sarcophagusContract.archaeologistCount() 
      setArcCount(count)
    } catch (error) {
      console.error(error)
    }
  }, [sarcophagusContract])

  const getArchaeologistIndexes = useCallback( async (count) => {
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
  },[sarcophagusContract])

  const getArchaeologistInfo = useCallback(async () => {
    try {
      let archaeologists = await Promise.all(arcAddresses.map( async (address) => await sarcophagusContract.archaeologists(address) ))
      archaeologists = archaeologists.map((arch, index) => ({...arch, address: arcAddresses[index]}) )
      const filteredArchaeologists = archaeologists.filter(v => !v.freeBond.isZero())
      Promise.all(filteredArchaeologists.map(async (arch) => {
        try {
          const response = await fetch(arch.endpoint + "/ping")
          if(response.ok) return arch
          else return 'fail'
        } catch {
          console.error('Archaeologist unavailable -','Address:', arch.address, ' Endpoint:', arch.endpoint)
          return 'fail'
        }
      })).then(archaeologists => {
        const pingedArchaeologists = archaeologists.filter(arch => arch !== 'fail')
        setArchaeologists(pingedArchaeologists)
      })
    } catch (error) {
      console.error(error)
    }
  },[sarcophagusContract, arcAddresses])

  useEffect(() => {
    if(!sarcophagusContract) return
    getArchaeologistCount()
  },[ getArchaeologistCount, sarcophagusContract ])

  useEffect(() => {
    if (!arcCount) return
    if (arcCount.isZero()) return
    getArchaeologistIndexes(arcCount.toNumber())
  },[ arcCount, getArchaeologistIndexes ])

  useEffect(() => {
    if(!arcCount || !arcAddresses) return
    getArchaeologistInfo() 
  },[ getArchaeologistCount, getArchaeologistIndexes, getArchaeologistInfo, arcAddresses, arcCount ])
  
  return { rawArchaeologists, getArchaeologistCount }
}

export {
  useArcheologists,
}
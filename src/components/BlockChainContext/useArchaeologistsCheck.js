import { useEffect, useState, useCallback } from 'react'
import { toast } from "react-toastify"


const useArchaeologistsCheck = (sarcophagusContract, rawArchaeologists) => {
  const [ archaeologistsWithCounts, setArchaeologistsWithCounts ] = useState([])
  const [ archaeologists, setArchaeologists ] = useState([])

  const getCleanupCount = useCallback(async (address) => {
    try {
      const count = await sarcophagusContract.archaeologistCleanupsCount(address)
      return count
    } catch (e) {
        toast.error('There was an error with contract')
        console.log(e)
    }
  },[sarcophagusContract])

  const getCleanupIdentifiers = useCallback(async (address, count) => {
    if(count.isZero()) return []
    try {
      const arr = new Array(count.toNumber()).fill(undefined)
      const identifiers = await Promise.all(arr.map(async (_, i) => await sarcophagusContract.archaeologistCleanupsIdentifier(address, i)))
      return identifiers
    } catch (e) {
        toast.error('There was an error with contract')
        console.log(e)
    }
  },[sarcophagusContract])

  const getCanceledCount = useCallback(async (address) => {
    try {
      const count = await sarcophagusContract.archaeologistCancelsCount(address)
      return count
    } catch (e) {
      toast.error('There was an error with contract')
      console.log(e)
    }
  },[sarcophagusContract])

  const getCanceledIdentifiers = useCallback(async (address, count) => {
    if(count.isZero()) return []
    try {
      const arr = new Array(count.toNumber()).fill(undefined)
      const identifiers = await Promise.all(arr.map(async (_, i) => await sarcophagusContract.archaeologistCancelsIdentifier(address, i)))
      return identifiers
    } catch (e) {
      toast.error('There was an error with contract')
      console.log(e)
    }
  },[sarcophagusContract])

  const getAccusedCount = useCallback(async (address) => {
    try {
      const count = await sarcophagusContract.archaeologistAccusalsCount(address)
      return count
    } catch (e) {
      toast.error('There was an error with contract')
      console.log(e)
    }
  },[sarcophagusContract])

  const getAccusedIdentifiers = useCallback(async (address, count) => {
    if(count.isZero()) return []
    try {
      const arr = new Array(count.toNumber()).fill(undefined)
      const identifiers = await Promise.all(arr.map(async (_, i) => await sarcophagusContract.archaeologistAccusalsIdentifier(address, i)))
      return identifiers
    } catch (e) {
      toast.error('There was an error with contract')
      console.log(e)
    }
  },[sarcophagusContract])

  const getSuccessesCount = useCallback(async (address) => {
    try {
      const count = await sarcophagusContract.archaeologistSuccessesCount(address)
      return count
    } catch (e) {
      toast.error('There was an error with contract')
      console.log(e)
    }
  },[sarcophagusContract])

  const getSuccessesIdentifiers = useCallback(async (address, count) => {
    if(count.isZero()) return []
    try {
      const arr = new Array(count.toNumber()).fill(undefined)
      const identifiers = await Promise.all(arr.map(async (_, i) => await sarcophagusContract.archaeologistSuccessesIdentifier(address, i)))
      return identifiers
    } catch (e) {
      toast.error('There was an error with contract')
      console.log(e)
    }
  },[sarcophagusContract])

  const getCounts = useCallback(async () => {
    const archaeologists = await Promise.all(rawArchaeologists.map( async (archaeologist) => {
      const cleanupCount = await getCleanupCount(archaeologist.paymentAddress)
      const canceledCount = await getCanceledCount(archaeologist.paymentAddress)
      const accusedCount = await getAccusedCount(archaeologist.paymentAddress)
      const successesCount = await getSuccessesCount(archaeologist.paymentAddress)

      const archWithCounts = {...archaeologist, cleanupCount, canceledCount, accusedCount, successesCount}
      return archWithCounts
    }))
    setArchaeologistsWithCounts(archaeologists)
  }, [ rawArchaeologists, getCleanupCount,  getCanceledCount, getAccusedCount, getSuccessesCount])

  const getIdentifiers = useCallback(async () => {
    const archaeologists = await Promise.all(archaeologistsWithCounts.map( async (archaeologist) => {
      const cleanupIdentifiers = await getCleanupIdentifiers(archaeologist.paymentAddress, archaeologist.cleanupCount)
      const canceledIdentifiers = await getCanceledIdentifiers(archaeologist.paymentAddress, archaeologist.canceledCount)
      const accusedIdentifiers = await getAccusedIdentifiers(archaeologist.paymentAddress, archaeologist.accusedCount)
      const successesIdentifiers = await getSuccessesIdentifiers(archaeologist.paymentAddress, archaeologist.successesCount)

      const archWithIdentifiers = {...archaeologist, cleanupIdentifiers, canceledIdentifiers, accusedIdentifiers, successesIdentifiers}
      return archWithIdentifiers
    }))
    setArchaeologists(archaeologists)
  }, [ archaeologistsWithCounts, getCleanupIdentifiers, getCanceledIdentifiers, getAccusedIdentifiers, getSuccessesIdentifiers ])

  useEffect(() => {
    getCounts()
  }, [ getCounts ])

  useEffect(() => {
    if(!archaeologistsWithCounts.length) return
    getIdentifiers()
  }, [ getIdentifiers, archaeologistsWithCounts ])

  return { archaeologists }
}

export { useArchaeologistsCheck }
import { utils } from 'ethers';
import { useCallback, useEffect, useState } from 'react';

const useSarcophagi = (sarcophagusContract) => {
  const [ sarcophagi, setSarcophagi ] = useState([])
  const [ sarcoDoubleHashes, setSarcoDoubleHashes ] = useState(false) 
  const [ sarcoCount, setSarcoCount ] = useState(false)
  const [ pendingCount, setPendingCount ] = useState(0)
  const storage = window.localStorage
  
  const getSarcophagiCount = useCallback( async () => {
    try {
      const count = await sarcophagusContract.sarcophagusCount()
      setSarcoCount(count)
    } catch (error) {
      console.error(error)
    }
  }, [sarcophagusContract])

  const getSarcophagiDoubleHashes = useCallback( async (count) => {
    try {
      const sarcophagiDoubleHashes = []
      for(let i = 0; i <= count - 1; i++) {
        const doubleHash = await sarcophagusContract.sarcophagusDoubleHash(i)
        sarcophagiDoubleHashes.push(doubleHash)
      }
      await setSarcoDoubleHashes(sarcophagiDoubleHashes)
    } catch (error) {
      console.error(error)
    }
  },[sarcophagusContract])

  const getSarcophagInfo = useCallback(async () => {
    try {
      const sarcophagi = await Promise.all(sarcoDoubleHashes.map( async (doubleHash) => {
        return {
          ...await sarcophagusContract.sarcophagus(Buffer.from(utils.arrayify(doubleHash))), AssetDoubleHash: doubleHash
        }
      } )).catch(e => console.log("e", e))

      await setSarcophagi(sarcophagi)
    } catch (error) {
      console.error(error)
    }
  },[sarcoDoubleHashes, sarcophagusContract])

  useEffect(() => {
    if(!sarcophagusContract) return
    getSarcophagiCount()
  },[ getSarcophagiCount, sarcophagusContract])


  useEffect(() => {
    if (!sarcoCount || !sarcophagusContract) return
    if (sarcoCount.isZero()) return
    getSarcophagiDoubleHashes(sarcoCount.toNumber())
  },[ sarcoCount, getSarcophagiDoubleHashes, sarcophagusContract ])

  useEffect(() => {
    if(!sarcoCount || !sarcophagusContract || !Array.isArray(sarcoDoubleHashes)) return
    getSarcophagInfo() 
  },[ getSarcophagiCount, getSarcophagiDoubleHashes, getSarcophagInfo, sarcoDoubleHashes, sarcoCount, sarcophagusContract ])

  useEffect(() => {
    if(!sarcophagi.length) return
    let count = 0
    // maps sarocophagus double hashes
    const doubleHashArray = sarcophagi.map(sarcophagus => Buffer.from(utils.arrayify(sarcophagus.AssetDoubleHash)).toLocaleString())
    // compares the stored keys versus mined sarcophagus if no match adds to count.
    for(let i = 0; i < storage.length; i++) {
      const key = storage.key(i)
      if(!doubleHashArray.includes(key)) {
        count += 1
      }
    }
    setPendingCount(count)
  }, [sarcophagi, storage])

  useEffect(() => {
    if(!storage.length) return
    if(pendingCount === 0) return
    console.log('hello')
    // sets a interval timer to check for newly minded sarcophagus if count != 0
    const timer = setInterval(() => {
      console.log('Pending Sarcophagus are being Mined...')
      getSarcophagiCount()
    }, 5000)
    return () => clearInterval(timer)
  
  }, [ storage, pendingCount, getSarcophagiCount ])
  
  return { sarcophagi, pendingCount }
}

export { useSarcophagi }

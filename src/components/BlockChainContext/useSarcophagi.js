import { BigNumber, ethers, utils } from 'ethers';
import { useCallback, useEffect, useState } from 'react';

const useSarcophagi = (sarcophagusContract) => {
  const [ sarcophagi, setSarcophagi ] = useState([])
  const [ sarcoDoubleHashes, setSarcoDoubleHashes ] = useState(false) 
  const [ sarcoCount, setSarcoCount ] = useState(false)
  
  const getSarcophagiCount = useCallback( async (sarcophagusContract) => {
    try {
      const count = await sarcophagusContract.sarcophagusCount()
      setSarcoCount(count)
    } catch (error) {
      console.error(error)
    }
  }, [])

  const getSarcophagiDoubleHashes = useCallback( async (sarcophagusContract, count) => {
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
  },[])

  const getSarcophagInfo = useCallback(async (sarcophagusContract) => {
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
  },[sarcoDoubleHashes])

  
  useEffect(() => {
    if(!sarcophagusContract) return
    getSarcophagiCount(sarcophagusContract)
  },[ getSarcophagiCount, sarcophagusContract])


  useEffect(() => {
    if (!sarcoCount || !sarcophagusContract) return
    if (sarcoCount.isZero()) return
    getSarcophagiDoubleHashes(sarcophagusContract, sarcoCount.toNumber())
  },[ sarcoCount, getSarcophagiDoubleHashes, sarcophagusContract ])

  useEffect(() => {
    if(!sarcoCount || !sarcophagusContract || !Array.isArray(sarcoDoubleHashes)) return
    getSarcophagInfo(sarcophagusContract) 
  },[ getSarcophagiCount, getSarcophagiDoubleHashes, getSarcophagInfo, sarcoDoubleHashes, sarcoCount, sarcophagusContract ])
  
  return { sarcophagi }
}

export { useSarcophagi }

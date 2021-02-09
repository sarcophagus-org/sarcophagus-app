import { utils } from 'ethers';
import { useCallback, useEffect, useState } from 'react';
import { useWeb3 } from '../../web3';

const useRecipientSarcophagi = (sarcophagusContract) => {
  const [ recipientSarcophagi, setSarcophagi ] = useState([])
  const [ sarcoDoubleHashes, setSarcoDoubleHashes ] = useState(false) 
  const [ sarcoCount, setSarcoCount ] = useState(false)
  const { account } = useWeb3()
  
  const getSarcophagiCount = useCallback( async () => {
    try {
      const count = await sarcophagusContract.recipientSarcophagusCount(account)
      setSarcoCount(count)
    } catch (error) {
      console.error(error)
    }
  }, [sarcophagusContract])

  const getSarcophagiDoubleHashes = useCallback( async (count) => {
    try {
      const sarcophagiDoubleHashes = []
      for(let i = 0; i <= count - 1; i++) {
        const doubleHash = await sarcophagusContract.recipientSarcophagusDoubleHash(account, i)
        sarcophagiDoubleHashes.push(doubleHash)
      }
      await setSarcoDoubleHashes(sarcophagiDoubleHashes)
    } catch (error) {
      console.error(error)
    }
  },[sarcophagusContract])

  const getSarcophagInfo = useCallback(async () => {
    try {
      const recipientSarcophagi = await Promise.all(sarcoDoubleHashes.map( async (doubleHash) => {
        return {
          ...await sarcophagusContract.sarcophagus(Buffer.from(utils.arrayify(doubleHash))), AssetDoubleHash: doubleHash
        }
      } )).catch(e => console.log("e", e))

      await setSarcophagi(recipientSarcophagi)
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

  
  return { recipientSarcophagi }
}

export { useRecipientSarcophagi }
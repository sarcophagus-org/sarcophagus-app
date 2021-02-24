import { useCallback, useEffect, useState } from 'react';
import { useWeb3 } from '../../web3';
import { utils } from 'ethers';

const useRecipientSarcophagi = (sarcophagusContract, privateKey=false) => {
  const [ recipientSarcophagi, setSarcophagi ] = useState([])
  const [ sarcoDoubleHashes, setSarcoDoubleHashes ] = useState(false) 
  const [ sarcoCount, setSarcoCount ] = useState(false)
  const { account } = useWeb3()
  
  const getRecipientSarcophagiCount = useCallback( async () => {
    try {
      const count = await sarcophagusContract.recipientSarcophagusCount(privateKey || account)
      setSarcoCount(count)
    } catch (error) {
      console.error(error)
    }
  }, [sarcophagusContract, account, privateKey])

  const getSarcophagiDoubleHashes = useCallback( async (count) => {
    try {
      const sarcophagiDoubleHashes = []
      for(let i = 0; i <= count - 1; i++) {
        const doubleHash = await sarcophagusContract.recipientSarcophagusIdentifier(account, i)
        sarcophagiDoubleHashes.push(doubleHash)
      }
      await setSarcoDoubleHashes(sarcophagiDoubleHashes)
    } catch (error) {
      console.error(error)
    }
  },[sarcophagusContract, account])

  const getSarcophagiInfo = useCallback(async () => {
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
    getRecipientSarcophagiCount()
  },[ getRecipientSarcophagiCount, sarcophagusContract])


  useEffect(() => {
    if (!sarcoCount || !sarcophagusContract) return
    if (sarcoCount.isZero()) return
    getSarcophagiDoubleHashes(sarcoCount.toNumber())
  },[ sarcoCount, getSarcophagiDoubleHashes, sarcophagusContract ])

  useEffect(() => {
    if(!sarcoCount || !sarcophagusContract || !Array.isArray(sarcoDoubleHashes)) return
    getSarcophagiInfo() 
  },[ getRecipientSarcophagiCount, getSarcophagiDoubleHashes, getSarcophagiInfo, sarcoDoubleHashes, sarcoCount, sarcophagusContract ])

  
  return { recipientSarcophagi, getRecipientSarcophagiCount }
}

export { useRecipientSarcophagi }
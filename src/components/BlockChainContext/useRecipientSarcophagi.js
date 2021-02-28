import { useCallback, useEffect, useState } from 'react';
import { useWeb3 } from '../../web3';
import { BigNumber, utils } from 'ethers';

const useRecipientSarcophagi = (sarcophagusContract, privateKey=false, waitForAddress=false) => {
  const [ recipientAllSarcophagi, setSarcophagi ] = useState([])
  const [ sarcoDoubleHashes, setSarcoDoubleHashes ] = useState(false) 
  const [ sarcoCount, setSarcoCount ] = useState(BigNumber.from(0))
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
    if(waitForAddress && !privateKey) return
    if(!waitForAddress && !account) return
    getRecipientSarcophagiCount()
  },[ getRecipientSarcophagiCount, waitForAddress, privateKey, account, sarcophagusContract])


  useEffect(() => {
    if (sarcoCount.isZero()) return
    getSarcophagiDoubleHashes(sarcoCount.toNumber())
  },[ sarcoCount, getSarcophagiDoubleHashes ])

  useEffect(() => {
    if(!sarcoDoubleHashes.length && !Array.isArray(sarcoDoubleHashes)) return
    getSarcophagiInfo() 
  },[ getSarcophagiInfo, sarcoDoubleHashes, ])

  
  return { recipientAllSarcophagi, getRecipientSarcophagiCount }
}

export { useRecipientSarcophagi }
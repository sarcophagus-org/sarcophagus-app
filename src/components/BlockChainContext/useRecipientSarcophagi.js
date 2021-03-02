import { useCallback, useEffect, useState } from 'react';
import { useWeb3 } from '../../web3';
import { BigNumber, utils } from 'ethers';

const useRecipientSarcophagi = (sarcophagusContract, address=false, waitForAddress=false) => {
  const [ recipientAllSarcophagi, setAllSarcophagi ] = useState([])
  const [ recipientSarcophagi, setSarcophagi ] = useState([])
  const [ sarcoDoubleHashes, setSarcoDoubleHashes ] = useState(false) 
  const [ sarcoCount, setSarcoCount ] = useState(BigNumber.from(0))
  const { account } = useWeb3()
  
  const getRecipientSarcophagiCount = useCallback( async () => {
    try {
      const count = await sarcophagusContract.recipientSarcophagusCount(address || account)
      setSarcoCount(count)
    } catch (error) {
      console.error(error)
    }
  }, [sarcophagusContract, account, address])

  const getSarcophagiDoubleHashes = useCallback( async (count) => {
    try {
      const sarcophagiDoubleHashes = []
      for(let i = 0; i <= count - 1; i++) {
        const doubleHash = await sarcophagusContract.recipientSarcophagusIdentifier(address || account, i)
        sarcophagiDoubleHashes.push(doubleHash)
      }
      await setSarcoDoubleHashes(sarcophagiDoubleHashes)
    } catch (error) {
      console.error(error)
    }
  },[sarcophagusContract, account, address])

  const getSarcophagiInfo = useCallback(async () => {
    try {
      const recipientSarcophagi = await Promise.all(sarcoDoubleHashes.map( async (doubleHash) => {
        return {
          ...await sarcophagusContract.sarcophagus(Buffer.from(utils.arrayify(doubleHash))), AssetDoubleHash: doubleHash
        }
      } )).catch(e => console.log("e", e))

      await setAllSarcophagi(recipientSarcophagi)
      await setSarcophagi(recipientSarcophagi.filter(v => v.state === 1 || (v.state === 2 && v.privateKey !== "0x0000000000000000000000000000000000000000000000000000000000000000")))
    } catch (error) {
      console.error(error)
    }
  },[sarcoDoubleHashes, sarcophagusContract])

  useEffect(() => {
    if(!sarcophagusContract) return
    if(waitForAddress && !address) return
    if(!waitForAddress && !account) return
    getRecipientSarcophagiCount()
  },[ getRecipientSarcophagiCount, waitForAddress, address, account, sarcophagusContract])


  useEffect(() => {
    if (sarcoCount.isZero()) return
    getSarcophagiDoubleHashes(sarcoCount.toNumber())
  },[ sarcoCount, getSarcophagiDoubleHashes ])

  useEffect(() => {
    if(!sarcoDoubleHashes.length && !Array.isArray(sarcoDoubleHashes)) return
    getSarcophagiInfo() 
  },[ getSarcophagiInfo, sarcoDoubleHashes, ])

  
  return { recipientSarcophagi, recipientAllSarcophagi, getRecipientSarcophagiCount }
}

export { useRecipientSarcophagi }
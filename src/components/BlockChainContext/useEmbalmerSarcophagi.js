import { BigNumber, utils } from 'ethers';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ACTIONS } from '../../constants';
import { useWeb3 } from '../../web3';

const useEmbalmerSarcophagi = (sarcophagusContract) => {
  const [ embalmerAllSarcophagi, setSarcophagi ] = useState([])
  const [ sarcoDoubleHashes, setSarcoDoubleHashes ] = useState(false) 
  const [ sarcoCount, setSarcoCount ] = useState(BigNumber.from(0))
  const [ pendingCount, setPendingCount ] = useState(0)
  const { account } = useWeb3()
  const [ storage, setStorage ] = useState(window.localStorage)
  
  const getSarcophagiCount = useCallback( async () => {
    try {
      const count = await sarcophagusContract.embalmerSarcophagusCount(account)
      setSarcoCount(count)
    } catch (error) {
    }
  }, [sarcophagusContract, account])

  const getSarcophagiDoubleHashes = useCallback( async (count) => {
    try {
      const sarcophagiDoubleHashes = []
      for(let i = 0; i <= count - 1; i++) {
        const doubleHash = await sarcophagusContract.embalmerSarcophagusIdentifier(account, i)
        sarcophagiDoubleHashes.push(doubleHash)
      }
      await setSarcoDoubleHashes(sarcophagiDoubleHashes)
    } catch (error) {
      console.error(error)
    }
  },[sarcophagusContract, account])

  const getSarcophagInfo = useCallback(async () => {
    try {
      const embalmerSarcophagi = await Promise.all(sarcoDoubleHashes
        .map( async (doubleHash) => {
          return {
            ...await sarcophagusContract.sarcophagus(Buffer.from(utils.arrayify(doubleHash))), AssetDoubleHash: doubleHash
          }
        })
        ).catch(e => console.log("e", e))
      await setSarcophagi(embalmerSarcophagi)
    } catch (error) {
      console.error(error)
    }
  },[sarcoDoubleHashes, sarcophagusContract])

  useEffect(() => {
    let count = 0
    // compares the stored keys versus mined sarcophagus if no match adds to count.
    for(let i = 0; i < storage.length; i++) {
      const key = storage.key(i)
      // ignore cached provider
      if(key === 'WEB3_CONNECT_CACHED_PROVIDER') continue
      const item = JSON.parse(localStorage.getItem(key))
      // Sarcophagus pending mining
      if(item?.action === ACTIONS.SARCOPHAGUS_TX_MINING) {
        count += 1
      }
      // Sarcophagus pending created mining
      if(item?.action === ACTIONS.SARCOPHAGUS_CREATED) {
        count += 1
      }
    }
    setPendingCount(count)
  }, [embalmerAllSarcophagi, storage])

  useEffect(() => {
    if(pendingCount > 0) {
      // sets a interval timer to check for newly minded sarcophagus if count != 0
      const timer = setInterval(() => {
        console.log('Pending Sarcophagus are being Mined...')
        getSarcophagiCount()
      }, 10000)
      return () => clearInterval(timer)
    }
  }, [ storage, pendingCount, getSarcophagiCount ])

  useEffect(() => {
    if(sarcophagusContract && account) {
      getSarcophagiCount()
    }
  },[ getSarcophagiCount, account, sarcophagusContract])

  useEffect(() => {
    if(!sarcoCount.isZero()){
      getSarcophagiDoubleHashes(sarcoCount.toNumber())
    }
  },[ sarcoCount, getSarcophagiDoubleHashes ])

  useEffect(() => {
    if(Array.isArray(sarcoDoubleHashes) && sarcoDoubleHashes.length) {
      getSarcophagInfo() 
    }
  },[ getSarcophagInfo, sarcoDoubleHashes ])

  useEffect(() => {
    if(account) {
      toast.dark('Loading Sarcophagi', {autoClose: 1500})
    }
  },[account])



  return { embalmerAllSarcophagi, pendingCount, setStorage, getSarcophagiCount }
}

export { useEmbalmerSarcophagi }
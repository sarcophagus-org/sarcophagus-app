import { utils } from 'ethers';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ACTIONS } from '../../constants';
import { checkTransaction } from '../../utils/providers';
import { useWeb3 } from '../../web3';

const useEmbalmerSarcophagi = (sarcophagusContract) => {
  const [ embalmerAllSarcophagi, setAllSarcophagi ] = useState([])
  const [ embalmerSarcophagi, setSarcophagi ] = useState([])
  const [ pendingSarcophagi, setPendingSarcophagi ] = useState([])
  const { account, provider } = useWeb3()
  const [ storage ] = useState(window.localStorage)
  

  const getSarcophagiCount = useCallback( async (account) => {
    try {
      const count = await sarcophagusContract?.embalmerSarcophagusCount(account)
      return count
    } catch (error) {
    }
  }, [ sarcophagusContract ])

  const getSarcophagiDoubleHashes = useCallback( async (account, count) => {
    try {
      const arr = new Array(count?.toNumber()).fill(undefined)
      const identifiers = await Promise.all(arr.map(async (_, i) => await sarcophagusContract?.embalmerSarcophagusIdentifier(account, i)))
      return identifiers
    } catch (error) {
      console.error(error)
    }
  },[ sarcophagusContract ])

  const getSarcophagInfo = useCallback(async (sarcoDoubleHashes) => {
    try {
      const embalmerSarcophagi = await Promise.all(sarcoDoubleHashes
        .map( async (doubleHash) => {
          return {
            ...await sarcophagusContract?.sarcophagus(Buffer.from(utils.arrayify(doubleHash))), AssetDoubleHash: doubleHash
          }
        })
        ).catch(e => console.log("e", e))
      return embalmerSarcophagi
    } catch (error) {
      console.error(error)
    }
  },[ sarcophagusContract ])

  const getEmbalmerSarcophagi = useCallback(() => {
     // get count
     getSarcophagiCount(account).then((count) => {
      if(count?.isZero()) return
      // get identifiers
      getSarcophagiDoubleHashes(account, count).then((identifiers) => {
        if(!identifiers?.length) return
        // get info
        getSarcophagInfo(identifiers).then(sarcophagi => {
          if(!sarcophagi?.length) return 
          setSarcophagi(sarcophagi.filter((v) => v.state === 1))
          setAllSarcophagi(sarcophagi)
        }).catch(e => console.error('Sarcophagus Info', e))
      }).catch(e => console.error('Sarcophagus Identifiers', e))
    }).catch(e => console.error('Sarcophagus Count', e))
  }, [account, getSarcophagiCount, getSarcophagiDoubleHashes, getSarcophagInfo ])

  useEffect(() => {
    getEmbalmerSarcophagi()
  }, [ getEmbalmerSarcophagi ])

  useEffect(() => {
    // compares the stored keys versus mined sarcophagus if no match adds to count.
    // sets a interval timer to check for newly minded sarcophagus if count != 0
    var count = 0
    const timer = setInterval(async function() {
      count = 0
      const pendingSarcophagi = []
      for(let i = 0; i <= storage.length - 1; i++) {
        const key = storage.key(i)
        // ignore cached provider
        if(key === 'WEB3_CONNECT_CACHED_PROVIDER') continue
        // Sarcophagus pending mining
        const item = JSON.parse(localStorage.getItem(key))
        if(item?.action === ACTIONS.TRANSACTION_MINING_IN_PROGRESS) {
          const isMined = await checkTransaction(item.txReceipt.hash, provider)
            if(!isMined) {
              count += 1
              return
            } else {
              return
            }
        }
        // Sarcophagus pending created mining
        if(item?.action === ACTIONS.SARCOPHAGUS_CREATED) {
          const isMined = await checkTransaction(item.txReceipt.hash, provider)
            if(!isMined) {
              count += 1
              pendingSarcophagi.push(item)
              return
            } else {
              return
            }
        }
      }
      if(count === 0) {
        setPendingSarcophagi([])
        return () => clearInterval(timer)
      }
      setPendingSarcophagi(pendingSarcophagi)
      console.log('Pending Sarcophagus are being Mined...')
      toast.dark('Sarcophagi are being mined, please wait', { toastId: 'sarcoMining', autoClose: false })
      getEmbalmerSarcophagi()
    }, 5000)
  return () => clearInterval(timer)
  }, [ storage, getEmbalmerSarcophagi, provider ])


  return { embalmerSarcophagi, embalmerAllSarcophagi, getEmbalmerSarcophagi, pendingSarcophagi }
}

export { useEmbalmerSarcophagi }
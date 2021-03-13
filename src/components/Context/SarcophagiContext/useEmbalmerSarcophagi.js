import { utils } from 'ethers';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ACTIONS } from '../../../constants';
import { checkTransaction } from '../../../utils/providers';
import { useWeb3 } from '../../../web3';

const useEmbalmerSarcophagi = (sarcophagusContract) => {
  const { account, provider } = useWeb3()
  const [ embalmerAllSarcophagi, setAllSarcophagi ] = useState([])
  const [ embalmerSarcophagi, setSarcophagi ] = useState(false)
  const [ pendingSarcophagi, setPendingSarcophagi ] = useState([])

  const getSarcophagiCount = useCallback( async (account) => {
    try {
      const count = await sarcophagusContract?.embalmerSarcophagusCount(account)
      return count
    } catch (error) {
      console.error("There was a problem with contract : Count", error)
    }
  }, [ sarcophagusContract ])

  const getSarcophagiDoubleHashes = useCallback( async (account, count) => {
    try {
      const arr = new Array(count?.toNumber()).fill(undefined)
      const identifiers = await Promise.all(arr.map(async (_, i) => await sarcophagusContract?.embalmerSarcophagusIdentifier(account, i)))
      return identifiers
    } catch (error) {
      console.error("There was a problem with contract : EmbalmerDoubleHashes", error)
    }
  },[ sarcophagusContract ])

  const getSarcophagiInfo = useCallback(async (sarcoDoubleHashes) => {
    try {
      const embalmerSarcophagi = await Promise.all(sarcoDoubleHashes
        .map( async (doubleHash) => {
          return {
            ...await sarcophagusContract?.sarcophagus(Buffer.from(utils.arrayify(doubleHash))), AssetDoubleHash: doubleHash
          }
        })
        ).catch(e => console.error("There was a problem with contract : EmbalmerInfo", e))
      return embalmerSarcophagi
    } catch (error) {
      console.error("There was a problem with contract : EmbalmerInfo", error)
    }
  },[ sarcophagusContract ])

  const getEmbalmerSarcophagi = useCallback(() => {
    if(!account) return
    // get count
    getSarcophagiCount(account).then((count) => {
      if(count?.isZero()) return
      // get identifiers
      getSarcophagiDoubleHashes(account, count).then((identifiers) => {
        if(!identifiers?.length) return
        // get info
        getSarcophagiInfo(identifiers).then(sarcophagi => {
          if(!sarcophagi?.length) return 
          setSarcophagi(() => sarcophagi.filter((v) => v.state === 1))
          setAllSarcophagi(() => sarcophagi)
        }).catch(e => console.error('Sarcophagus Info', e))
      }).catch(e => console.error('Sarcophagus Identifiers', e))
    }).catch(e => console.error('Sarcophagus Count', e))
  }, [account, getSarcophagiCount, getSarcophagiDoubleHashes, getSarcophagiInfo ])

  const checkStorage = useCallback(async () => {
    if(!provider) return
    // compares the stored keys versus mined sarcophagus if no match adds to count.
    // sets a interval timer to check for newly minded sarcophagus if count != 0
    const storage = window.localStorage
    let count = 0
    
    // const pendingSarcophagi = []
    const arr = new Array(storage.length).fill(undefined)
    await Promise.all(arr.map(async (_, i) => {
      const key = storage.key(i)
      // ignore cached provider
      if(key === 'WEB3_CONNECT_CACHED_PROVIDER') return ""
      // Sarcophagus pending mining
      const item = await JSON.parse(localStorage.getItem(key))
      if(item?.action === ACTIONS.TRANSACTION_MINING_IN_PROGRESS || item?.action === ACTIONS.SARCOPHAGUS_CREATED) {
        const isMined = await checkTransaction(item.txReceipt.hash, provider)
        if(!isMined) {
          console.log('Pending Sarcophagus are being Mined...')
          toast.dark('Transaction is being mined, please wait', { toastId: 'sarcoMining', autoClose: false })
          count += 1
          if(item?.action === ACTIONS.SARCOPHAGUS_CREATED) {
            return item
          }
        } else {
          if(item?.action === ACTIONS.SARCOPHAGUS_CREATED) {
            localStorage.setItem(key, JSON.stringify({...item, action: 'sending file'}))
          }
        }
      }
      return ""
    })).then((pendingSarcophagi) => {
      const pendingFiltered = pendingSarcophagi.filter(v => v)
      setPendingSarcophagi(pendingFiltered)
      if(count === 0) {
        toast.dismiss('sarcoMining')
        return getEmbalmerSarcophagi()
      } else {
        setTimeout(() => {
          checkStorage()
        }, 5000)
      }
    })
  }, [ provider, getEmbalmerSarcophagi ])

  useEffect(() => {
    checkStorage().then(() => {
      getEmbalmerSarcophagi()
    })
  }, [ checkStorage, getEmbalmerSarcophagi ])

  return { embalmerSarcophagi, embalmerAllSarcophagi, pendingSarcophagi, checkStorage }
}

export { useEmbalmerSarcophagi }
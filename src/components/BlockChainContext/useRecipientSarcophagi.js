import { useCallback, useEffect, useState } from 'react';
import { useWeb3 } from '../../web3';
import { utils } from 'ethers';

const useRecipientSarcophagi = (sarcophagusContract, address=false, waitForAddress=false) => {
  const [ recipientAllSarcophagi, setAllSarcophagi ] = useState([])
  const [ recipientSarcophagi, setSarcophagi ] = useState([])
  const { account } = useWeb3()
  
  const getSarcophagiCount = useCallback( async (account) => {
    try {
      const count = await sarcophagusContract?.recipientSarcophagusCount(address || account)
      return count
    } catch (error) {
      console.error(error)
    }
  }, [sarcophagusContract, address])

  const getSarcophagiDoubleHashes = useCallback( async (account, count) => {
    try {
      const arr = new Array(count?.toNumber()).fill(undefined)
      const identifiers = await Promise.all(arr.map(async (_, i) => await sarcophagusContract?.recipientSarcophagusIdentifier(address || account, i)))
      return identifiers
    } catch (error) {
      console.error(error)
    }
  },[sarcophagusContract, address])

  const getSarcophagiInfo = useCallback(async (identifiers) => {
    try {
      const recipientSarcophagi = await Promise.all(identifiers.map( async (identifier) => {
        return {
          ...await sarcophagusContract?.sarcophagus(Buffer.from(utils.arrayify(identifier))), AssetDoubleHash: identifier
        }
      } )).catch(e => console.log("e", e))
      return recipientSarcophagi
    } catch (error) {
      console.error(error)
    }
  },[sarcophagusContract])

  const getRecipientSarcophagi = useCallback(() => {
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
          setSarcophagi(sarcophagi.filter(v => v.state === 1 || (v.state === 2 && v.privateKey !== "0x0000000000000000000000000000000000000000000000000000000000000000")))
          setAllSarcophagi(sarcophagi)
        }).catch(e => console.error('Sarcophagus Info', e))
      }).catch(e => console.error('Sarcophagus Identifiers', e))
    }).catch(e => console.error('Sarcophagus Count', e))
  }, [account, getSarcophagiCount, getSarcophagiDoubleHashes, getSarcophagiInfo ])

  useEffect(() => {
    if(waitForAddress && !address) return
    if(!waitForAddress && !account) return
    getRecipientSarcophagi()
  }, [ getRecipientSarcophagi, waitForAddress, account, address ])

  
  return { recipientSarcophagi, recipientAllSarcophagi, getRecipientSarcophagi }
}

export { useRecipientSarcophagi }
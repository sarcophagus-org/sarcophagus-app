import { useCallback, useEffect, useState } from 'react';
import { useWeb3 } from '../../../web3';
import { utils } from 'ethers';
import { toast } from 'react-toastify';
import { SARCOPHAGI_LOADING } from '../../../constants';

const useRecipientSarcophagi = (sarcophagusContract, address=false, waitForAddress=false) => {
  if(address) toast.dark(SARCOPHAGI_LOADING, { autoClose: false, toastId: 'loading-sarcophagi'})
  const [ recipientAllSarcophagi, setAllSarcophagi ] = useState([])
  const [ recipientSarcophagi, setSarcophagi ] = useState(false)
  const { account } = useWeb3()
  
  const getSarcophagiCount = useCallback( async (account) => {
    try {
      const count = await sarcophagusContract?.recipientSarcophagusCount(address || account)
      return count
    } catch (error) {
      console.error("There was a problem with contract : RecipientCount", error)
    }
  }, [sarcophagusContract, address])

  const getSarcophagiDoubleHashes = useCallback( async (account, count) => {
    try {
      const arr = new Array(count?.toNumber()).fill(undefined)
      const identifiers = await Promise.all(arr.map(async (_, i) => await sarcophagusContract?.recipientSarcophagusIdentifier(address || account, i)))
      return identifiers
    } catch (error) {
      console.error("There was a problem with contract : RecipientDoubleHashes", error)
    }
  },[sarcophagusContract, address])

  const getSarcophagiInfo = useCallback(async (identifiers) => {
    try {
      const recipientSarcophagi = await Promise.all(identifiers.map( async (identifier) => {
        return {
          ...await sarcophagusContract?.sarcophagus(Buffer.from(utils.arrayify(identifier))), AssetDoubleHash: identifier
        }
      } )).catch(e => console.error("There was a problem with contract : RecipientInfo", e))
      return recipientSarcophagi
    } catch (error) {
      console.error("There was a problem with contract : RecipientInfo", error)
    }
  },[sarcophagusContract])

  const getRecipientSarcophagi = useCallback(() => {
     // get count
     getSarcophagiCount(account).then((count) => {
      if(count?.isZero() || !count) return
      // get identifiers
      getSarcophagiDoubleHashes(account, count).then((identifiers) => {
        if(!identifiers?.length) return
        // get info
        getSarcophagiInfo(identifiers).then(sarcophagi => {
          if(!sarcophagi?.length) return 
          setSarcophagi(sarcophagi.filter((sarcophagus) => {
            const resurrectionTimePlusWindow = (sarcophagus.resurrectionTime.toNumber() + sarcophagus.resurrectionWindow.toNumber()) * 1000
            const isUnwrapped = sarcophagus.state === 2 && sarcophagus.privateKey !== "0x0000000000000000000000000000000000000000000000000000000000000000"
            const isActive = sarcophagus.state === 1 && resurrectionTimePlusWindow >= Date.now().valueOf() 
            return (isActive || isUnwrapped)
          }))
          setAllSarcophagi(sarcophagi)
          toast.dismiss('loading-sarcophagi')
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
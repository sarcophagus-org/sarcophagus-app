import { utils } from 'ethers';
import { useCallback, useEffect, useState } from 'react';
import { useWeb3 } from '../../../web3';

const useEmbalmerSarcophagi = (sarcophagusContract) => {
  const { account } = useWeb3()
  const [ embalmerAllSarcophagi, setAllSarcophagi ] = useState([])
  const [ embalmerSarcophagi, setSarcophagi ] = useState(false)

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


  useEffect(() => {
      getEmbalmerSarcophagi()
  }, [ getEmbalmerSarcophagi ])

  return { embalmerSarcophagi, embalmerAllSarcophagi, getEmbalmerSarcophagi }
}

export { useEmbalmerSarcophagi }
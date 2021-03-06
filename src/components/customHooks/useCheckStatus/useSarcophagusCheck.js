import { useWeb3 } from "../../../web3"
import { useCallback, useState, useEffect } from 'react'
import { ACTIONS, ERROR, STATUSES } from "../../../constants"
import { utils } from "ethers"

const useSarcophagusCheck = ( data, assetDoubleHash, setCurrentStatus, error, setError, refresh ) => {
    const { provider } = useWeb3()
    const [ isSarcophagusMined, setSarcophagusMined ] = useState(false)
  
    const checkForSarcophagus = useCallback( async () => {
      try {
        const txReceipt = await provider.getTransactionReceipt(data.txReceipt.hash)
        if(txReceipt && txReceipt.blockNumber) {
          if(data?.action === ACTIONS.TRANSACTION_MINING_IN_PROGRESS) {
            const doubleHashUint = Buffer.from(utils.arrayify(assetDoubleHash))
            localStorage.removeItem(doubleHashUint.toLocaleString())
            return
          }
          setSarcophagusMined(true)
          setCurrentStatus(STATUSES.SARCOPHAGUS_SUCCESS)
        } 
      } catch (e) {
        console.error(e)
        setError(ERROR.BLOCKCHAIN_SERVER)
      }
    },[ data, provider , setError, setCurrentStatus, assetDoubleHash])
  
    // check localStorage data on sarcophagus
    useEffect(() => {
      if(!data) return
      if(error) return
      checkForSarcophagus()
    }, [data, checkForSarcophagus, error])
  
    return { isSarcophagusMined }
  }

export default useSarcophagusCheck
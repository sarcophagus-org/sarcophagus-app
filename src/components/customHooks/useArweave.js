import { utils } from "ethers";
import { useEffect, useState, useCallback } from "react"
import { toast } from "react-toastify";
import { ERROR_MESSAGES_MINING, INTERVAL_LENGTH_SECONDS, INTERVAL_TIMEOUT_MINS, SARCOPHAGI_STATUS_MESSAGES } from "../../constants";
import {initArweave, arweaveFileTypeExists, arweaveFileValid} from "../../utils/arweave";
import { useData } from "../BlockChainContext";

const useArweave = (assetDoubleHash, name) => {
  const [ doubleHashUint, setDoubleHashUint ] = useState(false)
  const [ status, setStatus ] = useState(false)
  const [ error, setError ] = useState(false)
  const [ data, setData] = useState(false)

  useEffect(() => {
    if(!assetDoubleHash) return
    const hashUint = utils.arrayify(assetDoubleHash)
    const hashBuffed = Buffer.from(hashUint)
    setDoubleHashUint(hashBuffed)
  }, [assetDoubleHash])

  useEffect(() => {
    if(!doubleHashUint) return
    const storedData = localStorage.getItem(doubleHashUint.toLocaleString())
    if(!storedData) return
    setData(JSON.parse(storedData))

  }, [doubleHashUint])

  const arweave = useCallback( async () => {
    if(!doubleHashUint || !data) return
    const { NewPublicKey, AssetDoubleHash, AssetId, V, R, S, DEF} = data
    const arweave = initArweave()
    const fileValid = await arweaveFileValid(arweave, AssetId, DEF)
  
    if (!fileValid) {
      toast.error(ERROR_MESSAGES_MINING.ARWEAVE_FILE)
      setError(ERROR_MESSAGES_MINING.ARWEAVE_FILE)
    }
  
    /* Wait for TX to be mined */
    const startTime = new Date().getTime();
    let errorRetries = 2
    const interval = setInterval(async () => {
      /* Stop checking and fail after 15 minutes */
      if (new Date().getTime() - startTime > (INTERVAL_TIMEOUT_MINS * 60 * 1000)) {
        clearInterval(interval);
        setStatus(SARCOPHAGI_STATUS_MESSAGES.STATUS_MINING_TIMED_OUT)
        toast.error(`${name}: ${SARCOPHAGI_STATUS_MESSAGES.STATUS_MINING_TIMED_OUT}`)
      }
  
      try {
        const response = await arweave.api.get(`${AssetId}`)
        console.log('Arweave ~response', response)
        switch (response.status) {
          case 202:
            /* Pending Tx (still mining) */
            setStatus('still mining')
            console.log('still mining')
            break;
          case 200:
            /* Successful Tx */
            clearInterval(interval)
            setStatus(SARCOPHAGI_STATUS_MESSAGES.STATUS_SUCCESS)
            /* Check that content type tag isn't empty */
            const fileTypeExists = await arweaveFileTypeExists(arweave, AssetId)
            if (!fileTypeExists) {
              setError(ERROR_MESSAGES_MINING.ARWEAVE_FILE)
              toast.error(`${name}: ${ERROR_MESSAGES_MINING.ARWEAVE_FILE}`)
            }
            /* Call Update Sarcophagus with response from Arch */

              break;
              default:
  
          /* Problem with the Tx (status is something other than 202 or 200) */
          if (errorRetries > 0) {
            errorRetries -= 1
          } else {
            clearInterval(interval)
            setError(ERROR_MESSAGES_MINING.ARWEAVE_TRANSACTION)
            toast.error(`${name}: ${ERROR_MESSAGES_MINING.ARWEAVE_TRANSACTION}`)
          }
        }
      } catch {
        /* Error querying arweave */
        
        if (errorRetries > 0) {
          errorRetries -= 1
        } else {
          clearInterval(interval)
          setError(ERROR_MESSAGES_MINING.ARWEAVE_TRANSACTION)
          toast.error(`${name}: ${ERROR_MESSAGES_MINING.ARWEAVE_TRANSACTION}`)
        }
        return { status }
      }
    }, INTERVAL_LENGTH_SECONDS * 1000)
  }, [doubleHashUint, data, status, name])

  useEffect(() => {
    if(status === SARCOPHAGI_STATUS_MESSAGES.STATUS_SUCCESS) return
    arweave()
  }, [arweave, status])
  /* Validate Arweave File using assetId from Archaeologist response */
  return { status, error }
}

export default useArweave
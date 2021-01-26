import { useEffect, useState, useCallback } from "react"
import {initArweave, arweaveFileTypeExists, arweaveFileValid} from "../../utils/arweave";
import { useData } from "../BlockChainContext";

const useArweave = (assetDoubleHash) => {
  const sarcophagusContract = useData()
  const [ status, setStatus ] = useState(false)
  const [ data, setData] = useState(false)

  useEffect(() => {
    if(!assetDoubleHash) return
    const storedData = localStorage.getItem(assetDoubleHash)
    if(!storedData) return
    setData(JSON.parse(storedData))

  }, [assetDoubleHash])

  const arweave = useCallback( async () => {
    if(!assetDoubleHash || !data) return
    const { NewPublicKey, AssetDoubleHash, AssetId, V, R, S, DEF} = data
    const arweave = initArweave()
    const fileValid = await arweaveFileValid(arweave, AssetId, DEF)
  
    if (!fileValid) {
      throw new Error("There was an error with the Arweave file")
    }
  
    /* Wait for TX to be mined */
    const startTime = new Date().getTime();
    const INTERVAL_LENGTH_SECONDS = 5
    const INTERVAL_TIMEOUT_MINS = 15
    let errorRetries = 2
    const interval = setInterval(async () => {
      /* Stop checking and fail after 15 minutes */
      if (new Date().getTime() - startTime > (INTERVAL_TIMEOUT_MINS * 60 * 1000)) {
        clearInterval(interval);
        setStatus('Mining Timed Out')
        throw new Error("Mining Timed Out")
      }
  
      try {
        const response = await arweave.api.get(`tx/${AssetId}`)
        switch (response.status) {
          case 202:
            /* Pending Tx (still mining) */
            setStatus('still mining')
            console.log('still mining')
            break;
          case 200:
            /* Successful Tx */
            clearInterval(interval)
  
            /* Check that content type tag isn't empty */
            const fileTypeExists = await arweaveFileTypeExists(arweave, AssetId)
            if (!fileTypeExists) {
              setStatus('There was an error with the Arweave file')
              throw new Error("There was an error with the Arweave file type")
            }
  
            /* Call Update Sarcophagus with response from Arch */
            sarcophagusContract.updateSarcophagus(NewPublicKey, AssetDoubleHash, AssetId, V, R, S)
              .then((txReceipt) => {
                console.log("🚀 update ~txReceipt", txReceipt)
              }).catch(e => console.error("Error updating sarcophagus:", e))
            break;
          default:
  
            /* Problem with the Tx (status is something other than 202 or 200) */
            if (errorRetries > 0) {
              errorRetries -= 1
            } else {
              clearInterval(interval)
              setStatus('There was an error with the Arweave Transaction')
              throw new Error("There was an error with the Arweave Transaction")
            }
        }
      } catch {
        /* Error querying arweave */
  
        if (errorRetries > 0) {
          errorRetries -= 1
        } else {
          clearInterval(interval)
          setStatus('There was an error with the Arweave Transaction')
          throw new Error("There was an error with the Arweave Transaction")
        }
        return { status }
      }
    }, INTERVAL_LENGTH_SECONDS * 1000)
  }, [assetDoubleHash, data, sarcophagusContract, status])

  useEffect(() => {
    arweave()
  }, [arweave])
  /* Validate Arweave File using assetId from Archaeologist response */
  return { status }
}

export default useArweave
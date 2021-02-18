import { useCallback, useEffect, useState } from "react"
import { ERROR, INTERVAL_LENGTH_SECONDS, INTERVAL_TIMEOUT_MINS, STATUSES } from "../../../constants"
import { arweaveFileTypeExists, arweaveFileValid, initArweave } from "../../../utils/arweave"

const useFileMiningCheck = (archResponse, setCurrentStatus, error, setError, name) => {
  const [ pending, setPending ] = useState(false)
  const checkFileMinedStatus = useCallback(async () => {
    if(pending) return
    setPending(true)
    let errorRetries = 2  
    let interval
    try {
      const Arweave = initArweave()
      let { AssetId, doubleEncryptedFile } = archResponse
      const fileValid = await arweaveFileValid(Arweave, AssetId, doubleEncryptedFile)
    
      if (!fileValid) {
        setError(ERROR.ARWEAVE_FILE_ERROR)
      }
      const firstRequest = await Arweave.api.get(`tx/${AssetId}`)
      if(firstRequest.status === 200) {
        setCurrentStatus(STATUSES.SARCOPHAGUS_AWAIT_SIGN)
        return
      }
      /* Wait for TX to be mined */
      const startTime = new Date().getTime();   
      interval = setInterval(async () => {
        /* Stop checking and fail after 15 minutes */
        if (new Date().getTime() - startTime > (INTERVAL_TIMEOUT_MINS * 60 * 1000)) {
          clearInterval(interval);
          setCurrentStatus(STATUSES.ARWEAVE_TIMEOUT)
        }
        const response = await Arweave.api.get(`tx/${AssetId}`)
        switch (response.status) {
          case 202:
            setCurrentStatus(STATUSES.ARWEAVE_PENDING)
            console.log(`${name}: still mining`)
            break
          case 200:
            /* Successful Tx */
            /* Check that content type tag isn't empty */
            const fileTypeExists = await arweaveFileTypeExists(Arweave, AssetId)
            if (!fileTypeExists) {
              setError(ERROR.ARWEAVE_FILE_ERROR)
            }
            setCurrentStatus(STATUSES.SARCOPHAGUS_AWAIT_SIGN)
            clearInterval(interval)
            return clearInterval(interval)
          default:
            /* Problem with the Tx (status is something other than 202 or 200) */
            if (errorRetries > 0) {
              errorRetries -= 1
              break
            } else {
              setError(ERROR.ARWEAVE_TRANSACTION_FAILED)
              return clearInterval(interval)
            }
          }
        }, INTERVAL_LENGTH_SECONDS * 1000)
    } catch {
      /* Error querying arweave */
      if (errorRetries > 0) {
        errorRetries -= 1
      } else {
        clearInterval(interval)
        setError(ERROR.ARWEAVE_TRANSACTION_FAILED)
      }
    }
  },[archResponse, setCurrentStatus, setError, name, pending])


  useEffect(() => {
    if(!archResponse?.AssetId) return
    if(!!error) return
    checkFileMinedStatus()
  }, [checkFileMinedStatus, archResponse, error])
}

export default useFileMiningCheck
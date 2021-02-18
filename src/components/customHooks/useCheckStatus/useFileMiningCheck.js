import { useCallback, useEffect } from "react"
import { ERROR, INTERVAL_LENGTH_SECONDS, INTERVAL_TIMEOUT_MINS, STATUSES } from "../../../constants"
import { arweaveFileTypeExists, arweaveFileValid, initArweave } from "../../../utils/arweave"

const useFileMiningCheck = (archResponse, setArchResponse, setCurrentStatus, error, setError, name) => {
    const checkFileMinedStatus = useCallback(async () => {
      const Arweave = initArweave()
      let { AssetId, doubleEncryptedFile } = archResponse
      const fileValid = await arweaveFileValid(Arweave, AssetId, doubleEncryptedFile)
    
      if (!fileValid) {
        setError(ERROR.ARWEAVE_FILE_ERROR)
      }
      /* Wait for TX to be mined */
      const startTime = new Date().getTime();
      let errorRetries = 2     
      const interval = setInterval(async () => {
        /* Stop checking and fail after 15 minutes */
        if (new Date().getTime() - startTime > (INTERVAL_TIMEOUT_MINS * 60 * 1000)) {
          clearInterval(interval);
          setCurrentStatus(STATUSES.ARWEAVE_TIMEOUT)
        }
        try {
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
              setArchResponse(false)
              clearInterval(interval)
              return clearInterval(interval)
            case 404:
              if (errorRetries > 0) {
                errorRetries -= 1
                break
              } else {
                setError(ERROR.ARWEAVE_TRANSACTION_FAILED)
                return clearInterval(interval)
              }
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
          } catch {
            /* Error querying arweave */
            if (errorRetries > 0) {
              errorRetries -= 1
            } else {
              clearInterval(interval)
              setError(ERROR.ARWEAVE_TRANSACTION_FAILED)
            }
          }
        }, INTERVAL_LENGTH_SECONDS * 5000)
  },[archResponse, setArchResponse, setCurrentStatus, setError, name])


  useEffect(() => {
    if(!archResponse?.AssetId) return
    if(!!error) return
    checkFileMinedStatus()
  }, [checkFileMinedStatus, archResponse, error])
}

export default useFileMiningCheck
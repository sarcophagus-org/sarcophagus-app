import { useCallback } from "react"
import { ERROR, STATUSES, INTERVAL_LENGTH_SECONDS, INTERVAL_TIMEOUT_MINS } from '../../constants'
import {initArweave, arweaveFileTypeExists, arweaveFileValid} from "../../utils/arweave";
import { useWeb3 } from "../../web3";
import request from "../requests";

const useStatusCallbacks = (setSarcophagusMined, setMessages, setError, setArchResponse, archResponse, data) => {
  const { provider } = useWeb3()
  const Arweave = initArweave()

  const checkForSarcophagus = useCallback( async () => {
    try {
      const txReceipt = await provider.getTransactionReceipt(data.txReceipt.hash)
      if(txReceipt && txReceipt.blockNumber) {
        setSarcophagusMined(true)
        setMessages(STATUSES.SARCOPHAGUS_SUCCESS)
      } 
    } catch (e) {
      console.error(e)
      setError(ERROR.BLOCKCHAIN_SERVER)
    }
  },[ data.txReceipt, provider, setError, setMessages, setSarcophagusMined ])
  
  const handleSendFile = useCallback(async (doubleEncryptedFile, fileType, endpoint) => {
    try {
      const archEndpoint = 'http://' + endpoint + '/file'
      const uint8File = new Uint8Array(doubleEncryptedFile.data)
      const fileEncoded = await btoa([].reduce.call(uint8File, function (p, c) { return p + String.fromCharCode(c) }, ''))
      const responseFromArch = await fetch(archEndpoint, {
        method: 'POST',
        body: JSON.stringify({
          fileType: fileType,
          fileBytes: fileEncoded
        })
      })
      // TODO: set explicit error response from arch service
      if (!responseFromArch.ok)  throw new Error("Failed to send file")
      const data = await responseFromArch.json()
      return data
    } catch (e) {
      console.error(e)
      setError(ERROR.ARWEAVE_FILE_ERROR)
    }
  }, [ setError ])
  
  const sendFileToService = useCallback( async () => {
    try {
      const {doubleEncryptedFile, fileType, endpoint, txReceipt } = data
      setMessages(STATUSES.ARWEAVE_STARTED)
      const responseFromArch = await handleSendFile(doubleEncryptedFile, fileType, endpoint)
      if(!responseFromArch?.AssetId) {
        setError(ERROR.ARWEAVE_TRANSACTION_FAILED)
        setMessages(ERROR.ARWEAVE_TRANSACTION_FAILED)
        return
      }

      let { NewPublicKey, AssetDoubleHash, AssetId, V, R, S } = responseFromArch 
      const storageObject = {
          NewPublicKey: NewPublicKey, 
          AssetDoubleHash: AssetDoubleHash, 
          V: V, 
          R: R, 
          S: S, 
          AssetId: AssetId, 
          doubleEncryptedFile:doubleEncryptedFile, 
          txReceipt: txReceipt
        }
      localStorage.setItem(AssetDoubleHash, JSON.stringify(storageObject))
      setArchResponse(storageObject)
      setMessages(STATUSES.ARWEAVE_PENDING)
        
      } catch(e) {
        setError(ERROR.ARWEAVE_TRANSACTION_FAILED)
        console.error(e)
      }
    },[ data, setError, setMessages, setArchResponse, handleSendFile ])
  
  const checkFileMinedStatus = useCallback(async () => {
    let { AssetId, doubleEncryptedFile } = archResponse
    const fileValid = await arweaveFileValid(Arweave, AssetId, doubleEncryptedFile)
  
    if (!fileValid) {
      setError(ERROR.ARWEAVE_FILE)
    }
    /* Wait for TX to be mined */
    const startTime = new Date().getTime();
    let errorRetries = 2
    const interval = setInterval(async () => {
      /* Stop checking and fail after 15 minutes */
      if (new Date().getTime() - startTime > (INTERVAL_TIMEOUT_MINS * 60 * 1000)) {
        clearInterval(interval);
        setMessages(STATUSES.ARWEAVE_TIMEOUT)
      }
      try {
        const response = await Arweave.api.get(`tx/${AssetId}`)
        switch (response.status) {
          case 202:
            setMessages(STATUSES.ARWEAVE_PENDING)
            break;
          case 200:
            /* Successful Tx */
            clearInterval(interval)
            /* Check that content type tag isn't empty */
            setMessages(STATUSES.SARCOPHAGUS_AWAIT_SIGN)
            setArchResponse(false)
            const fileTypeExists = await arweaveFileTypeExists(Arweave, AssetId)
            if (!fileTypeExists) {
              setError(ERROR.ARWEAVE_FILE)
            }
            
              break;
              default:
  
          /* Problem with the Tx (status is something other than 202 or 200) */
          if (errorRetries > 0) {
            errorRetries -= 1
          } else {
            clearInterval(interval)
            setError(ERROR.ARWEAVE_TRANSACTION)
          }
        }
      } catch {
        /* Error querying arweave */
        if (errorRetries > 0) {
          errorRetries -= 1
        } else {
          clearInterval(interval)
          setError(ERROR.ARWEAVE_TRANSACTION)
        }
      }
    }, INTERVAL_LENGTH_SECONDS * 1000)
  },[archResponse, setError, setMessages, setArchResponse, Arweave])

  return {
    checkFileMinedStatus,
    checkForSarcophagus,
    sendFileToService
  }
}

export default useStatusCallbacks
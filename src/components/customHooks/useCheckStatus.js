import { utils } from "ethers";
import { useEffect, useState, useCallback } from "react"
import { toast } from "react-toastify";
import { ERROR_MESSAGES_MINING, INTERVAL_LENGTH_SECONDS, INTERVAL_TIMEOUT_MINS, MESSAGES } from "../../constants";
import {initArweave, arweaveFileTypeExists, arweaveFileValid} from "../../utils/arweave";
import { useWeb3 } from "../../web3";
const arweave = initArweave()

const useCheckStatus = (assetDoubleHash=false, sarcophagus) => {
  const [ doubleHashUint ] = useState(Buffer.from(utils.arrayify(assetDoubleHash)))
  const [ data, setData] = useState(false)
  const [ isSarcophagusMined, setSarcophagusMined ] = useState(false)
  const [ archResponse, setArchResponse ] = useState({})
  const { provider } = useWeb3()
  const [ message, setMessages ] = useState(MESSAGES.STATUS_PENDING)
  const [ error, setError ] = useState(false)


  // check local storage for stored data on sarcophagi if exists
  // TODO Might wnat to revisit: This should stop the process here if already mined
  useEffect(() => {
    if(!doubleHashUint) return
    try {
      const storedData = localStorage.getItem(doubleHashUint.toLocaleString())
      const parseData = JSON.parse(storedData)
      // if there is no stored data then process should be finished This will probably need to more indepth check
      if(!storedData) {
          // check for state of 2 on sarcophagus for unwrapping
          if(sarcophagus?.state === 2) {
            return
          }

          // check for Asset ID on sarcophagus
          if(sarcophagus?.assetId) {
            setMessages(MESSAGES.STATUS_FINISH)
            return
          }
      } else {

        // if there is an AssetId skip to checking mining status
        if(parseData?.AssetId) {
          setArchResponse(parseData)
          return
        }
        setData(parseData)
        return
      }
    } catch {
      setError('There was a problem with file')
      toast.error('There was a problem with file')
    }
  }, [doubleHashUint, sarcophagus])

  const checkForSarcophagus = useCallback( async () => {
    try {
      // check if sarcophagus has been mined
      const txReceipt = await provider.getTransactionReceipt(data.txReceipt.hash)
      if(txReceipt && txReceipt.blockNumber) {
        setSarcophagusMined(true)
        setMessages('Sarcophagus mined!')
      } else {
        setMessages(MESSAGES.STATUS_SARCPHAGUS_STILL_MINING)
      }
    } catch (e) {
      console.error(e)
      setError('There was an error contacting blockchain')
    }
  },[data.txReceipt, provider])

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
      if (!responseFromArch.ok) { console.log("NOT OKAY", responseFromArch.json()); throw new Error("Failed to send file") }
      const data = await responseFromArch.json()
      return data
    } catch (e) {
      console.error(e)
    }
  },[])

  const sendFileToService = useCallback( async () => {
    try {
      const {DEF, fileType, endpoint, txReceipt } = data
      setMessages(MESSAGES.STATUS_FILE_SENDING)
      const responseFromArch = await handleSendFile(DEF, fileType, endpoint)
      if(!responseFromArch?.AssetId) {
        setError('Error sending file to archaeologist')
        setMessages('Error sending file to archaeologist')
      }
      if(responseFromArch?.AssetId) {
        let { NewPublicKey, AssetDoubleHash, AssetId, V, R, S } = responseFromArch 
        const storageObject = {NewPublicKey: NewPublicKey, AssetDoubleHash: AssetDoubleHash, V: V, R: R, S: S, AssetId: AssetId, DEF:DEF, txReceipt: txReceipt}
        localStorage.setItem(AssetDoubleHash, JSON.stringify(storageObject))
        setArchResponse(storageObject)
        setMessages('File has been Sent to Service')
      } 
    } catch(e) {
      setError('Error sending file to archaeologist:')
      console.error(e)
    }
  },[ data, handleSendFile ])

  const checkFileMinedStatus = useCallback(async () => {
    let { AssetId, DEF } = archResponse
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
        setMessages(MESSAGES.STATUS_MINING_TIMED_OUT)
        toast.error(`${MESSAGES.STATUS_MINING_TIMED_OUT}`)
      }
      try {
        const response = await arweave.api.get(`tx/${AssetId}`)
        switch (response.status) {
          case 202:
            setMessages(MESSAGES.STATUS_SARCPHAGUS_STILL_MINING)
            break;
          case 200:
            /* Successful Tx */
            clearInterval(interval)
            /* Check that content type tag isn't empty */
            setMessages(MESSAGES.STATUS_AWAITING_APPROVAL)
            setArchResponse(false)
            const fileTypeExists = await arweaveFileTypeExists(arweave, AssetId)
            if (!fileTypeExists) {
              setError(ERROR_MESSAGES_MINING.ARWEAVE_FILE)
              toast.error(`${ERROR_MESSAGES_MINING.ARWEAVE_FILE}`)
            }
            
              break;
              default:
  
          /* Problem with the Tx (status is something other than 202 or 200) */
          if (errorRetries > 0) {
            errorRetries -= 1
          } else {
            clearInterval(interval)
            setError(ERROR_MESSAGES_MINING.ARWEAVE_TRANSACTION)
            toast.error(`${ERROR_MESSAGES_MINING.ARWEAVE_TRANSACTION}`)
          }
        }
      } catch {
        /* Error querying arweave */
        
        if (errorRetries > 0) {
          errorRetries -= 1
        } else {
          clearInterval(interval)
          setError(ERROR_MESSAGES_MINING.ARWEAVE_TRANSACTION)
          toast.error(`${ERROR_MESSAGES_MINING.ARWEAVE_TRANSACTION}`)
        }
      }
    }, INTERVAL_LENGTH_SECONDS * 1000)
  },[archResponse])
  
  // check localStorage data on sarcophagus
  useEffect(() => {
    if(!data) return
    if(error) return
    checkForSarcophagus()
  }, [data, checkForSarcophagus, error])

  // // send file is not sent
  // useEffect(() => {
  //   if(!isSarcophagusMined) return
  //   if(error) return
  //   sendFileToService()
  // },[sendFileToService, isSarcophagusMined, error])

  // check file mining status
  useEffect(() => {
    if(!archResponse?.AssetId) return
    if(error) return
    checkFileMinedStatus()
  }, [checkFileMinedStatus, archResponse, error])

  console.log('STATUS', message)
  console.log('ERROR', error)
  return { message, error }
}

export default useCheckStatus
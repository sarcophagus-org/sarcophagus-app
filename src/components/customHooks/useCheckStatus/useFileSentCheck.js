import { useCallback, useEffect, useState } from 'react'
import { ACTIONS, ERROR, STATUSES } from '../../../constants'

const useFileSentCheck = ( isSarcophagusMined, data, setCurrentStatus, error, setError ) => {
  const [ sentArchResponse, setSentArchResponse ] = useState(false)
  const [ pending, setPending ] = useState(false)
  
  const handleSendFile = useCallback( async (doubleEncryptedFile, endpoint, setError) => {
    try {
      const archEndpoint = endpoint + '/file'
      const uint8File = new Uint8Array(doubleEncryptedFile.data)
      const fileEncoded = await btoa([].reduce.call(uint8File, function (p, c) { return p + String.fromCharCode(c) }, ''))
      const params = { method: 'POST', body: JSON.stringify({fileBytes: fileEncoded}) }
      const responseFromArch = await fetch(archEndpoint, params)
      // TODO: set explicit error response from arch service
      if (!responseFromArch.ok)  {
        setError(ERROR.ARWEAVE_TRANSACTION_FAILED)
        return
      }
      const data = await responseFromArch.json()
      return data
    } catch (e) {
      console.error(e)
      setError(ERROR.ARWEAVE_FILE_ERROR)
    }
  }, [])
  
  const sendFileToService = useCallback( async () => {
    if(pending) return
    setPending(true)
    try {
      const {doubleEncryptedFile, endpoint, txReceipt, action } = data
      if(action === ACTIONS.SARCOPHAGUS_ARWEAVE_FILE_ACCEPTED) return 
      setCurrentStatus(STATUSES.ARWEAVE_STARTED)
      const responseFromArch = await handleSendFile(doubleEncryptedFile, endpoint, setError)

      let { NewPublicKey, AssetDoubleHash, AssetId, V, R, S } = await responseFromArch 
      const storageObject = {
          action: ACTIONS.SARCOPHAGUS_ARWEAVE_FILE_ACCEPTED,
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
      setSentArchResponse(storageObject)
      setCurrentStatus(STATUSES.ARWEAVE_PENDING)
        
      } catch(e) {
        setError(ERROR.ARWEAVE_TRANSACTION_FAILED)
        console.error(e)
      }
    },[ data, handleSendFile, setSentArchResponse, setCurrentStatus, setError, pending ])

  useEffect(() => {
    if(!isSarcophagusMined) return
    if(error) return
    sendFileToService()
  },[sendFileToService, isSarcophagusMined, error])

  return { sentArchResponse }
}

export default useFileSentCheck
import { useCallback, useEffect } from 'react'
import { ERROR, STATUSES } from '../../../constants'

const useFileSentCheck = ( isSarcophagusMined, setArchResponse, data, setCurrentStatus, error, setError ) => {
    
    const handleSendFile = useCallback( async (doubleEncryptedFile, fileType, endpoint) => {
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
    }, [setError])
    
    const sendFileToService = useCallback( async () => {
      try {
        const {doubleEncryptedFile, fileType, endpoint, txReceipt } = data
        setCurrentStatus(STATUSES.ARWEAVE_STARTED)
        const responseFromArch = await handleSendFile(doubleEncryptedFile, fileType, endpoint)
        if(!responseFromArch?.AssetId) {
          setError(ERROR.ARWEAVE_TRANSACTION_FAILED)
          setCurrentStatus(ERROR.ARWEAVE_TRANSACTION_FAILED)
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
        setCurrentStatus(STATUSES.ARWEAVE_PENDING)
          
        } catch(e) {
          setError(ERROR.ARWEAVE_TRANSACTION_FAILED)
          console.error(e)
        }
      },[ data, handleSendFile, setArchResponse, setCurrentStatus, setError ])
  
    useEffect(() => {
      if(!isSarcophagusMined) return
      if(error) return
      sendFileToService()
    },[sendFileToService, isSarcophagusMined, error])
  }

  export default useFileSentCheck
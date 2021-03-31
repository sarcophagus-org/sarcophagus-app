import { utils } from 'ethers'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { ACTIONS, ERROR, STATUSES } from '../../../constants'

const useFileSentCheck = ( data, assetDoubleHash, setCurrentStatus, error, setError ) => {
  const [ sentArchResponse, setSentArchResponse ] = useState(false)
  const [ pending, setPending ] = useState(false)
  
  const handleSendFile = useCallback( async (doubleEncryptedFile, endpoint, setError) => {
    try {
      const archEndpoint = endpoint + '/file'
      const uint8File = new Uint8Array(doubleEncryptedFile.data)
      const fileEncoded = await btoa([].reduce.call(uint8File, function (p, c) { return p + String.fromCharCode(c) }, ''))
      const params = { method: 'POST', body: JSON.stringify({fileBytes: fileEncoded}) }
      const responseFromArch = await fetch(archEndpoint, params)
      
      if (!responseFromArch.ok)  {
        if(responseFromArch.status === 406) {
          return {error: 'try again'}
        }
        console.error('ResponseFromArch:', responseFromArch)
        setError(ERROR.ARCH_FILE_HANDLING_FAILED)
        return {error: responseFromArch}
      }
      const data = await responseFromArch.json()
      return data
    } catch (e) {
      console.error('Send Error', e)
      setError(ERROR.ARCH_CONNECTION_FAILED)
      return {error: ERROR.ARCH_CONNECTION_FAILED}
    }
  }, [])
  
  const sendFileToService = useCallback( async () => {
    const arrayifyDoubleHash = Buffer.from(utils.arrayify(assetDoubleHash))
    setCurrentStatus(STATUSES.ARWEAVE_STARTED)
    if(pending) return
    setPending(true)
    let tries = 1 
    try {
      const {doubleEncryptedFile, endpoint, txReceipt, action } = data
      if(action === ACTIONS.SARCOPHAGUS_ARWEAVE_FILE_ACCEPTED) return 
      const interval = setInterval( async () => {
        const responseFromArch = await handleSendFile(doubleEncryptedFile, endpoint, setError)
        if(responseFromArch?.error) {
          if(responseFromArch?.error === 'try again') {
            if(tries === 1) {
              toast.dark('Sending file failed, trying again', {autoClose: 1500})
              tries = 0
              return;
            } else {
              setCurrentStatus('')
              toast.dark('File send unsuccessful')
              setError('File send unsuccessful')
              localStorage.setItem(arrayifyDoubleHash.toLocaleString(), JSON.stringify({action: 'delete', error: 'File send unsuccessful'}))
              clearInterval(interval)
            }
          } else {
            setCurrentStatus('')
            toast.dark('File send unsuccessful')
            localStorage.setItem(arrayifyDoubleHash.toLocaleString(), JSON.stringify({action: 'delete', error: 'File send unsuccessful'}))
            clearInterval(interval)
            return
          }
        } else {
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
          clearInterval(interval)
        }
    }, 5000)
    } catch(e) {
      setError(ERROR.ARWEAVE_TRANSACTION_FAILED)
      console.error(e)
    }
    },[ data, assetDoubleHash, handleSendFile, setSentArchResponse, setCurrentStatus, setError, pending ])

  useEffect(() => {
    if(data.action !== 'sending file') return
    if(error) return
    sendFileToService()
  },[sendFileToService, error, data.action])

  return { sentArchResponse }
}

export default useFileSentCheck
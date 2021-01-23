import { useState, useEffect, useCallback } from "react"
import { encrypt } from 'ecies-geth'
import { utils } from 'ethers'
import { hexToBytes } from '../../utils/bytes'

const useFileEncryption = () => {
  const [ file, setFile ] = useState(false)
  const [ fileType, setFileType ] = useState(false)
  const [ recipientPublicKey, setRecipientPublicKey ] = useState(false)
  const [ fileByteArray, setFileByteArrayArray ] = useState(false)
  const [ fileEncryptedRecipient, setFileEncryptedRecipient ] = useState(false)
  const [ archaeologistPublicKey, setArchaeologistAddress] = useState(false)
  const [ doubleEncryptedFile, setDoubleEncryptedFile ] = useState(false)
  const [ assetDoubleHash, setAssetDoubleHash ] = useState(false)

  useEffect(() => {
    if(!file) return
    try {
      const reader = new FileReader()
      reader.readAsArrayBuffer(file)
      reader.onload = (e) => {
        const result = e.target.result
        const view = new Uint8Array(result)
        setFileByteArrayArray(view)
      } 
    } catch (e) {
      console.error(e)
    }
  }, [file])

  const firstEncryption = useCallback( async () => {
    try {
      const recipPubKeyBytes = hexToBytes(recipientPublicKey, true)
      const encrypted = await encrypt(recipPubKeyBytes, fileByteArray)
      setFileEncryptedRecipient(encrypted)

      const hashedOnce = utils.keccak256(encrypted)
      const hashedTwice = utils.keccak256(hashedOnce)
      setAssetDoubleHash(utils.arrayify(hashedTwice))
    } catch (e) {
      console.error(e)
    }
  }, [fileByteArray, recipientPublicKey])

  useEffect(() => {
    if(!fileByteArray || !recipientPublicKey) return
    firstEncryption()
  }, [fileByteArray, recipientPublicKey, firstEncryption])

  const secondEncryption = useCallback( async () => {
    try {
      const archPubKeyBytes = hexToBytes(archaeologistPublicKey, true)
      const encrypted = await encrypt(archPubKeyBytes, fileEncryptedRecipient)
      setDoubleEncryptedFile(encrypted)
      setFileType(file.type)
    } catch (e) {
      console.error(e)
    }
  }, [fileEncryptedRecipient, archaeologistPublicKey, file])

  useEffect(() => {
    if(!fileEncryptedRecipient || !archaeologistPublicKey) return
    secondEncryption()
  },[fileEncryptedRecipient, archaeologistPublicKey, secondEncryption])

  return { 
    file,
    fileType,
    setFile,
    setRecipientPublicKey,
    setArchaeologistAddress,
    doubleEncryptedFile,
    assetDoubleHash
  }
}

export default useFileEncryption
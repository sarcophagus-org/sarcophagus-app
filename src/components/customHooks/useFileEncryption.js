import { useState, useEffect } from "react"
import { encrypt } from 'eciesjs'
import { utils } from 'ethers'

const useFileEncryption = () => {
  const [ file, setFile ] = useState(false)
  const [ recipientPublicKey, setRecipientAddress ] = useState(false)
  const [ fileByteArray, setFileByteArrayArray ] = useState(false)
  const [ fileEncryptedRecipient, setFileEncryptedRecipient ] = useState(false)
  const [ archaeologistPublicKey, setArchaeologistAddress] = useState(false)
  const [ encryptedBlob, setEncryptedBlob ] = useState(false)
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

  useEffect(() => {
    if(!fileByteArray || !recipientPublicKey) return
    try {
      const encrypted = encrypt(recipientPublicKey, fileByteArray)
      const hashedOnce = utils.keccak256(encrypted)
      const hashedTwice = utils.keccak256(hashedOnce)
      setAssetDoubleHash(utils.arrayify(hashedTwice))
      setFileEncryptedRecipient(encrypted)
    } catch (e) {
      console.error(e)
    }
  }, [fileByteArray, recipientPublicKey])

  useEffect(() => {
    if(!fileEncryptedRecipient || !archaeologistPublicKey) return
    try {
      const encrypted = encrypt(archaeologistPublicKey, fileEncryptedRecipient)
      const blob = new Blob([encrypted], {type: file.type})
      setEncryptedBlob(blob)
    } catch (e) {
      console.error(e)
    }
  },[fileEncryptedRecipient, archaeologistPublicKey, file])

  return { 
    file,
    setFile,
    setRecipientAddress,
    setArchaeologistAddress,
    encryptedBlob,
    assetDoubleHash
  }
}

export default useFileEncryption
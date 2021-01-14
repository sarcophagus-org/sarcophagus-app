import { useState, useEffect } from "react"
import { encrypt, decrypt, PrivateKey, PublicKey } from 'eciesjs'
import { utils } from 'ethers'

const useFileEncryption = () => {
  const [ file, setFile ] = useState(false)
  const [ recipientAddress, setrecipientAddress ] = useState(false)
  const [ fileByteArray, setFileByteArrayArray ] = useState(false)
  const [ fileEncryptedRecipient, setFileEncryptedRecipient ] = useState(false)
  const [ archaeologistAddress, setArchaeologistAddress] = useState(false)
  const [ encryptedFile, setEncryptedFile ] = useState(false)
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
    if(!fileByteArray || !recipientAddress) return
    try {
      const encrypted = encrypt(recipientAddress, fileByteArray)
      const hashedOnce = utils.keccak256(encrypted)
      const hashedTwice = utils.keccak256(hashedOnce)
      setAssetDoubleHash(utils.arrayify(hashedTwice))
      setFileEncryptedRecipient(encrypted)
    } catch (e) {
      console.error(e)
    }
  }, [fileByteArray, recipientAddress])

  useEffect(() => {
    if(!fileEncryptedRecipient || !archaeologistAddress) return
    try {
      const encrypted = encrypt(archaeologistAddress, fileEncryptedRecipient)
      const blob = new Blob([encrypted], {type: file.type})
      setEncryptedFile(encrypted)
    } catch (e) {
      console.error(e)
    }
  },[fileEncryptedRecipient, archaeologistAddress, file])

  return { 
    file,
    setFile,
    setrecipientAddress,
    setArchaeologistAddress,
    encryptedFile,
    assetDoubleHash
  }
}

export default useFileEncryption
import { useState } from "react"
import { BigNumber, utils } from 'ethers'
import useFileEncryption from '../customHooks/useFileEncryption'

const useSarcophagusCreate = (createSarcophagus) => {
  const [ storageFee, setStorageFee ] = useState(false)
  const { file, fileType, setFile, setRecipientPublicKey, setArchaeologistAddress, doubleEncryptedFile, assetDoubleHash } = useFileEncryption()
  const [ selectedArchaeologist, setSelected ] = useState(false)
  
  const handleArchaeologistSelect = (selectedArchaeologist, storageFee) => {
    setStorageFee(storageFee)
    setSelected(selectedArchaeologist)
    setArchaeologistAddress(selectedArchaeologist?.currentPublicKey)
  }

  const handleKey = (key) => {
    if(key && utils.isHexString(key, 64)) {
      setRecipientPublicKey(key)
    }
    return
  }

  const handleEmbalming = (values, history) => {
    const { bounty, diggingFee, recipientPublicKey, resurrectionTime, name } = values
    if(!selectedArchaeologist || !assetDoubleHash || !bounty || !diggingFee || !recipientPublicKey || !resurrectionTime || !name || !storageFee) return
    const resurrectionTimeUTC = BigNumber.from(resurrectionTime / 1000) // This might change
    const diggingFeeBN = utils.parseEther(diggingFee.toString())
    const bountyBN = utils.parseEther(bounty.toString())
    const recipientPublicKeyBA = utils.arrayify(recipientPublicKey)
    createSarcophagus(name, selectedArchaeologist, resurrectionTimeUTC, storageFee, diggingFeeBN, bountyBN, assetDoubleHash, recipientPublicKeyBA, doubleEncryptedFile, fileType, history)
  }

  return {  file, setFile, handleArchaeologistSelect, selectedArchaeologist, handleEmbalming, setRecipientPublicKey, handleKey }
}

export default useSarcophagusCreate
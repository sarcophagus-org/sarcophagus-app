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
    setRecipientPublicKey(key)
  }

  const handleEmbalming = (values, history) => {
    try {
      const { bounty, diggingFee, recipientPublicKey, resurrectionTime, name } = values

      const resurrectionTimeUTC = BigNumber.from(resurrectionTime / 1000) // This might change
      const diggingFeeBN = utils.parseEther(diggingFee.toString())
      const bountyBN = utils.parseEther(bounty.toString())
      const recipientPublicKeyBA = utils.arrayify(recipientPublicKey).slice(1)
      createSarcophagus(name, selectedArchaeologist, resurrectionTimeUTC, storageFee, diggingFeeBN, bountyBN, assetDoubleHash, recipientPublicKeyBA, doubleEncryptedFile, fileType, history)
    } catch (e) {
      console.error(e)
    }
  }

  return {  file, setFile, handleArchaeologistSelect, selectedArchaeologist, handleEmbalming, setRecipientPublicKey, handleKey }
}

export default useSarcophagusCreate
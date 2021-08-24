import { useState } from "react"
import { BigNumber, utils } from 'ethers'
import useFileEncryption from '../customHooks/useFileEncryption'
import { formatCustomResurrectionTime } from "../../utils/datetime"

const useSarcophagusCreate = (createSarcophagus) => {
  const [ storageFee, setStorageFee ] = useState(false)
  const { file, setFile, setRecipientPublicKey, setArchaeologistAddress, doubleEncryptedFile, assetDoubleHash } = useFileEncryption()
  const [ selectedArchaeologist, setSelected ] = useState(false)
  
  const handleArchaeologistSelect = (selectedArchaeologist, storageFee) => {
    setStorageFee(storageFee)
    setSelected(selectedArchaeologist)
    setArchaeologistAddress(selectedArchaeologist?.currentPublicKey)
  }

  const handleKey = (key) => {
    setRecipientPublicKey(key)
  }

  const handleEmbalming = (values, history, refresh) => {
    try {
      const { bounty, diggingFee, recipientPublicKey, resurrectionTime, name, custom } = values
      let resurrectionTimeUTC = custom ?
        formatCustomResurrectionTime(resurrectionTime) :
        BigNumber.from(resurrectionTime / 1000)

      const diggingFeeBN = utils.parseEther(diggingFee.toString())
      const bountyBN = utils.parseEther(bounty.toString())

      let formatedPublicKey
      if(recipientPublicKey.substr(0, 4) !== '0x04') formatedPublicKey = "0x04" + recipientPublicKey
      const recipientPublicKeyBA = utils.arrayify(formatedPublicKey || recipientPublicKey).slice(1)

      createSarcophagus(name, selectedArchaeologist, resurrectionTimeUTC, storageFee, diggingFeeBN, bountyBN, assetDoubleHash, recipientPublicKeyBA, doubleEncryptedFile, history, refresh)
    } catch (e) {
      console.error(e)
    }
  }

  return {  file, setFile, handleArchaeologistSelect, selectedArchaeologist, handleEmbalming, setRecipientPublicKey, handleKey }
}

export default useSarcophagusCreate
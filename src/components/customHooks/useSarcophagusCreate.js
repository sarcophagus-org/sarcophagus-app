import { useState } from "react"
import { BigNumber, utils } from 'ethers'
import useFileEncryption from '../customHooks/useFileEncryption'
import { convertToUTC, convertToUTCTime } from "../../utils/datetime"

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
      let resurrectionTimeUTC
      if(custom) {
        const date = new Date(resurrectionTime)
        const timeZoneOffset = date.getTimezoneOffset()
        date.setMinutes(date.getMinutes() +  timeZoneOffset)
        const zonedUTC = convertToUTCTime(date)
        resurrectionTimeUTC = BigNumber.from(zonedUTC / 1000)
      } else {
        resurrectionTimeUTC = BigNumber.from(resurrectionTime / 1000)
      }
      
      const diggingFeeBN = utils.parseEther(diggingFee.toString())
      const bountyBN = utils.parseEther(bounty.toString())
      const recipientPublicKeyBA = utils.arrayify(recipientPublicKey).slice(1)
      createSarcophagus(name, selectedArchaeologist, resurrectionTimeUTC, storageFee, diggingFeeBN, bountyBN, assetDoubleHash, recipientPublicKeyBA, doubleEncryptedFile, history, refresh)
    } catch (e) {
      console.error(e)
    }
  }

  return {  file, setFile, handleArchaeologistSelect, selectedArchaeologist, handleEmbalming, setRecipientPublicKey, handleKey }
}

export default useSarcophagusCreate
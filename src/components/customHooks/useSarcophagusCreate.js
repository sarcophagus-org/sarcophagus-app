import { useEffect, useState } from "react"
import { BigNumber, utils } from 'ethers'
import { sarcophagusInitialValues } from "../../constants"
import useFileEncryption from '../customHooks/useFileEncryption'
import { convertToUTC } from "../../utils"

const useSarcophagusCreate = (setStep, createSarcophagus) => {
  const [ data, setSarcophagusSettings ] = useState(sarcophagusInitialValues)
  const { file, setFile, setRecipientAddress, setArchaeologistAddress, encryptedBlob, assetDoubleHash } = useFileEncryption()
  // console.log(utils.computePublicKey("0x0B9C22ff5b429d68B42c5801281b6D210cBb8f32"))
  useEffect(() => {
    if(!assetDoubleHash) return
    setSarcophagusSettings(sarcophagusSettings => ({...sarcophagusSettings, assetDoubleHash: assetDoubleHash}))
  },[assetDoubleHash])

  const handleSettings = ({recipientPublicKey, resurrectionTime, sarcophagusName}, setExpanded, setCompleted) => {
    if(!recipientPublicKey || !resurrectionTime || !file || !sarcophagusName) return

    setSarcophagusSettings(sarcophagusSettings => ({...sarcophagusSettings, resurrectionTime: resurrectionTime, recipientPublicKey: recipientPublicKey, sarcophagusName: sarcophagusName}))
    setRecipientAddress(recipientPublicKey)
    setCompleted(true)
    setStep(1)
    setExpanded(false)
  }

  const handleFees = ({ bounty, diggingFee }, setExpanded, setCompleted) => {
    if(!bounty || !diggingFee) return
    setSarcophagusSettings(sarcophagusSettings => ({...sarcophagusSettings, bounty: bounty, diggingFee: diggingFee}))
    setCompleted(true)
    setStep(2)
    setExpanded(false)
  }

  const handleArchaeologistSelect = (selectedArchaeologist, storageFee) => {
    if(!selectedArchaeologist) return
    setArchaeologistAddress(selectedArchaeologist.currentPublicKey)
    setSarcophagusSettings(sarcophagusSettings => ({...sarcophagusSettings, archaeologist: selectedArchaeologist, storageFee: storageFee}))
  }

  const handleEmbalming = async (setExpanded, setCompleted) => {
    const {archaeologist, assetDoubleHash, bounty, diggingFee, recipientPublicKey, resurrectionTime, sarcophagusName, storageFee} = sarcophagusSettings
    if(!archaeologist || !assetDoubleHash || !bounty || !diggingFee || !recipientPublicKey || !resurrectionTime || !sarcophagusName || !storageFee) return
    const resurrectionTimeUTC = BigNumber.from(convertToUTC(resurrectionTime))
    const storageFeeBN = BigNumber.from(storageFee)
    const diggingFeeBN = BigNumber.from(diggingFee)
    const bountyBN = BigNumber.from(bounty)
    const recipientPublicKeyBA = utils.arrayify(recipientPublicKey)
    createSarcophagus(sarcophagusName, archaeologist, resurrectionTimeUTC, storageFeeBN, diggingFeeBN, bountyBN, assetDoubleHash, recipientPublicKeyBA, encryptedBlob)
    setCompleted(true)
    setStep(3)
    setExpanded(false)
  }

  const handleFileChange = (e, setFieldValue) => {
    e.preventDefault()
    setFieldValue("file", e.currentTarget.files[0])
    setFile(e.currentTarget.files[0])
  }

  
  const sarcophagusSettings = data
  return { sarcophagusSettings, file, setFile, handleSettings, handleFees, handleArchaeologistSelect, handleEmbalming, handleFileChange }
}

export default useSarcophagusCreate
import { useEffect, useState } from "react"
import { BigNumber, utils } from 'ethers'
import { sarcophagusInitialValues } from "../../constants"
import useFileEncryption from '../customHooks/useFileEncryption'
import { convertToUTC } from "../../utils"

const useSarcophagusCreate = (setStep, createSarcophagus) => {
  const [ data, setSarcophagusSettings ] = useState(sarcophagusInitialValues)
  const { file, setFile, setRecipientAddress, setArchaeologistAddress, encryptedBlob, assetDoubleHash } = useFileEncryption()

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
    const resurrectionTimeUTC = BigNumber.from(convertToUTC(resurrectionTime) / 1000)
    const diggingFeeBN = utils.parseEther(diggingFee.toString())
    const bountyBN = utils.parseEther(bounty.toString())
    const recipientPublicKeyBA = utils.arrayify(recipientPublicKey)
    createSarcophagus(sarcophagusName, archaeologist, resurrectionTimeUTC, storageFee, diggingFeeBN, bountyBN, assetDoubleHash, recipientPublicKeyBA, encryptedBlob)
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
import { useEffect, useState } from "react"
import { BigNumber } from 'ethers'
import { sarcophagusInitialValues } from "../../constants"
import useFileEncryption from '../customHooks/useFileEncryption'

const useSarcophagusCreate = (setStep) => {
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

  const handleArchaeologistSelect = (selectedArchaeologist) => {
    if(!selectedArchaeologist) return
    setArchaeologistAddress(selectedArchaeologist.currentPublicKey)
    setSarcophagusSettings(sarcophagusSettings => ({...sarcophagusSettings, archaeologist: selectedArchaeologist}))
  }

  const handleEmbalming = async (setExpanded, setCompleted) => {
    console.log(sarcophagusSettings)
    console.log(encryptedBlob)
    return
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
import { BigNumber, utils } from 'ethers'
import { toast } from 'react-toastify'
import { ACTIONS, STATUSES } from '../../constants'
import { formatCustomResurrectionTime } from "../../utils/datetime";

const useSarcophagus = (sarcophagusContract) => {

  const createSarcophagus = async (sarcophagusName, archaeologist, resurrectionTimeUTC, storageFeeBN, diggingFeeBN, bountyBN, assetDoubleHash, recipientPublicKeyBA, doubleEncryptedFile, history, refresh) => {
        /* Create Sarco Transaction */
        sarcophagusContract.createSarcophagus(sarcophagusName, archaeologist.address, resurrectionTimeUTC, storageFeeBN, diggingFeeBN, bountyBN, assetDoubleHash, recipientPublicKeyBA)
          .then((txReceipt) => {
            console.log("🚀 create ~txReceipt", txReceipt)

            /* Send File to Archaeologist */
            const storageObject = {action: ACTIONS.SARCOPHAGUS_CREATED, sarcophagusName: sarcophagusName, doubleEncryptedFile: doubleEncryptedFile, endpoint: archaeologist.endpoint, txReceipt: txReceipt}
            localStorage.setItem(assetDoubleHash, JSON.stringify(storageObject))
            
            toast.dark('Creating Sarcophagus')
            history.replace('/')
            refresh()
          }).catch(e => {
            toast.error('There was a problem creating sarcophagus')
            console.error("There was a problem creating sarcophagus:", e)
          })
  }

  const updateSarcophagus = async (sarcophagus, setCurrentStatus, refresh, toggle) => {
    try {

      const doubleHashUint = Buffer.from(utils.arrayify(sarcophagus.AssetDoubleHash))
      const storage = localStorage.getItem(doubleHashUint.toLocaleString())
      const parsedStorage = JSON.parse(storage)

      let { NewPublicKey, AssetDoubleHash, AssetId, V, R, S } = parsedStorage
      NewPublicKey = Buffer.from(NewPublicKey, 'base64')
      const txReceipt = await sarcophagusContract.updateSarcophagus(NewPublicKey, AssetDoubleHash, AssetId, V, R, S)
      console.log("🚀 update ~txReceipt", txReceipt)
      // remove local storage items
      localStorage.removeItem(AssetDoubleHash.toLocaleString())
      setCurrentStatus(STATUSES.PROCESS_COMPLETE)
      refresh()
      toggle()
    
    } catch (e) {
      toast.error('There was a problem updating sarcophagus')
      console.error('There was a problem updating sarcophagus', e)
    }
  }

  const rewrapSarcophagus = async (sarcophagus, values, refresh, toggle, setCurrentStatus) => {
    try {
      const { AssetDoubleHash } = sarcophagus
      const { bounty, diggingFee, resurrectionTime, custom } = values

      const doubleHashUint = Buffer.from(utils.arrayify(AssetDoubleHash))

      let resurrectionTimeUTC = custom ?
        formatCustomResurrectionTime(resurrectionTime) :
        BigNumber.from(resurrectionTime / 1000)

      const diggingFeeBN = utils.parseEther(diggingFee.toString())
      const bountyBN = utils.parseEther(bounty.toString())

      const txReceipt = await sarcophagusContract.rewrapSarcophagus(doubleHashUint, resurrectionTimeUTC, diggingFeeBN, bountyBN)
      console.log("🚀 ~ rewrap ~ txReceipt", txReceipt)
      // create storage object for rewraping
      const storageObject = { action: ACTIONS.SARCOPHAGUS_TX_MINING, txReceipt: txReceipt }
      const arrayifyDoubleHash = utils.arrayify(AssetDoubleHash)
      localStorage.setItem(arrayifyDoubleHash, JSON.stringify(storageObject))
      setCurrentStatus(STATUSES.TRANSACTION_MINING_IN_PROGRESS)
      refresh()
      toggle()
    } catch (e) {
      toast.error('There was a problem rewrapping sarcophagus')
      console.error('There was a problem rewrapping sarcophagus', e)
    }

  }

  const burySarcophagus = async (sarcophagus, setCurrentStatus, refresh, toggle) => {
    try {
      const { AssetDoubleHash } = sarcophagus
      const doubleHashUint = Buffer.from(utils.arrayify(AssetDoubleHash))
      const txReceipt = await sarcophagusContract.burySarcophagus(doubleHashUint)
      console.log("🚀 ~ burySarcophagus ~ txReceipt", txReceipt)

      const storageObject = { action: ACTIONS.SARCOPHAGUS_TX_MINING, txReceipt: txReceipt }
      const arrayifyDoubleHash = utils.arrayify(AssetDoubleHash)
      localStorage.setItem(arrayifyDoubleHash, JSON.stringify(storageObject))
      setCurrentStatus(STATUSES.TRANSACTION_MINING_IN_PROGRESS)
      refresh()
      toggle()

    } catch (e) {
      toast.error('There was a problem buring sarcophagus')
      console.error('There was a problem buring sarcophagus', e)
    }
  }

  const cleanSarcophagus = async (sarcophagus, setCurrentStatus, archaeologist, toggle, refresh) => {
    try {
      const { AssetDoubleHash } = sarcophagus
      const { address } = archaeologist
      const doubleHashUint = Buffer.from(utils.arrayify(AssetDoubleHash))
      localStorage.removeItem(doubleHashUint.toLocaleString())
      const txReceipt = await sarcophagusContract.cleanUpSarcophagus(doubleHashUint, address)
      console.log("🚀  ~ cleanSarcophagus ~ txReceipt", txReceipt)

      const storageObject = { action: ACTIONS.SARCOPHAGUS_TX_MINING, txReceipt: txReceipt }
      const arrayifyDoubleHash = utils.arrayify(AssetDoubleHash)
      localStorage.setItem(arrayifyDoubleHash, JSON.stringify(storageObject))
      setCurrentStatus(STATUSES.TRANSACTION_MINING_IN_PROGRESS)
      toggle()
      refresh()
    } catch (e) {
      toast.error('There was a problem cleaning sarcophagus')
      console.error('There was a problem cleaning sarcophagus', e)
    }
  }

  const cancelSarcophagus = async (sarcophagus, setCurrentStatus, toggle, refresh) => {
    try {
      const { AssetDoubleHash } = sarcophagus
      const doubleHashUint = Buffer.from(utils.arrayify(AssetDoubleHash))
      const txReceipt = await sarcophagusContract.cancelSarcophagus(doubleHashUint)
      console.log("🚀 ~ cancelSarcophagus ~ txReceipt", txReceipt)

      const storageObject = { action: ACTIONS.SARCOPHAGUS_TX_MINING, txReceipt: txReceipt }
      const arrayifyDoubleHash = utils.arrayify(AssetDoubleHash)
      localStorage.setItem(arrayifyDoubleHash, JSON.stringify(storageObject))
      setCurrentStatus(STATUSES.TRANSACTION_MINING_IN_PROGRESS)
      toggle()
      refresh()
    } catch (e) {
      toast.error('There was a problem canceling sarcophagus')
      console.error('There was a problem canceling sarcophagus', e)
    }
  }

  const accuseArchaeologist = async (values) => {
    try{ 

      const { singleHash, identifier, address } = values
      const identifierUint = Buffer.from(utils.arrayify(identifier))
      const singleHashUint = Buffer.from(utils.arrayify(singleHash))
      const txReceipt = await sarcophagusContract.accuseArchaeologist(identifierUint, singleHashUint, address)
      console.log("🚀 ~ accuseArchaeologist ~ txReceipt", txReceipt)
    } catch (e) {
      toast.error('There was a problem canceling sarcophagus')
      console.log('There was a problem accusing archaeologist')
    }
  
  }

  return { createSarcophagus, updateSarcophagus, cancelSarcophagus, cleanSarcophagus, burySarcophagus, rewrapSarcophagus, accuseArchaeologist }

}



export {
  useSarcophagus
}
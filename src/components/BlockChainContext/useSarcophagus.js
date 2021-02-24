import { BigNumber, utils } from 'ethers'
import { ACTIONS, STATUSES } from '../../constants'

const useSarcophagus = (sarcophagusContract) => {

  
  const createSarcophagus = async (sarcophagusName, archaeologist, resurrectionTimeUTC, storageFeeBN, diggingFeeBN, bountyBN, assetDoubleHash, recipientPublicKeyBA, doubleEncryptedFile, history, refresh) => {
        /* Create Sarco Transaction */
        sarcophagusContract.createSarcophagus(sarcophagusName, archaeologist.paymentAddress, resurrectionTimeUTC, storageFeeBN, diggingFeeBN, bountyBN, assetDoubleHash, recipientPublicKeyBA)
          .then((txReceipt) => {
            console.log("🚀 create ~txReceipt", txReceipt)

            /* Send File to Archaeologist */
            const storageObject = {action: ACTIONS.SARCOPHAGUS_CREATED, sarcophagusName: sarcophagusName, doubleEncryptedFile: doubleEncryptedFile, endpoint: archaeologist.endpoint, txReceipt: txReceipt}
            localStorage.setItem(assetDoubleHash, JSON.stringify(storageObject))
            
            history.replace('/')

            refresh()
          }).catch(e => console.error("There was a problem creating sarcophagus:", e))
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
      console.error('There was a problem updating sarcophagus', e)
    }
  }

  const rewrapSarcophagus = async (sarcophagus, values, refresh, toggle) => {
    try {
      const { AssetDoubleHash } = sarcophagus
      const { bounty, diggingFee, resurrectionTime } = values

      const doubleHashUint = Buffer.from(utils.arrayify(AssetDoubleHash))
      const resurrectionTimeBN = BigNumber.from(resurrectionTime / 1000) // This might change
      const diggingFeeBN = utils.parseEther(diggingFee.toString())
      const bountyBN = utils.parseEther(bounty.toString())

      const txReceipt = await sarcophagusContract.rewrapSarcophagus(doubleHashUint, resurrectionTimeBN, diggingFeeBN, bountyBN)
      console.log("🚀 ~ rewrap ~ txReceipt", txReceipt)
      // create storage object for rewraping
      const storageObject = { action: ACTIONS.SARCOPHAGUS_TX_MINING, txReceipt: txReceipt }
      const arrayifyDoubleHash = utils.arrayify(AssetDoubleHash)
      localStorage.setItem(arrayifyDoubleHash, JSON.stringify(storageObject))
      refresh()
      toggle()

    } catch (e) {
      console.error('There was a problem rewrapping sarcophagus', e)
    }

  }

  const burySarcophagus = async (sarcophagus, refresh, toggle) => {
    try {
      const { AssetDoubleHash } = sarcophagus
      const doubleHashUint = Buffer.from(utils.arrayify(AssetDoubleHash))
      const txReceipt = await sarcophagusContract.burySarcophagus(doubleHashUint)
      console.log("🚀 ~ burySarcophagus ~ txReceipt", txReceipt)

      const storageObject = { action: ACTIONS.SARCOPHAGUS_TX_MINING, txReceipt: txReceipt }
      const arrayifyDoubleHash = utils.arrayify(AssetDoubleHash)
      localStorage.setItem(arrayifyDoubleHash, JSON.stringify(storageObject))

      refresh()
      toggle()

    } catch (e) {
      console.error('There was a problem buring sarcophagus', e)
    }
  }

  const cleanSarcophagus = async (sarcophagus, archaeologist, refresh, toggle) => {
    try {
      const { AssetDoubleHash } = sarcophagus
      const { paymentAddress } = archaeologist
      const doubleHashUint = Buffer.from(utils.arrayify(AssetDoubleHash))
      localStorage.removeItem(doubleHashUint.toLocaleString())
      const txReceipt = await sarcophagusContract.cleanUpSarcophagus(doubleHashUint, paymentAddress)
      console.log("🚀  ~ cleanSarcophagus ~ txReceipt", txReceipt)

      const storageObject = { action: ACTIONS.SARCOPHAGUS_TX_MINING, txReceipt: txReceipt }
      const arrayifyDoubleHash = utils.arrayify(AssetDoubleHash)
      localStorage.setItem(arrayifyDoubleHash, JSON.stringify(storageObject))

      toggle()
      
    } catch (e) {
      console.error('There was a problem cleaning sarcophagus', e)
    }
  }

  const cancelSarcophagus = async (sarcophagus, toggle) => {
    try {
      const { AssetDoubleHash } = sarcophagus
      const doubleHashUint = Buffer.from(utils.arrayify(AssetDoubleHash))
      const txReceipt = await sarcophagusContract.cancelSarcophagus(doubleHashUint)
      console.log("🚀 ~ cancelSarcophagus ~ txReceipt", txReceipt)

      const storageObject = { action: ACTIONS.SARCOPHAGUS_TX_MINING, txReceipt: txReceipt }
      const arrayifyDoubleHash = utils.arrayify(AssetDoubleHash)
      localStorage.setItem(arrayifyDoubleHash, JSON.stringify(storageObject))
      toggle()
    } catch (e) {
      console.error('There was a problem canceling sarcophagus', e)
    }
  }

  return { createSarcophagus, updateSarcophagus, cancelSarcophagus, cleanSarcophagus, burySarcophagus, rewrapSarcophagus }

}



export {
  useSarcophagus
}
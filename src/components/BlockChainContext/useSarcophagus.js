import { utils } from 'ethers'
import { STATUSES } from '../../constants'


const useSarcophagus = (sarcophagusContract) => {

  
  const createSarcophagus = async (sarcophagusName, archaeologist, resurrectionTimeUTC, storageFeeBN, diggingFeeBN, bountyBN, assetDoubleHash, recipientPublicKeyBA, doubleEncryptedFile, fileType, history) => {
        /* Create Sarco Transaction */
        sarcophagusContract.createSarcophagus(sarcophagusName, archaeologist.archaeologist, resurrectionTimeUTC, storageFeeBN, diggingFeeBN, bountyBN, assetDoubleHash, recipientPublicKeyBA)
          .then((txReceipt) => {
            console.log("🚀 create ~txReceipt", txReceipt)

            /* Send File to Archaeologist */
            const storageObject = {sarcophagusName: sarcophagusName, doubleEncryptedFile: doubleEncryptedFile, fileType: fileType, endpoint: archaeologist.endpoint, txReceipt: txReceipt}
            localStorage.setItem(assetDoubleHash, JSON.stringify(storageObject))
            
            history.replace('/')
          }).catch(e => console.error("Error creating Sarcophagus:", e))
  }

  const updateSarcophagus = async (sarcophagus, setCurrentStatus) => {
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
    
    } catch (e) {
      console.error('There was a problem updating sarcophagus')
    }
  }

  return { createSarcophagus, updateSarcophagus }

}



export {
  useSarcophagus
}
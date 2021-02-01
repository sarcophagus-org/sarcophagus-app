import {BigNumber, utils} from 'ethers'
import { useState } from 'react'

const useSarcophagus = (sarcophagusTokenContract, sarcophagusContract) => {
  // TODO Will need to replace this with checking allowances for approval
  const [ approved, setApproved ] = useState(false)
  const createSarcophagus = async (sarcophagusName, archaeologist, resurrectionTimeUTC, storageFeeBN, diggingFeeBN, bountyBN, assetDoubleHash, recipientPublicKeyBA, doubleEncryptedFile, fileType, history) => {
    /* Approve Transaction */

    sarcophagusTokenContract.approve(sarcophagusContract?.address, BigNumber.from(2).pow(BigNumber.from(256)).sub(BigNumber.from(1)))
      .then((txReceipt) => {
        console.log("🚀 approve ~txReceipt", txReceipt)
        setApproved(true)
        /* Create Sarco Transaction */
        sarcophagusContract.createSarcophagus(sarcophagusName, archaeologist.archaeologist, resurrectionTimeUTC, storageFeeBN, diggingFeeBN, bountyBN, assetDoubleHash, recipientPublicKeyBA)
          .then((txReceipt) => {
            console.log("🚀 create ~txReceipt", txReceipt)

            /* Send File to Archaeologist */
            const storageObject = {sarcophagusName: sarcophagusName, doubleEncryptedFile: doubleEncryptedFile, fileType: fileType, endpoint: archaeologist.endpoint, txReceipt: txReceipt}
            localStorage.setItem(assetDoubleHash, JSON.stringify(storageObject))
            
            history.replace('/')
          }).catch(e => console.error("Error creating Sarcophagus:", e))
      }).catch(e => console.error("Error during approval process:", e))
  }

  const updateSarcophagus = async (sarcophagus) => {
    try {

      const doubleHashUint = Buffer.from(utils.arrayify(sarcophagus.AssetDoubleHash))
      const storage = localStorage.getItem(doubleHashUint.toLocaleString())
      const parsedStorage = JSON.parse(storage)

      let { NewPublicKey, AssetDoubleHash, AssetId, V, R, S } = parsedStorage
      NewPublicKey = Buffer.from(NewPublicKey, 'base64')

      if(!approved) {
        await sarcophagusTokenContract.approve(sarcophagusContract?.address, BigNumber.from(2).pow(BigNumber.from(256)).sub(BigNumber.from(1)))
      }
      const txReceipt = await sarcophagusContract.updateSarcophagus(NewPublicKey, AssetDoubleHash, AssetId, V, R, S)
      console.log("🚀 update ~txReceipt", txReceipt)
      // remove local storage items
      localStorage.removeItem(AssetDoubleHash.toLocaleString())
    
    } catch (e) {
      console.error('There was a problem updating sarcophagus')
    }
  }

  return { createSarcophagus, updateSarcophagus }

}



export {
  useSarcophagus
}
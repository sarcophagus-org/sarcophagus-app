import { BigNumber } from 'ethers'

const useSarcophagus = (sarcophagusTokenContract, sarcophagusContract) => {

  const createSarcophagus = async (sarcophagusName, archaeologist, resurrectionTimeUTC, storageFeeBN, diggingFeeBN, bountyBN, assetDoubleHash, recipientPublicKeyBA, encryptedBlob) => {
    sarcophagusTokenContract.approve(sarcophagusContract?.address, BigNumber.from(2).pow(BigNumber.from(256)).sub(BigNumber.from(1)))
    .then((txReceipt) => {
      console.log("🚀 ~txReceipt", txReceipt)
      sarcophagusContract.createSarcophagus(sarcophagusName, archaeologist.archaeologist, resurrectionTimeUTC, storageFeeBN, diggingFeeBN, bountyBN, assetDoubleHash, recipientPublicKeyBA)
    })
    .then((res) => console.log(res))
    .catch(e => console.error("HELLO", e))
  }

  return { createSarcophagus } 
}

export {
  useSarcophagus
}
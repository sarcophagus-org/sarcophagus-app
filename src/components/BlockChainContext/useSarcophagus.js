import { BigNumber, ethers } from 'ethers'
import { useState, useEffect } from 'react'
import { useWeb3 } from '../../web3'
import { useTransaction } from './transaction'

const useSarcophagus = (sarcophagusTokenContract, sarcophagusContract) => {

  const createSarcophagus = async (sarcophagusName, archaeologist, resurrectionTimeUTC, storageFeeBN, diggingFeeBN, bountyBN, assetDoubleHash, recipientPublicKeyBA, encryptedBlob) => {
  console.log("🚀 ~ file: useSarcophagus.js ~ line 9 ~ createSarcophagus ~ recipientPublicKeyBA", recipientPublicKeyBA)
    sarcophagusTokenContract.approve(sarcophagusContract?.address, BigNumber.from(2).pow(BigNumber.from(256)).sub(BigNumber.from(1)))
    .then((txReceipt) => {
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
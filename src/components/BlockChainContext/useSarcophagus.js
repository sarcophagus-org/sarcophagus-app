// import { ethers } from 'ethers'
// import { useState, useEffect } from 'react'
// import { useWeb3 } from '../../web3'
// import { getBountyFees } from '../../utils/bigNumbers'

const useSarcophagus = (sarcophagusTokenContract, sarcophagusContract) => {
  // const { account } = useWeb3()

  const createSarcophagus = async (settings) => {
    // try {
    //   const { resurrectionTime, recipientAddress, sarcophagusName, bountyFees, diggingFees, archeaologist, file } = settings
    //   if(!resurrectionTime || !recipientAddress || !sarcophagusName || !bountyFees || !diggingFees || !archeaologist || !file) return

    // Send Transaction
      // const response = await sarcophagusContract.createSarcophagus(sarcophagusName, archeaologist.archeaologist, resurrectionTime, diggingFees, bountyFees, file, recipientAddress)
      // Several Steps will be done here maybe converting this into a userEffect if/else to track progress
    // } catch (e) {
    //   console.log("HERE", e)
    // }
    // Listen for status updates.
  }

  return createSarcophagus 
}

export {
  useSarcophagus
}
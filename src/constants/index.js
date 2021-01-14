const labels = {
  createSarco: "Create Sarcophagus",
  feeSettings: "Sarcophagus Settings",
  pickArchaeologist: "Pick an Archaeologist",
  completeEmbalming: "Complete Embalming"
}

const sarcophagusInitialValues = {
  sarcophagusName: false,    // (name) string memory
  archaeologist: false,      // address
  resurrectionTime: false,   // uint256
  storageFee: false,         // uint256
  diggingFee: false,         // uint256
  bounty: false,             // uint256
  assetDoubleHash: false,    // bytes32
  recipientPublicKey: false, // bytes memory
} 

export {
  labels,
  sarcophagusInitialValues
}
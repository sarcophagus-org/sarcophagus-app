import { createLocationNumberObject } from "../utils"
import { getUTCDate } from "../utils/datetime"

const labels = {
  createSarco: "Create a Sarcophagus",
  nameAndRecipient: "Name Sarcophagus and add your recipient",
  fileUpload: "Upload your file to your Sarcophagus",
  pickArchaeologist: "Pick an Archaeologist",
  resurrectionTime: "Set resurrection time"
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

const days = createLocationNumberObject(365, true)
const hours = createLocationNumberObject(23)
const minutes = createLocationNumberObject(59)

const weekAhead = getUTCDate(7)
const monthAhead = getUTCDate(30)
const threeMonthAhead = getUTCDate(90)

export {
  labels,
  sarcophagusInitialValues,
  days,
  hours,
  minutes,
  weekAhead,
  monthAhead,
  threeMonthAhead
}
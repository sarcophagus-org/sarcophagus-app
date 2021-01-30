import { createLocationNumberObject } from "../utils"
import { getUTCDate } from "../utils/datetime"

export const labels = {
  createSarco: "Create a Sarcophagus",
  nameAndRecipient: "Name Sarcophagus and add your recipient",
  fileUpload: "Upload your file to your Sarcophagus",
  pickArchaeologist: "Pick an Archaeologist",
  resurrectionTime: "Set resurrection time"
}

export const sarcophagusInitialValues = {
  sarcophagusName: false,    // (name) string memory
  archaeologist: false,      // address
  resurrectionTime: false,   // uint256
  storageFee: false,         // uint256
  diggingFee: false,         // uint256
  bounty: false,             // uint256
  assetDoubleHash: false,    // bytes32
  recipientPublicKey: false, // bytes memory
}

export const days = createLocationNumberObject(365, true)
export const hours = createLocationNumberObject(23)
export const minutes = createLocationNumberObject(59)

export const weekAhead = getUTCDate(7)
export const monthAhead = getUTCDate(30)
export const threeMonthAhead = getUTCDate(90)

export const MESSAGES = {
  STATUS_FINISH: 'Buried',
  STATUS_SARCPHAGUS_STILL_MINING: 'Still mining',
  STATUS_SUCCESS: 'Success',
  STATUS_MINING_TIMED_OUT: 'Mining Timed out',
  STATUS_AWAITING_APPROVAL: 'Approval Neeeded',
  STATUS_PENDING: 'Checking with Service',
  STATUS_FILE_SENDING: 'File is being buried'
}

export const ERROR_MESSAGES_MINING = {
  ARWEAVE_FILE: 'There was an error with the Arweave file',
  ARWEAVE_TRANSACTION: 'There was an error with the Arweave Transaction',
}

export const INTERVAL_LENGTH_SECONDS = 5
export const INTERVAL_TIMEOUT_MINS = 15

export const TIMER_DEFAULT = '0 days 00:00:00'
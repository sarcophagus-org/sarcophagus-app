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

export const STATUSES = {
  SARCOPHAGUS_PENDING: 'Sarcophagus mining',
  SARCOPHAGUS_SUCCESS: 'Sarcophagus mined!',
  ARWEAVE_STARTED: 'File is being uploaded',
  ARWEAVE_PENDING: 'File is being buried',
  ARWEAVE_SUCCESS: 'File buried!',
  ARWEAVE_TIMEOUT: 'Timed out',
  SARCOPHAGUS_AWAIT_SIGN: 'Tx signing needed',
  CHECKING_STATUS: 'Checking status...',
  PROCESS_COMPLETE: 'Sarcophagus buried'
}

export const ERROR = {
  SARCOPHAGUS_FAILED: '',
  BLOCKCHAIN_SERVER: 'There was an error connection to blockchain',
  ARWEAVE_TRANSACTION_FAILED: 'There was an error connecting to service',
  ARWEAVE_FILE_ERROR: 'There was an error sending file',
}

export const INTERVAL_LENGTH_SECONDS = 5
export const INTERVAL_TIMEOUT_MINS = 15
export const RETRIES = 2

export const TIMER_DEFAULT = '0 days 00:00:00'
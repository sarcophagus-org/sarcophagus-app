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
  recipientPublicKey: "0x0459b159955bb46d90b9d4905c5589ab0694a593ae2e82627d6658a363ae97db0bdcf8275ea45cb8cbd21a249a3fe1c15d8523d166fb74dc6773bc5c02ef329342", // bytes memory
}

export const days = createLocationNumberObject(365, true)
export const hours = createLocationNumberObject(23)
export const minutes = createLocationNumberObject(59)

export const weekAhead = getUTCDate(7)
export const monthAhead = getUTCDate(30)
export const threeMonthAhead = getUTCDate(90)

export const STATUSES = {
  SARCOPHAGUS_SUCCESS: 'Sarcophagus has been mined!',
  ARWEAVE_STARTED: 'File is being uploaded',
  ARWEAVE_PENDING: 'File is being mined on arweave',
  ARWEAVE_SUCCESS: 'File has been mined!',
  ARWEAVE_TIMEOUT: 'Timed out, refresh browser to try again',
  SARCOPHAGUS_AWAIT_SIGN: 'Signing needed',
  CHECKING_STATUS: 'Checking status...',
  PROCESS_COMPLETE: 'Sarcophagus is Active',
  WINDOW_CLOSED: 'Resurrection Window is past',
  TRANSACTION_MINING_IN_PROGRESS: 'Mining in progress'
}

export const RECIPIENT_STATUSES = {
  CREATED: 'Sarcophagus creation in progress, resurrection unavailable',
  ACTIVE: 'Sarcophagus Active',
  UNWRAPPED: 'Sarcophagus unwrapped, resurrection available',
}

export const ERROR = {
  SARCOPHAGUS_FAILED: '',
  BLOCKCHAIN_SERVER: 'There was an error connection to blockchain',
  ARCH_CONNECTION_FAILED: 'There was a problem connecting to archaeologist',
  ARWEAVE_TRANSACTION_FAILED: 'There was an error uploading the file to arweave',
  ARWEAVE_FILE_ERROR: 'There was an error validating the arweave file',
  ARCH_FILE_HANDLING_FAILED: 'The archaeologist had a problem handling file'
}

export const ACTIONS = {
  SARCOPHAGUS_CREATED: 'Created',
  SARCOPHAGUS_ARWEAVE_FILE_ACCEPTED: 'File accepted',
  TRANSACTION_MINING_IN_PROGRESS: 'Mining in progress'
}

export const ARCHIVED_STATUSES = {
  DEFAULT: 'Checking status',
  CANCELED: 'Sarcophagus cancelled',
  ACCUSED: 'Sarcophagus accused',
  CLEANED: 'Sarcophagus cleaned',
  UNWRAPPED: 'Sarcophagus unwrapped',
  BURIED: 'Sarcophagus buried'
}

export const INTERVAL_LENGTH_SECONDS = 5
export const INTERVAL_TIMEOUT_MINS = 15
export const RETRIES = 2

export const TIMER_DEFAULT = '0 days 00:00:00'
export const DEFAULT_COLOR = 'text-gray-400'
// headerTwo="Fee" headerThree="Digging Fee" headerFour='Bounty' headerFive='Metrics'
export const TABLE_HEADER_ARCHAEOLOGISTS = 'Archaeologists'
export const TABLE_HEADER_FEE = 'Fee'
export const TABLE_HEADER_DIGGING_FEE = 'Digging Fee'
export const TABLE_HEADER_BOUNTY = 'Bounty'
export const TABLE_HEADER_METRICS = 'Metrics'


export const FEE_ARCH_TOOLTIP = 'Total fee in $SARCO to create this sarcophagus.'
export const BOUNTY_ARCH_TOOLTIP = 'This Archaeologists minimum bounty requirement.'
export const DIGGING_FEE_ARCH_TOOLTIP = 'This Archaeologists minimum digging fee for your resurrection date/time.'

export const SINGLEHASH_TITLE = 'Single Hash'
export const SINGLEHASH_TOOLTIP = 'The sarcophagus payload (file bytes) with the outer layer decrypted, hashed once'
export const SINGLEHASH_PLACEHOLDER = '0x0000000000000000000000000000000000000000000000000000000000000000'
export const PAYMENT_ADDRESS_TITLE = 'Archaeologist Address'
export const ADDRESS_TOOLTIP = 'Address of the Archaeologist you are accusing'
export const ADDRESS_PLACEHOLDER = '0x0000000000000000000000000000000000000000'
export const IDENTIFIER_TITLE = 'Sarcophagus Identifier'
export const IDENTIFIER_TOOLTIP = 'The sarcophagus payload (file bytes) encrypted and hashed twice'
export const IDENTIFIER_PLACEHOLDER = '0x0000000000000000000000000000000000000000000000000000000000000000'

export const CANCEL_TOOLTIP = 'Canceling a sarcophagus, transfers the bounty and storage fee back, transfers the digging fee to the archaeologist, and archives sarcophagus.'
export const CLEAN_TOOlTIP = 'Cleaning a sarcophagus, rewards embalmer with the cursed bond, and refunds the rest of the payment (bounty and digging fees) back to embalmer and archives sarcophagus.'
export const BURY_TOOLTIP = 'Burying a sarcophagus, releases digging fees to archaeologist and archives sarcophagus.'
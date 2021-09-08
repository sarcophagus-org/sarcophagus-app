import { createLocationNumberObject } from "../utils"
import { getUTCDate } from "../utils/datetime"

// internal constants not shown in UI
export const ACTIONS = {
  SARCOPHAGUS_CREATED: 'Created',
  SARCOPHAGUS_ARWEAVE_FILE_ACCEPTED: 'File accepted',
  TRANSACTION_MINING_IN_PROGRESS: 'Mining in progress'
}

export const DEFAULT_COLOR = 'text-gray-400'

// datetime constants
export const days = createLocationNumberObject(365, true)
export const hours = createLocationNumberObject(23)
export const minutes = createLocationNumberObject(59)

export const weekAhead = getUTCDate(7)
export const monthAhead = getUTCDate(30)
export const threeMonthAhead = getUTCDate(90)

export const INTERVAL_LENGTH_SECONDS = 5
export const INTERVAL_TIMEOUT_MINS = 15
export const RETRIES = 2
export const TIMER_DEFAULT = '0 days 00:00:00'


// Embalmer Sarcophagus Statuses
// These will show onHover on status badge for embalmer sarcophagi
export const STATUSES = {
  SARCOPHAGUS_SUCCESS: 'Sarcophagus has been mined!',
  ARWEAVE_STARTED: 'File is being uploaded',
  ARWEAVE_PENDING: 'File is being mined on arweave',
  SARCOPHAGUS_AWAIT_SIGN: 'Signing needed',
  CHECKING_STATUS: 'Checking status...',
  ACTIVE: 'Sarcophagus is Active',
  WINDOW_CLOSED: 'Resurrection Window is past',
  TRANSACTION_MINING_IN_PROGRESS: 'Mining in progress',
  UNWRAPPING: 'UnWrapping in progress'
}

// Recipient Sarcophagus Statuses
// These will show onHover on status badge for recipient sarcophagi
export const RECIPIENT_STATUSES = {
  CREATED: 'Sarcophagus creation in progress, resurrection unavailable',
  ACTIVE: 'Sarcophagus Active',
  UNWRAPPED: 'Sarcophagus unwrapped, resurrection available',
}

// Archived Sarcophagi Statuses
// These will show onHover on status badge for archived sarcophagi
export const ARCHIVED_STATUSES = {
  DEFAULT: 'Checking status',
  CANCELED: 'Sarcophagus cancelled',
  ACCUSED: 'Sarcophagus accused',
  CLEANED: 'Sarcophagus cleaned',
  UNWRAPPED: 'Sarcophagus unwrapped',
  BURIED: 'Sarcophagus buried'
}

// Embalmer Error Messages
// These show when status badge is 'Error' onHover
export const ERROR = {
  BLOCKCHAIN_SERVER: 'There was an error connecting to blockchain',
  ARCH_CONNECTION_FAILED: 'There was a problem connecting to archaeologist',
  ARWEAVE_TRANSACTION_FAILED: 'There was a transaction error',
  ARWEAVE_FILE_ERROR: 'There was an error validating the arweave file',
  ARCH_FILE_HANDLING_FAILED: 'The archaeologist had a problem handling file'
}

// Toast Messages
export const CONTRACT_ERROR = 'There was an error comunicating with contract'
export const TX_MINING_PENDING = 'Transaction is being mined, please wait'
export const SARCOPHAGI_LOADING = 'Loading sarcophagi...'
export const SARCOPHAGUS_CREATING = 'Creating Sarcophagus'
export const FILE_MINING = 'File is being mined, please wait to update sarcophagus'
export const TRANSACTION_REJECTED = 'Transaction Rejected'
export const ACCUSAL_SUCCESSFUL = 'The accusal was successful'
export const ACCUSAL_UNSUCCESSFUL = 'The accusal was unsuccessful'
// *----- Create Page content *------ //

// Page Header
export const CREATE_MAIN_CONTENT = 'This is where you create a Sarcophagus, a process we call “embalming.” Name your Sarcophagus, paste the full public key of the recipient and upload the file you wish to embalm.'
export const CREATE_MAIN_HEADER = 'Create Sarcophagus'

// Name and recipient section
export const NAME_AND_RECIPIENT_HEADER = 'Name Sarcophagus and add recipient'
export const NAME_INFO_CONTENT = 'The name you choose will be public on the blockchain.'
export const RECIPIENT_INFO_LINK = 'Click here'
export const RECIPIENT_INFO_PART_1 = 'to get your recipient’s full Ethereum public key. (This is not the same as a public address.) '
export const RECIPIENT_INFO_PART_2 = 'When resurrecting the Sarcophagus, the recipient will need to input the private key of their Ethereum public key. They can generate a fresh Ethereum public key if concerned with private key exposure.'

// File upload section
export const FILE_UPLOAD_HEADER = 'Upload your file to your sarcophagus'
export const FILE_UPLOAD_INFO_1 = 'Upload a file to embalm. It will be downloaded after resurrection exactly as is.'
export const FILE_UPLOAD_INFO_2 = 'Current alpha max file size: 2.9 MB'

// Resurrection Time section
export const RESURRECTION_TIME_HEADER = 'Set resurrection time'
export const RESURRECTION_INFO_P_1 = 'The resurrection is the exact date and time that the outer layer of your Sarcophagus will be decrypted by the archaeologist.'
export const RESURRECTION_INFO_P_2 = 'If you don’t attest before this time; only the inner layer controlled by the recipient is protecting the data. '
export const RESURRECTION_INFO_P_3 = 'The further you set the resurrection time, the more it will cost.'

// Archaeologist section
export const PICK_ARCHAEOLOGIST_HEADER = 'Pick an Archaeologist'
export const FEES_INFO = 'Archaeologists are sorted by their minimum fees. After you select one, that minimum fee will be set with the option to increase. '
export const BOUNTY_TOOL_TIP = "Max Bounty. Paid to the Archaeologist for a successful resurrection (keep default unless adv user)"
export const DIGGING_FEE_TOOL_TIP = "Max Digging Fees. Paid to the archaeologist after re-wrap (keep default unless adv user)"


export const TABLE_HEADER_ARCHAEOLOGISTS = 'Archaeologists'
export const TABLE_HEADER_FEE = 'Fee'
export const TABLE_HEADER_DIGGING_FEE = 'Digging Fee'
export const TABLE_HEADER_BOUNTY = 'Bounty'
export const TABLE_HEADER_METRICS = 'Metrics'


export const FEE_ARCH_TOOLTIP = 'Total fee in $SARCO to create this sarcophagus.'
export const BOUNTY_ARCH_TOOLTIP = 'This Archaeologists minimum bounty requirement.'
export const DIGGING_FEE_ARCH_TOOLTIP = 'This Archaeologists minimum digging fee for your resurrection date/time.'

// tomb page
export const CANCEL_TOOLTIP = 'Canceling a sarcophagus, transfers the bounty and storage fee back, transfers the digging fee to the archaeologist, and archives sarcophagus.'
export const CLEAN_TOOlTIP = 'Cleaning a sarcophagus, rewards embalmer with the cursed bond, and refunds the rest of the payment (bounty and digging fees) back to embalmer and archives sarcophagus.'
export const BURY_TOOLTIP = 'Burying a sarcophagus, releases digging fees to archaeologist and archives sarcophagus.'

export const TOMB_MAIN_CONTENT_PART_1 = 'This is where you manage your Sarcophagi. View the ones you created or received, including any canceled, buried, or errored out' 
export const TOMB_MAIN_CONTENT_PART_2 = 'For more information on alert statuses and different states of your Sarcophagi,'
export const TOMB_MAIN_CONTENT_LINK = 'see here'

// Resurrection page
export const RESURRECTION_DESCRIPTION = 'If the embalmer does not attest to their Sarcophagus, this is where the receiver will type in the private key to decrypt the inner layer and gain access to the file.'

// Eye of Horus page
export const HORUS_MAIN_CONTENT_PART_1 = 'The Eye of Horus watches over your Sarcophagi and allows network participants to prove any wrongdoing by the archaeologist at any time.'
export const HORUS_MAIN_CONTENT_PART_2 = 'When a Sarcophagus is created, a hash for each layer is also created. The hash is used to prove the identity and integrity of the layers.'
export const HORUS_MAIN_CONTENT_PART_3 = 'The single hash remains hidden unless the Sarcophagus is unwrapped. This can happen during the resurrection time, or if the archaeologist unwraps before then.'

export const SINGLEHASH_TITLE = 'Single Hash'
export const SINGLEHASH_TOOLTIP = 'The Sarcophagus payload (file bytes) with the outer layer decrypted, hashed once'
export const SINGLEHASH_PLACEHOLDER = '0x0000000000000000000000000000000000000000000000000000000000000000'
export const PAYMENT_ADDRESS_TITLE = 'Archaeologist Address'
export const ADDRESS_TOOLTIP = 'Address of the archaeologist you are accusing'
export const ADDRESS_PLACEHOLDER = '0x0000000000000000000000000000000000000000'
export const IDENTIFIER_TITLE = 'Sarcophagus Identifier'
export const IDENTIFIER_TOOLTIP = 'The Sarcophagus payload (file bytes) encrypted and hashed twice. This proves that the archaeologist uploaded the correct data to Arweave.'
export const IDENTIFIER_PLACEHOLDER = '0x0000000000000000000000000000000000000000000000000000000000000000'

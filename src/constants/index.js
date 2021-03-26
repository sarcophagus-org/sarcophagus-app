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
  PROCESS_COMPLETE: 'Sarcophagus is Active',
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
  BLOCKCHAIN_SERVER: 'There was an error connection to blockchain',
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
export const CREATE_MAIN_CONTENT = 'Use this page to create a sarcophagus, this process is called “embalming”. You will need to name your sarcophagus, paste in the full public key of the recipient, and upload the file you wish to embalm.'
export const CREATE_MAIN_HEADER = 'Create a Sarcophagus'

// Name and recipient section
export const NAME_AND_RECIPIENT_HEADER = 'Name Sarcophagus and add your recipient'
export const NAME_INFO_CONTENT = 'Enter a name for your sarcophagus, this will be public on the blockchain.'
export const RECIPIENT_INFO_PART_1 = 'Paste your recipient’s full Ethereum public key here, this is not the same as a public address. You can visit'
export const RECIPIENT_INFO_LINK = 'Get Public Key'
export const RECIPIENT_INFO_PART_2 = 'to get your full public key.'

// File upload section
export const FILE_UPLOAD_HEADER = 'Upload your file to your sarcophagus'
export const FILE_UPLOAD_INFO = 'Upload the file that you wish to embalm. This file will be downloaded exactly as it is after resurrection. Current alpha max file size: 2.5mb'

// Resurrection Time section
export const RESURRECTION_TIME_HEADER = 'Set resurrection time'
export const RESURRECTION_INFO_P_1 = 'The resurrection time is the exact time and date that the outer layer of your sarcophagus will be decrypted by the Archaeologist.'
export const RESURRECTION_INFO_P_2 = 'If you fail to re-wrap before this time; only the inter layer of encryption controlled by the recipient is protecting the data in your sarcophagus.'
export const RESURRECTION_INFO_P_3 = 'The further the resurrection date is into the future, the more it will cost to create your sarcophagus.'

// Archaeologist section
export const PICK_ARCHAEOLOGIST_HEADER = 'Pick an Archaeologist'
export const FEES_INFO = 'Archaeologists are sorted by their mininum fees. When an archaeologist is selected, the mininum fees will be set to these fields. To increase fees offered to an archaeologist, enter new fees after selecting an archaeologist'
export const BOUNTY_TOOL_TIP = "Max Bounty. Paid to the Archaeologist for a successful resurrection (keep default unless adv user)"
export const DIGGING_FEE_TOOL_TIP = "Max Digging Fees. Your Paid to the archaeologist after re-wrap (keep default unless adv user)"


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

export const TOMB_MAIN_CONTENT_PART_1 = 'Your tomb is where you manage your sarcophagi. You will be able to see the ones you have created or received, as well as any canceled, buried, or errored out sarcophagi.' 
export const TOMB_MAIN_CONTENT_PART_2 = 'More information on the alert statuses and different states for your sarcophagi, please visit our documentation:'
export const TOMB_MAIN_CONTENT_LINK = 'https://github.com/sarcophagus-org/sarcophagus-app/blob/develop/README.md'

// Eye of Horus page
// if both aren't needed we can delete the second part
export const HORUS_MAIN_CONTENT_PART_1 = 'Ad aliqua proident adipisicing id cillum nisi cupidatat incididunt duis. Cupidatat occaecat aliquip deserunt mollit labore et occaecat ipsum veniam voluptate aliqua tempor. Deserunt esse dolore occaecat ipsum nulla nisi proident esse ipsum. Sint veniam magna pariatur amet ea ut reprehenderit velit eu magna ut cillum aute.'
export const HORUS_MAIN_CONTENT_PART_2 = 'In deserunt sit proident eu incididunt quis veniam. Nisi nisi irure mollit aute nisi incididunt velit qui qui ex amet est. Veniam fugiat fugiat aute magna tempor velit officia nulla est eiusmod. Et incididunt eu anim in adipisicing nisi dolor.'

export const SINGLEHASH_TITLE = 'Single Hash'
export const SINGLEHASH_TOOLTIP = 'The sarcophagus payload (file bytes) with the outer layer decrypted, hashed once'
export const SINGLEHASH_PLACEHOLDER = '0x0000000000000000000000000000000000000000000000000000000000000000'
export const PAYMENT_ADDRESS_TITLE = 'Archaeologist Address'
export const ADDRESS_TOOLTIP = 'Address of the Archaeologist you are accusing'
export const ADDRESS_PLACEHOLDER = '0x0000000000000000000000000000000000000000'
export const IDENTIFIER_TITLE = 'Sarcophagus Identifier'
export const IDENTIFIER_TOOLTIP = 'The sarcophagus payload (file bytes) encrypted and hashed twice'
export const IDENTIFIER_PLACEHOLDER = '0x0000000000000000000000000000000000000000000000000000000000000000'
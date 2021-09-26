import { SarcophagusStatus } from "./tomb.enums";
import Arweave from 'arweave'
import { truncate } from "../shared/components.utils";

export const initArweave = () => {
  return Arweave.init({
    host: 'arweave.net',// Hostname or IP address for a Arweave host
    port: 443,          // Port
    protocol: 'https',  // Network protocol http or https
    timeout: 20000,     // Network request timeouts in milliseconds
    logging: false,     // Enable network request logging
  })
}

export const arweaveFileValid = async (arweave: Arweave, transactionId?: string, doubleEncryptedFile?: string | Uint8Array) => {
  if(!transactionId || !doubleEncryptedFile) {
    return false
  }
  try {
    const data = await arweave.transactions.getData(transactionId, {decode: true})
    const buffedData = Buffer.from(data)
    const buffFile = Buffer.from(doubleEncryptedFile)
    return (Buffer.compare(buffedData, buffFile) === 0)
  } catch (e) {
    console.error(e)
  }
}

export const formatSarcophagusName = (sarcophagusName: string) => {
  if(sarcophagusName.length > 30) {
    return truncate(sarcophagusName, 25, "...", 18)
  }
  return sarcophagusName;
}

export const getExpandsionText = (status: SarcophagusStatus) => {
  switch(status) {
    case SarcophagusStatus.Active:
      return 'Rewrap'
    case SarcophagusStatus.Signing:
      return 'Signing needed'
    case SarcophagusStatus.Unwrapped:
      return 'Resurrect'
    case SarcophagusStatus.WindowClosed:
    case SarcophagusStatus.PublicKeyUsed:
    case SarcophagusStatus.Error:
      return 'Details'
    default:
      return ''
  }
}

export const hexString = (value: string) => {
  let hexKey;
  if (value?.substr(0, 2) !== "0x") hexKey = "0x" + value;
  return hexKey || value;
};

const covertToTwoDigitString = (number: number) => {
  return number < 10 ? `0${number}` : number
}

export const getTimeRemaining = (endtime: number) => {
  const total = endtime - Date.parse(new Date().toString());
  const seconds = Math.floor( (total/1000) % 60 );
  const minutes = Math.floor( (total/1000/60) % 60 );
  const hours = Math.floor( (total/(1000*60*60)) % 24 );
  const days = Math.floor( total/(1000*60*60*24) );
  return `${days} days ${covertToTwoDigitString(hours)}:${covertToTwoDigitString(minutes)}:${covertToTwoDigitString(seconds)}`
}

export const dateTimeString = (dateAsUTC: string | number): string => {
  if(!dateAsUTC) return '00/00/0000 0:00:00 AM'
  const dateTime = new Date(dateAsUTC)
  return dateTime.toLocaleDateString() + " " + dateTime.toLocaleTimeString()
}

export const utcToDateObject = (dateAsUTC: string | number) => {
  const date = new Date(dateAsUTC)
  return date
}

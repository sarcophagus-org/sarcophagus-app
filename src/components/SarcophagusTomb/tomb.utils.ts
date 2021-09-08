import { truncate } from "../../utils"
import { SarcophagusStatus } from "./tomb.enums";

export const formatSarcophagusName = (sarcophagusName: string) => {
  if(sarcophagusName.length > 30) {
    return truncate(sarcophagusName, 25, "...", 18)
  }
  return sarcophagusName;
}

export const getExpandsionText = (status: SarcophagusStatus, error: string) => {
  if(error) return 'Details'
  switch(status) {
    case SarcophagusStatus.Active:
      return 'Rewrap'
    case SarcophagusStatus.Signing:
      return 'Signing needed'
    case SarcophagusStatus.Closed:
      return 'Details'
    default:
      return ''
  }
}

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
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
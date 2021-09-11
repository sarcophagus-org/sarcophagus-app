import { TimerStatus } from "./tomb.enums";

export interface UseCheckStatusState {

}

export interface CreatedSarcophagusData {
  assetDoubleHash?: string;
  sarcophagusName?: string;
  doubleEncryptedFile?: Buffer;
  endpoint?: string;
  newPublicKey?: string; 
  assetId?: string, 
  V?: string,
  R?: string, 
  S?: string
}

export interface UseRessurectionTimerState {
  timerStatus: TimerStatus;
  currentTimeTillResurrection: string;
  refreshTimers: () => void;
}

export interface RewrapFormState {
  resurrectionTime: number;
  bounty: number;
  diggingFee: number;
  custom: boolean;
  customTime: string;
  timeSelect: "week" | "month" | "threeMonths" | "custom" | null;
}

export interface RewrapFormErrors {
  resurrectionTime?: string;
  bounty?: string;
  diggingFee?: string;
  custom?: string;
  customTime?: string;
  timeSelect?: string;
}

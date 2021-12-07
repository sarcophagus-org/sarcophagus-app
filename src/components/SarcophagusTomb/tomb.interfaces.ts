import { ResurrectionTimes } from "../../types/sarcophagusCreate";
import { TimerStatus } from "./tomb.enums";

export interface CreatedSarcophagusData {
  assetDoubleHash?: Uint8Array;
  sarcophagusName?: string;
  doubleEncryptedFile?: Uint8Array;
  endpoint?: string;
  newPublicKey?: string;
  assetId?: string;
  V?: string;
  R?: string;
  S?: string;
}

export interface ResponseFromArch {
  NewPublicKey: string;
  AssetDoubleHash: Uint8Array;
  AssetId: string;
  V: string;
  R: string;
  S: string;
}

export interface UseResurrectionTimerState {
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
  timeSelect: ResurrectionTimes | null;
}

export interface RewrapFormErrors {
  resurrectionTime?: string;
  bounty?: string;
  diggingFee?: string;
  custom?: string;
  customTime?: string;
  timeSelect?: string;
}

export interface ResurrectionFormState {
  recipientPrivateKey: string;
}

export interface ResurrectionFormError {
  recipientPrivateKey?: string;
}

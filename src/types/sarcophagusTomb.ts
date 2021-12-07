import { ResurrectionTimes } from "./sarcophagusCreate";

export interface CreatedSarcophagusData {
  assetId?: string;
  assetDoubleHash?: Uint8Array;
  doubleEncryptedFile?: Uint8Array;
  endpoint?: string;
  newPublicKey?: string;
  sarcophagusName?: string;
  V?: string;
  R?: string;
  S?: string;
}

export interface ResponseFromArch {
  AssetId: string;
  NewPublicKey: string;
  AssetDoubleHash: Uint8Array;
  V: string;
  R: string;
  S: string;
}

export interface UseResurrectionTimerState {
  currentTimeTillResurrection: string;
  timerStatus: TimerStatus;
  refreshTimers: () => void;
}

export interface RewrapFormState {
  bounty: number;
  custom: boolean;
  customTime: string;
  diggingFee: number;
  resurrectionTime: number;
  timeSelect: ResurrectionTimes | null;
}

export interface ResurrectionFormState {
  recipientPrivateKey: string;
}

export enum SarcophagusStatus {
  // informational statuses
  Accused = "Sarcophagus accused successfully",
  Buried = "Sarcophagus buried",
  Canceled = "Sarcophagus cancelled",
  Cleaned = "Sarcophagus cleaned",
  Created = "Sarcophagus creation in progress, resurrection unavailable",
  Default = "Checking status...",
  Unwrapped = "Sarcophagus unwrapped, resurrection available",
  Unwrapping = "Unwrapping in progress",
  ArchivedUnwrapped = "resurrection available",
  Archived = "Archived",
  // activity statuses
  Active = "Sarcophagus is Active",
  ArweaveMining = "File is being mined on arweave",
  ArweaveUploading = "File is being uploaded",
  Mining = "Mining in progress",
  Signing = "Signing needed",
  // error statuses
  Error = "Sarcophagus Error",
  WindowClosed = "Resurrection Window is past",
  PublicKeyUsed = "Public key already used",
  ArweaveMiningError = "There was an error validating the arweave file",
}

export enum TimerStatus {
  Active,
  Close,
  Unwrapping,
  Off,
  Calculating,
}

export enum ServiceStatus {
  Sending = "File Sending",
  Failed = "There was a error sending file",
  Mining = "File is Mining",
  Success = "File has been mined",
}

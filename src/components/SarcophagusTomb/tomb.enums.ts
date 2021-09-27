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

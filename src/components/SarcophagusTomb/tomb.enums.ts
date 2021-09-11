export enum SarcophagusStatus {
  // informational statuses
  Canceled = 'Sarcophagus cancelled',
  Buried = 'Sarcophagus buried',
  Unwrapping = 'Unwrapping in progress',
  Unwrapped = 'Sarcophagus unwrapped, resurrection available',
  Created = 'Sarcophagus creation in progress, resurrection unavailable',
  Cleaned = 'Sarcophagus cleaned',
  Default = 'Checking status...',
  // activity statuses
  Active = 'Sarcophagus is Active',
  ArweaveMining = 'File is being mined on arweave',
  ArweaveUploading = 'File is being uploaded',
  Mining = 'Mining in progress',
  Signing = 'Signing needed',
  // error statuses
  Error = 'Sarcophagus Error',
  WindowClosed = 'Resurrection Window is past',
  PublicKeyUsed = 'Public key already used'
}

export enum TimerStatus {
  Active,
  Close,
  Unwrapping,
  Off,
  Calculating,
}
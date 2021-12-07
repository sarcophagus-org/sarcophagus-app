import { BigNumber } from "@ethersproject/bignumber";

export interface Archaeologist {
  exists: boolean;
  currentPublicKey: string;
  address: string;
  endpoint: string;
  isOnline?: boolean;
  paymentAddress: string;
  feePerByte: BigNumber;
  minimumBounty: BigNumber;
  minimumDiggingFee: BigNumber;
  maximumResurrectionTime: BigNumber;
  freeBond: BigNumber;
  cursedBond: BigNumber;
  cleanupCount?: BigNumber;
  canceledCount?: BigNumber;
  accusedCount?: BigNumber;
  successesCount?: BigNumber;
  cleanupIdentifiers?: string[];
  canceledIdentifiers?: string[];
  accusedIdentifiers?: string[];
  successesIdentifiers?: string[];
}

export interface ArchaeologistsStore {
  archaeologists: Archaeologist[];
  archaeologistsWithStats: Archaeologist[];
  filteredArchaeologists: Archaeologist[];
  loadArchaeologists: () => Promise<void>;
}
import { BigNumber } from "@ethersproject/bignumber";

export interface IArchaeologists {
  exists: boolean;
  currentPublicKey: string;
  address: string;
  endpoint: string;
  paymentAddress: string;
  feePerByte: BigNumber;
  minimumBounty: BigNumber;
  minimumDiggingFee: BigNumber;
  maximumResurrectionTime: BigNumber;
  freeBond: BigNumber;
  cursedBond: BigNumber;
  cleanedupCount?: BigNumber;
  canceledCount?: BigNumber;
  accusedCount?: BigNumber;
  successesCount?: BigNumber;
  cleanupIdentifiers?: string[];
  canceledIdentifiers?: string[];
  accusedIdentifiers?: string[];
  successesIdentifiers?: string[];
}

export interface IArchaeologistsStore {
  filteredArchaeologists: IArchaeologists;
  loadArchaeologists: () => void;
}
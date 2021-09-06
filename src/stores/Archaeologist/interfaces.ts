import { BigNumber } from "@ethersproject/bignumber";

export interface IArchaeologists {
  exists: boolean;
  currentPublicKey: string;
  endpoint: string;
  paymentAddress: string;
  feePerByte: BigNumber;
  minimumBounty: BigNumber;
  minimumDiggingFee: BigNumber;
  maximumResurrectionTime: BigNumber;
  freeBond: BigNumber;
  cursedBond: BigNumber;
}
import { BigNumber } from "@ethersproject/bignumber";

export interface ISarcophagusStore {
  embalmerSarcophagi: ISarcophagus[];
  recipientSarcophagi: ISarcophagus[];
  archivedSarcophagi: ISarcophagus[];
  isSarcophagiLoaded: boolean;
  loadRecipientSarcophagi: () => Promise<void>;
  loadEmbalmerSarcophagi: () => Promise<void>;
  loadSarcophagi: () => Promise<void>;
}

export interface ISarcophagus {
  state: number;
  archaeologist: string;
  name: string;
  resurrectionTime: BigNumber;
  resurrectionWindow: BigNumber;
  assetId: string;
  recipientPublicKey: string;
  storageFee: BigNumber;
  diggingFee: BigNumber;
  bounty: BigNumber;
  currentCursedBond: BigNumber;
  privateKey: string;
  AssetDoubleHash: string;
}

export interface IEmbalmerState {
  allEmbalmerSarcophagi: ISarcophagus[],
  loadEmbalmerSarcophagi: () => void;
}
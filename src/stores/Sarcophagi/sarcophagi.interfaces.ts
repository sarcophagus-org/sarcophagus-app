import { BigNumber } from "@ethersproject/bignumber";
import { SarcophagusStatus } from "../../components/SarcophagusTomb/tomb.enums";
import { CreatedSarcophagusData } from "../../components/SarcophagusTomb/tomb.interfaces";

export interface ISarcophagusStore {
  embalmerSarcophagi: ISarcophagus[];
  recipientSarcophagi: ISarcophagus[];
  archivedSarcophagi: ISarcophagus[];
  isSarcophagiLoaded: boolean;
  createdSarcophagusData: CreatedSarcophagusData | null;
  setCreatedSarcophagusData: React.Dispatch<React.SetStateAction<CreatedSarcophagusData | null>>;
  burySarcophagus: (
    buffedAssetDoubleHash: Buffer,
    setStatus: (status: SarcophagusStatus) => void
  ) => Promise<boolean>;
  rewrapSarcophagus: (
    buffedAssetDoubleHash: Buffer,
    resurrectionTimeBN: BigNumber,
    diggingFeeBN: BigNumber,
    bountyBN: BigNumber,
    setStatus: (status: SarcophagusStatus) => void
  ) => Promise<boolean>;
  cancelSarcophagus: (
    buffedAssetDoubleHash: Buffer,
    setStatus: (status: SarcophagusStatus) => void
  ) => Promise<boolean>;
  cleanSarcophagus: (
    buffedAssetDoubleHash: Buffer,
    archaeologist: string,
    setStatus: (status: SarcophagusStatus) => void
  ) => Promise<boolean>;
  accuseArchaeologist: () => Promise<void>;
  createSarcophagus: () => Promise<void>;
  updateSarcophagus: (setStatus: (status: SarcophagusStatus) => void) => Promise<boolean>;
  pendingSarcophagi: ISarcophagus[];
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
  allEmbalmerSarcophagi: ISarcophagus[];
  loadEmbalmerSarcophagi: () => void;
}

import { BigNumber } from "@ethersproject/bignumber";
import { SarcophagusStatus } from "../../components/SarcophagusTomb/tomb.enums";
import { CreatedSarcophagusData } from "../../components/SarcophagusTomb/tomb.interfaces";
import { Archaeologist } from "../Archaeologist/archaeologist.interfaces";

export type BurySarcophagus = (
  buffedAssetDoubleHash: Buffer,
  setStatus: (status: SarcophagusStatus) => void,
  successRefresh: () => void
) => void;

export type RewrapSarcophagus = (
  buffedAssetDoubleHash: Buffer,
  resurrectionTimeBN: BigNumber,
  diggingFeeBN: BigNumber,
  bountyBN: BigNumber,
  setStatus: (status: SarcophagusStatus) => void,
  successRefresh: () => void
) => void;

export type CancelSarcophagus = (
  buffedAssetDoubleHash: Buffer,
  setStatus: (status: SarcophagusStatus) => void,
  successCallback?: (txRecipient: { transactionHash: string }) => void
) => void;

export type CleanSarcophagus = (
  buffedAssetDoubleHash: Buffer,
  archaeologist: string,
  setStatus: (status: SarcophagusStatus) => void,
  successRefresh: () => void
) => void;

export type UpdateSarcophagus = (
  setStatus: (status: SarcophagusStatus) => void,
  successRefresh: () => void
) => Promise<void>;

type AccuseSarcophagus = () => Promise<void>;
export type CreateSarcophagus = (
  sarcophagusName: string,
  selectedArchaeologist: Archaeologist,
  resurrectionTimeBN: BigNumber,
  storageFee: number | string | BigNumber,
  diggingFeeBN: BigNumber,
  bountyBN: BigNumber,
  assetDoubleHash: Uint8Array,
  recipientPublicKeyBA: Uint8Array,
  doubleEncryptedFile: Uint8Array,
  successRefresh: () => void,
  redirect: () => void
) => void;

export interface ISarcophagusStore {
  embalmerSarcophagi: ISarcophagus[];
  recipientSarcophagi: ISarcophagus[];
  archivedSarcophagi: ISarcophagus[];
  isSarcophagiLoaded: boolean;
  createdSarcophagusData: CreatedSarcophagusData | null;
  setCreatedSarcophagusData: React.Dispatch<React.SetStateAction<CreatedSarcophagusData | null>>;
  burySarcophagus: BurySarcophagus;
  rewrapSarcophagus: RewrapSarcophagus;
  cancelSarcophagus: CancelSarcophagus;
  cleanSarcophagus: CleanSarcophagus;
  accuseArchaeologist: AccuseSarcophagus;
  createSarcophagus: CreateSarcophagus;
  updateSarcophagus: UpdateSarcophagus;
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
  storageFee: number | string | BigNumber;
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

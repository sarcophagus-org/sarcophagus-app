import { BigNumber } from "@ethersproject/bignumber";
import { SarcophagusStatus } from "../../components/SarcophagusTomb/tomb.enums";
import { CreatedSarcophagusData } from "../../components/SarcophagusTomb/tomb.interfaces";
import { Archaeologist } from "../Archaeologist/archaeologist.interfaces";

type BurySarcophagus = (
  buffedAssetDoubleHash: Buffer,
  setStatus: (status: SarcophagusStatus) => void
) => Promise<boolean>;

type RewrapSarcophagus = (
  buffedAssetDoubleHash: Buffer,
  resurrectionTimeBN: BigNumber,
  diggingFeeBN: BigNumber,
  bountyBN: BigNumber,
  setStatus: (status: SarcophagusStatus) => void
) => Promise<boolean>;

type CancelSarcophagus = (
  buffedAssetDoubleHash: Buffer,
  setStatus: (status: SarcophagusStatus) => void
) => Promise<boolean>;

type CleanSarcophagus = (
  buffedAssetDoubleHash: Buffer,
  archaeologist: string,
  setStatus: (status: SarcophagusStatus) => void
) => Promise<boolean>;

type UpdateSarcophagus = (setStatus: (status: SarcophagusStatus) => void) => Promise<boolean>;

type AccuseSarcophagus = () => Promise<void>;
type CreateSarcophagus = (
  sarcophagusName: string,
  selectedArchaeologist: Archaeologist,
  resurrectionTimeBN: BigNumber,
  storageFee: number,
  diggingFeeBN: BigNumber,
  bountyBN: BigNumber,
  assetDoubleHash: Uint8Array,
  recipientPublicKeyBA: Uint8Array,
  doubleEncryptedFile: Uint8Array
) => Promise<void>;

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

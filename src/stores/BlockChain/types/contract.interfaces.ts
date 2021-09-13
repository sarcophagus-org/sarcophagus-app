import { BigNumber } from "@ethersproject/bignumber";
import { Contract, ContractTransaction } from "@ethersproject/contracts";
import { Archaeologist } from "../../Archaeologist/archaeologist.interfaces";
import { ISarcophagus } from "../../Sarcophagi/sarcophagi.interfaces";

export interface ISarcophagusContract extends Contract {
  embalmerSarcophagusCount: (account: string | undefined) => Promise<BigNumber>;
  embalmerSarcophagusIdentifier: (account: string | undefined, index: number) => Promise<string>;
  recipientSarcophagusCount: (account: string | undefined) => Promise<BigNumber>;
  recipientSarcophagusIdentifier: (account: string | undefined, index: number) => Promise<string>;
  sarcophagus: (identifier: Buffer) => Promise<ISarcophagus>;
  archaeologistCount: () => Promise<BigNumber>;
  archaeologistAddresses: (index: number) => Promise<string>;
  archaeologists: (identifier: string) => Promise<Archaeologist>;
  createSarcophagus: (
    sarcophagusName: any,
    archaeologist: any,
    resurrectionTime: any,
    storageFee: BigNumber,
    diggingFee: BigNumber,
    bounty: BigNumber,
    assetDoubleHash: any,
    recipientPublicKey: any
  ) => Promise<ContractTransaction>;
  updateSarcophagus: (
    NewPublicKey: any,
    AssetDoubleHash: any,
    AssetId: any,
    V: any,
    R: any,
    S: any
  ) => Promise<ContractTransaction>;
  rewrapSarcophagus: (
    identifier: any,
    resurrectionTime: any,
    diggingFee: BigNumber,
    bounty: BigNumber
  ) => Promise<ContractTransaction>;
  burySarcophagus: (identifier: any) => Promise<ContractTransaction>;
  cleanupSarcophagus: (identifier: any, archaeologist: any) => Promise<ContractTransaction>;
  cancelSarcophagus: (identifier: any) => Promise<ContractTransaction>;
  accuseArchaeologist: (identifier: any, singleHashUint: any, address: any) => Promise<ContractTransaction>;
}

export interface ISarcophagusTokenContract extends Contract {}

export interface IBlockChainStore {
  sarcophagusContract: ISarcophagusContract | undefined;
  sarcophagusTokenContract: ISarcophagusTokenContract | undefined;
  allowance: BigNumber;
  balance: BigNumber;
}

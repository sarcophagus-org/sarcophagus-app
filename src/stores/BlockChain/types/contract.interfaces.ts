import { BigNumber } from "@ethersproject/bignumber";
import { Contract, ContractTransaction } from "@ethersproject/contracts";
import { Archaeologist } from "../../Archaeologist/archaeologist.interfaces";
import { Sarcophagus } from "../../Sarcophagi/sarcophagi.interfaces";

export interface SarcophagusContract extends Contract {
  embalmerSarcophagusCount: (account: string | undefined) => Promise<BigNumber>;
  embalmerSarcophagusIdentifier: (account: string | undefined, index: number) => Promise<string>;
  recipientSarcophagusCount: (account: string | undefined) => Promise<BigNumber>;
  recipientSarcophagusIdentifier: (account: string | undefined, index: number) => Promise<string>;
  sarcophagus: (identifier: Buffer) => Promise<Sarcophagus>;
  archaeologistCount: () => Promise<BigNumber>;
  archaeologistAddresses: (index: number) => Promise<string>;
  archaeologists: (identifier: string) => Promise<Archaeologist>;
  createSarcophagus: (
    sarcophagusName: any,
    archaeologist: any,
    resurrectionTime: any,
    storageFee: number | string | BigNumber,
    diggingFee: BigNumber,
    bounty: BigNumber,
    assetDoubleHash: any,
    recipientPublicKey: any
  ) => Promise<ContractTransaction>;
  updateSarcophagus: (
    newPublicKey: any,
    assetDoubleHash: any,
    assetId: any,
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

export interface SarcophagusTokenContract extends Contract {}

export interface IBlockChainStore {
  sarcophagusContract: SarcophagusContract | undefined;
  sarcophagusTokenContract: SarcophagusTokenContract | undefined;
  allowance: BigNumber;
  balance: BigNumber;
}

import { BigNumber } from "@ethersproject/bignumber";
import { Contract } from "@ethersproject/contracts";
import { IArchaeologists } from "../../Archaeologist/archaeologist.interfaces";
import { ISarcophagus } from "../../Sarcophagi/sarcophagi.interfaces";

export interface ISarcophagusContract extends Contract {
  embalmerSarcophagusCount: (account: string | undefined) => Promise<BigNumber>;
  embalmerSarcophagusIdentifier: (account: string | undefined, index: number) => Promise<string>;
  recipientSarcophagusCount: (account: string | undefined) => Promise<BigNumber>;
  recipientSarcophagusIdentifier: (account: string | undefined, index: number) => Promise<string>;
  sarcophagus: (identifier: Buffer) => Promise<ISarcophagus>;
  archaeologistCount: () => Promise<BigNumber>;
  archaeologistAddresses: (index: number) => Promise<string>;
  archaeologists: (identifier: string) => Promise<IArchaeologists>;
}

export interface ISarcophagusTokenContract extends Contract {}

export interface IBlockChainStore {
  sarcophagusContract: ISarcophagusContract | undefined;
  sarcophagusTokenContract: ISarcophagusTokenContract | undefined;
  allowance: BigNumber;
  balance: BigNumber;
}

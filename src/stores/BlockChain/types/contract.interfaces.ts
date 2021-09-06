import { BigNumber } from "@ethersproject/bignumber";
import { Contract } from "@ethersproject/contracts";
import { ISarcophagus } from "../../Sarcophagi/interfaces";

export interface ISarcophagusContract extends Contract {
  embalmerSarcophagusCount: (account: string | undefined) => Promise<BigNumber>;
  embalmerSarcophagusIdentifier: (account: string | undefined, index: number) => Promise<string>;
  embalmerSarcophagus: (account: string | undefined, index: number) => Promise<string>;
  recipientSarcophagusCount: (account: string | undefined) => Promise<BigNumber>;
  recipientSarcophagusIdentifier: (account: string | undefined, index: number) => Promise<string>;
  recipientSarcophagus: (account: string | undefined, index: number) => Promise<string>;
  sarcophagus: (identifier: Buffer) => Promise<ISarcophagus>;

}

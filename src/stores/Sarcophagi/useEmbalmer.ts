import {ethers} from "ethers";
import { useState } from "react";
import { useWeb3 } from "../../web3";
import { ISarcophagusContract } from "../BlockChain/types/contract.interfaces";
import { ISarcophagus } from "./interfaces";

const useEmbalmer = (sarcophagusContract: ISarcophagusContract) => {
  const [allEmbalmerSarcophagi, setallEmbalmerSarcophagi] = useState<ISarcophagus[]>([]);
  const { account } = useWeb3();

  // fetches connected user created sarcophagus count
  // @params account: address of connected web3 account
  const fetchSarcophagiCount = async (account: string | undefined): Promise<ethers.BigNumber> => {
      const count = await sarcophagusContract.embalmerSarcophagusCount(account);
      return count;
  };

  // fetches hash identifiers of connected user's sarcophagi
  // @params account: address of connected web3 account
  // @params count: BigNumber returned from embalmerSarcophagusCount method
  const fetchSarcophagusIdentifiers = async (account: string | undefined, count: ethers.BigNumber): Promise<string[]> => {
      const arr = new Array(count.toNumber()).fill(undefined);
      const fetchIdentifier = async (_: any, index: number) => {
        return await sarcophagusContract.embalmerSarcophagusIdentifier(account, index);
      };
      const identifiers = await Promise.all(arr.map(fetchIdentifier));
      return identifiers;
  };

  // fetches sarcophagus data of given identifiers
  // @params identifiers: doublehash identifier of connected user's sarcophagi
  const fetchSarcophagiData = async (identifiers: string[]) => {
      const fetchData = async (identifier: string) => {
        return {
          ...(await sarcophagusContract.sarcophagus(Buffer.from(ethers.utils.arrayify(identifier)))),
          AssetDoubleHash: identifier,
        };
      };
      const embalmerSarcophagi = await Promise.all(identifiers.map(fetchData))
      return embalmerSarcophagi;
  };

  const loadEmbalmerSarcophagi = async () => {
    try {
      const count = await fetchSarcophagiCount(account);
      // if count is 0 do nothing and return
      if(count.isZero()) {
        return;
      }
      const identifiers = await fetchSarcophagusIdentifiers(account, count);
      const sarcophagiData = await fetchSarcophagiData(identifiers)
      setallEmbalmerSarcophagi(sarcophagiData)
    } catch (error) {
      console.error('Embalmer, Sarcophagus error:', error)
    } 
  }

  return { allEmbalmerSarcophagi, loadEmbalmerSarcophagi }
};

export default useEmbalmer

import { ethers } from "ethers";
import { useCallback, useEffect, useState } from "react";
import { useWeb3 } from "../../web3";
import { useBlockChainStore } from "../BlockChain";
import { ISarcophagus } from "./sarcophagi.interfaces";

const useEmbalmer = () => {
  const { account } = useWeb3();
  const { sarcophagusContract } = useBlockChainStore();
  const [allEmbalmerSarcophagi, setallEmbalmerSarcophagi] = useState<ISarcophagus[]>([]);

  // fetches connected user created sarcophagus count
  // @params account: address of connected web3 account
  const fetchSarcophagiCount = useCallback(
    async (account: string | undefined): Promise<ethers.BigNumber> => {
      if (!sarcophagusContract) return ethers.BigNumber.from(0);
      const count = await sarcophagusContract.embalmerSarcophagusCount(account);
      return count;
    },
    [sarcophagusContract]
  );

  // fetches hash identifiers of connected user's sarcophagi
  // @params account: address of connected web3 account
  // @params count: BigNumber returned from embalmerSarcophagusCount method
  const fetchSarcophagusIdentifiers = useCallback(
    async (account: string | undefined, count: ethers.BigNumber): Promise<string[]> => {
      if (!sarcophagusContract) return [];
      const arr = new Array(count.toNumber()).fill(undefined);
      const fetchIdentifier = async (_: any, index: number) => {
        return await sarcophagusContract.embalmerSarcophagusIdentifier(account, index);
      };
      const identifiers = await Promise.all(arr.map(fetchIdentifier));
      return identifiers;
    },
    [sarcophagusContract]
  );

  // fetches sarcophagus data of given identifiers
  // @params identifiers: doublehash identifier of connected user's sarcophagi
  const fetchSarcophagiData = useCallback(
    async (identifiers: string[]) => {
      if (!sarcophagusContract) return [];
      const fetchData = async (identifier: string) => {
        return {
          ...(await sarcophagusContract.sarcophagus(Buffer.from(ethers.utils.arrayify(identifier)))),
          AssetDoubleHash: identifier,
        };
      };
      const embalmerSarcophagi = await Promise.all(identifiers.map(fetchData));
      return embalmerSarcophagi;
    },
    [sarcophagusContract]
  );

  const loadEmbalmerSarcophagi = useCallback(async () => {
    try {
      const count = await fetchSarcophagiCount(account);
      // if count is 0 do nothing and return
      if (count.isZero()) {
        return;
      }
      const identifiers = await fetchSarcophagusIdentifiers(account, count);
      const sarcophagiData = await fetchSarcophagiData(identifiers);
      if (!sarcophagiData.length) return;
      setallEmbalmerSarcophagi(sarcophagiData);
    } catch (error) {
      console.error("Embalmer, Sarcophagus error:", error);
    }
  }, [fetchSarcophagiCount, fetchSarcophagusIdentifiers, fetchSarcophagiData, account]);

  useEffect(() => {
    loadEmbalmerSarcophagi();
  }, [loadEmbalmerSarcophagi]);

  return { allEmbalmerSarcophagi, loadEmbalmerSarcophagi };
};

export default useEmbalmer;

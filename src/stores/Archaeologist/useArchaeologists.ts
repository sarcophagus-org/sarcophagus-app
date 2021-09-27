import { BigNumber } from "@ethersproject/bignumber";
import { useCallback, useEffect, useState } from "react";
import { SarcophagusContract } from "../BlockChain/types/contract.interfaces";
import { Archaeologist } from "./archaeologist.interfaces";

const useArcheologists = (sarcophagusContract: SarcophagusContract) => {
  const [archaeologists, setArchaeologists] = useState<Archaeologist[]>([]);

  const fetchArchaeologistCount = useCallback(async () => {
    if(!sarcophagusContract) return BigNumber.from(0);
    const count = await sarcophagusContract.archaeologistCount();
    return count;
  }, [sarcophagusContract]);

  const fetchArchaeologistIdentifiers = useCallback(
    async (count: BigNumber) => {
      const arr = new Array(count.toNumber()).fill(undefined);
      const fetchIdentifier = async (_: any, index: number) => {
        return await sarcophagusContract.archaeologistAddresses(index);
      };
      const identifiers = await Promise.all(arr.map(fetchIdentifier));
      return identifiers;
    },
    [sarcophagusContract]
  );

  const fetchArchaeologistData = useCallback(
    async (identifiers: string[]) => {
      const fetchData = async (identifier: string) => {
        return {
          ...(await sarcophagusContract.archaeologists(identifier)),
          address: identifier,
        };
      };
      const archaeologists = await Promise.all(identifiers.map(fetchData));
      return archaeologists;
    },
    [sarcophagusContract]
  );

  const loadArchaeologists = useCallback(async () => {
    try {
      const count = await fetchArchaeologistCount();
      // if count is 0 do nothing and return
      if (count.isZero()) {
        return;
      }
      const identifiers = await fetchArchaeologistIdentifiers(count);
      const archaeologists = await fetchArchaeologistData(identifiers);
      setArchaeologists(archaeologists);
    } catch (error) {
      console.error("Embalmer, Sarcophagus error:", error);
    }
  }, [fetchArchaeologistCount, fetchArchaeologistData, fetchArchaeologistIdentifiers]);

  useEffect(() => {
    loadArchaeologists();
  }, [loadArchaeologists]);
  return { archaeologists, loadArchaeologists };
};

export { useArcheologists };

import { useCallback, useEffect, useState } from "react";
import { SarcophagusContract } from "../BlockChain/types/contract.interfaces";
import { ethers } from "ethers";
import { Archaeologist } from "./archaeologist.interfaces";

const useArchaeologistStats = (
  sarcophagusContract: SarcophagusContract,
  archaeologists: Archaeologist[]
) => {
  const [archaeologistsWithStats, setArchaeologistsWithStats] = useState<Archaeologist[]>([]);

  const fetchCleanupCount = useCallback(
    async (address: string) => {
      const count = await sarcophagusContract.archaeologistCleanupsCount(address);
      return count;
    },
    [sarcophagusContract]
  );

  const fetchCanceledCount = useCallback(
    async (address: string) => {
      const count = await sarcophagusContract.archaeologistCancelsCount(address);
      return count;
    },
    [sarcophagusContract]
  );

  const fetchAccusedCount = useCallback(
    async (address: string) => {
      const count = await sarcophagusContract.archaeologistAccusalsCount(address);
      return count;
    },
    [sarcophagusContract]
  );

  const fetchSuccessesCount = useCallback(
    async (address: string) => {
      const count = await sarcophagusContract.archaeologistSuccessesCount(address);
      return count;
    },
    [sarcophagusContract]
  );

  const fetchCleanupIdentifiers = useCallback(
    async (identifier: string, count: ethers.BigNumber) => {
      const arr = new Array(count.toNumber()).fill(undefined);
      const fetchIdentifier = async (_: any, index: number) => {
        return await sarcophagusContract.archaeologistCleanupsIdentifier(identifier, index);
      };
      const identifiers = await Promise.all(arr.map(fetchIdentifier));
      return identifiers;
    },
    [sarcophagusContract]
  );

  const fetchCanceledIdentifiers = useCallback(
    async (identifier: string, count: ethers.BigNumber) => {
      const arr = new Array(count.toNumber()).fill(undefined);
      const fetchIdentifier = async (_: any, index: number) => {
        return await sarcophagusContract.archaeologistCancelsIdentifier(identifier, index);
      };
      const identifiers = await Promise.all(arr.map(fetchIdentifier));
      return identifiers;
    },
    [sarcophagusContract]
  );

  const fetchAccusedIdentifiers = useCallback(
    async (identifier: string, count: ethers.BigNumber) => {
      const arr = new Array(count.toNumber()).fill(undefined);
      const fetchIdentifier = async (_: any, index: number) => {
        return await sarcophagusContract.archaeologistAccusalsIdentifier(identifier, index);
      };
      const identifiers = await Promise.all(arr.map(fetchIdentifier));
      return identifiers;
    },
    [sarcophagusContract]
  );

  const fetchSuccessesIdentifiers = useCallback(
    async (identifier: string, count: ethers.BigNumber) => {
      const arr = new Array(count.toNumber()).fill(undefined);
      const fetchIdentifier = async (_: any, index: number) => {
        return await sarcophagusContract.archaeologistSuccessesIdentifier(identifier, index);
      };
      const identifiers = await Promise.all(arr.map(fetchIdentifier));
      return identifiers;
    },
    [sarcophagusContract]
  );

  const loadArchaeologistsStats = useCallback(async () => {
    const fetchArchaeologistStats = async (archaeologist: Archaeologist) => {
      const cleanupCount = await fetchCleanupCount(archaeologist.address);
      const canceledCount = await fetchCanceledCount(archaeologist.address);
      const accusedCount = await fetchAccusedCount(archaeologist.address);
      const successesCount = await fetchSuccessesCount(archaeologist.address);

      const cleanupIdentifiers = await fetchCleanupIdentifiers(archaeologist.address, cleanupCount);
      const canceledIdentifiers = await fetchCanceledIdentifiers(archaeologist.address, canceledCount);
      const accusedIdentifiers = await fetchAccusedIdentifiers(archaeologist.address, accusedCount);
      const successesIdentifiers = await fetchSuccessesIdentifiers(archaeologist.address, successesCount);

      const archaeologistWithStats = {
        ...archaeologist,
        cleanupCount,
        canceledCount,
        accusedCount,
        successesCount,
        cleanupIdentifiers,
        canceledIdentifiers,
        accusedIdentifiers,
        successesIdentifiers,
      };
      return archaeologistWithStats;
    };
    const archaeologistsWithStats = await Promise.all(archaeologists.filter((archaeologist: Archaeologist) => archaeologist.isOnline).map(fetchArchaeologistStats));
    setArchaeologistsWithStats(archaeologistsWithStats);
  }, [
    archaeologists,
    fetchCleanupCount,
    fetchCanceledCount,
    fetchAccusedCount,
    fetchSuccessesCount,
    fetchCleanupIdentifiers,
    fetchCanceledIdentifiers,
    fetchAccusedIdentifiers,
    fetchSuccessesIdentifiers,
  ]);

  useEffect(() => {
    loadArchaeologistsStats();
  }, [loadArchaeologistsStats]);

  return { archaeologistsWithStats, loadArchaeologistsStats };
};

export default useArchaeologistStats;

import { useState } from "react";
import { IArchaeologists } from "./interfaces";
import { ISarcophagusContract } from "../BlockChain/types/contract.interfaces";
import { ethers } from "ethers";

const useArchaeologistStats = (
  sarcophagusContract: ISarcophagusContract,
  archaeologists: IArchaeologists[]
) => {
  const [archaeologistsWithStats, setArchaeologistsWithStats] = useState<IArchaeologists[]>([]);

  const fetchCleanupCount = async (address: string) => {
    const count = await sarcophagusContract.archaeologistCleanupsCount(address);
    return count;
  };

  const fetchCanceledCount = async (address: string) => {
    const count = await sarcophagusContract.archaeologistCancelsCount(address);
    return count;
  };
  const fetchAccusedCount = async (address: string) => {
    const count = await sarcophagusContract.archaeologistAccusalsCount(address);
    return count;
  };
  const fetchSuccessesCount = async (address: string) => {
    const count = await sarcophagusContract.archaeologistSuccessesCount(address);
    return count;
  };

  const fetchCleanupIdentifiers = async (identifier: string, count: ethers.BigNumber) => {
    const arr = new Array(count.toNumber()).fill(undefined);
    const fetchIdentifier = async (_: any, index: number) => {
      return await sarcophagusContract.archaeologistCleanupsIdentifier(identifier, index);
    };
    const identifiers = await Promise.all(arr.map(fetchIdentifier));
    return identifiers;
  };

  const fetchCanceledIdentifiers = async (identifier: string, count: ethers.BigNumber) => {
    const arr = new Array(count.toNumber()).fill(undefined);
    const fetchIdentifier = async (_: any, index: number) => {
      return await sarcophagusContract.archaeologistCancelsIdentifier(identifier, index);
    };
    const identifiers = await Promise.all(arr.map(fetchIdentifier));
    return identifiers;
  };

  const fetchAccusedIdentifiers = async (identifier: string, count: ethers.BigNumber) => {
    const arr = new Array(count.toNumber()).fill(undefined);
    const fetchIdentifier = async (_: any, index: number) => {
      return await sarcophagusContract.archaeologistAccusalsIdentifier(identifier, index);
    };
    const identifiers = await Promise.all(arr.map(fetchIdentifier));
    return identifiers;
  };

  const fetchSuccessesIdentifiers = async (identifier: string, count: ethers.BigNumber) => {
    const arr = new Array(count.toNumber()).fill(undefined);
    const fetchIdentifier = async (_: any, index: number) => {
      return await sarcophagusContract.archaeologistSuccessesIdentifier(identifier, index);
    };
    const identifiers = await Promise.all(arr.map(fetchIdentifier));
    return identifiers;
  };

  const loadArchaeologistsStats = async () => {
    const fetchArchaeologistStats = async (archaeologist: IArchaeologists) => {
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
      return archaeologistWithStats
    };
    const archaeologistsWithStates = await Promise.all(archaeologists.map(fetchArchaeologistStats))
    setArchaeologistsWithStats(archaeologistsWithStates)
  };

  return { archaeologistsWithStats, loadArchaeologistsStats }
};

export default useArchaeologistStats;

import { useCallback, useEffect, useState } from "react";
import { useWeb3 } from "../../web3";
import { ethers } from "ethers";
import { ISarcophagus } from "./sarcophagi.interfaces";
import { useBlockChainStore } from "../BlockChain";

const useRecipient = (address?: string) => {
  const { sarcophagusContract } = useBlockChainStore();
  const [allRecipientSarcophagi, setAllRecipientSarcophagi] = useState<ISarcophagus[]>([]);
  const { account } = useWeb3();
  const [isRecipientSarcophagiLoaded, setRecipientSarcophagiLoaded] = useState(false);
  // given address or account address
  const accountAddress = address || account;

  // fetches connected user recieved sarcophagus count
  const fetchRecipientCount = useCallback(async () => {
    if (!sarcophagusContract) return ethers.BigNumber.from(0);
    const count = await sarcophagusContract.recipientSarcophagusCount(accountAddress);
    return count;
  }, [sarcophagusContract, accountAddress]);

  // fetches hash identifiers of connected user's sarcophagi
  // @params count: BigNumber returned from recipientSarcophagusCount method
  const fetchRecipientIdentifiers = useCallback(
    async (count: ethers.BigNumber) => {
      const arr = new Array(count?.toNumber()).fill(undefined);
      const fetchIdentifier = async (_: any, index: number) => {
        return await sarcophagusContract.recipientSarcophagusIdentifier(accountAddress, index);
      };
      const identifiers = await Promise.all(arr.map(fetchIdentifier));
      return identifiers;
    },
    [sarcophagusContract, accountAddress]
  );

  // fetches sarcophagus data of given identifiers
  // @params identifiers: doublehash identifier of connected address's received sarcophagi
  const fetchRecipientData = useCallback(
    async (identifiers: string[]) => {
      const recipientSarcophagi = await Promise.all(
        identifiers.map(async (identifier) => {
          return {
            ...(await sarcophagusContract?.sarcophagus(Buffer.from(ethers.utils.arrayify(identifier)))),
            AssetDoubleHash: identifier,
          };
        })
      );
      return recipientSarcophagi;
    },
    [sarcophagusContract]
  );

  const loadRecipientSarcophagi = useCallback(async () => {
    try {
      const count = await fetchRecipientCount();
      // if count is 0 do nothing and return
      if (count.isZero()) {
        return;
      }
      const identifiers = await fetchRecipientIdentifiers(count);
      const sarcophagiData = await fetchRecipientData(identifiers);
      if (!sarcophagiData.length) return;
      setAllRecipientSarcophagi(sarcophagiData);
    } catch (error) {
      console.error("Recipient, Sarcophagus load error:", error);
    }
  }, [fetchRecipientCount, fetchRecipientIdentifiers, fetchRecipientData]);

  useEffect(() => {
    setRecipientSarcophagiLoaded(false)
    loadRecipientSarcophagi().finally(() => {
      setRecipientSarcophagiLoaded(true)
    });
  },[loadRecipientSarcophagi])

  return { allRecipientSarcophagi, isRecipientSarcophagiLoaded, loadRecipientSarcophagi };
};

export default useRecipient;

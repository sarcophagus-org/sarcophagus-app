import { useState } from "react";
import { useWeb3 } from "../../web3";
import { ethers } from "ethers";
import { ISarcophagusContract } from "../BlockChain/types/contract.interfaces";
import { ISarcophagus } from "./interfaces";

const useRecipient = (sarcophagusContract: ISarcophagusContract, address?: string) => {
  const [allRecipientSarcophagi, setAllRecipientSarcophagi] = useState<ISarcophagus[]>([]);
  const { account } = useWeb3();

  const accountAddress = address || account;

  const fetchRecipientCount = async () => {
    const count = await sarcophagusContract.recipientSarcophagusCount(accountAddress);
    return count;
  };

  const fetchRecipientIdentifiers = async (count: ethers.BigNumber) => {
    const arr = new Array(count?.toNumber()).fill(undefined);
    const fetchIdentifier = async (_: any, index: number) => {
      return await sarcophagusContract.recipientSarcophagusIdentifier(accountAddress, index);
    };
    const identifiers = await Promise.all(arr.map(fetchIdentifier));
    return identifiers;
  };

  const fetchRecipientData = async (identifiers: string[]) => {
    const recipientSarcophagi = await Promise.all(
      identifiers.map(async (identifier) => {
        return {
          ...(await sarcophagusContract?.sarcophagus(Buffer.from(ethers.utils.arrayify(identifier)))),
          AssetDoubleHash: identifier,
        };
      })
    );
    return recipientSarcophagi;
  };

  const loadRecipientSarcophagi = async () => {
    try {
      const count = await fetchRecipientCount();
      // if count is 0 do nothing and return
      if (count.isZero()) {
        return;
      }
      const identifiers = await fetchRecipientIdentifiers(count);
      const sarcophagiData = await fetchRecipientData(identifiers);
      setAllRecipientSarcophagi(sarcophagiData);
    } catch (error) {
      console.error("Recipient, Sarcophagus load error:", error);
    }
  };

  return { allRecipientSarcophagi, loadRecipientSarcophagi };
};

export default useRecipient;

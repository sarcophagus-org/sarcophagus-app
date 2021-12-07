import { useState } from "react";
import { toast } from "react-toastify";
import { useTransaction } from "../BlockChain/useTransaction";
import { IBlockChainStore } from "../BlockChain/types/contract.interfaces";
import { useBlockChainStore } from "../BlockChain";
import {
  AccuseSarcophagus,
  BurySarcophagus,
  CancelSarcophagus,
  CleanSarcophagus,
  CreateSarcophagus,
  RewrapSarcophagus,
  UpdateSarcophagus,
} from "./sarcophagi.interfaces";
import { CreatedSarcophagusData, SarcophagusStatus } from "../../types/sarcophagusTomb";

const useContractMethods = () => {
  const { contractCall } = useTransaction();
  const { sarcophagusContract }: IBlockChainStore = useBlockChainStore();
  const [createdSarcophagusData, setCreatedSarcophagusData] = useState<CreatedSarcophagusData | null>(null);
  const [pendingSarcophagi, setPendingSarcophagi] = useState<any[]>([]);

  const createSarcophagus: CreateSarcophagus = (
    name,
    archaeologist,
    resurrectionTimeUTC,
    storageFee,
    diggingFeeBN,
    bountyBN,
    assetDoubleHash,
    recipientPublicKeyBA,
    doubleEncryptedFile,
    successRefresh,
    redirect
  ) => {
    try {
      if (!sarcophagusContract) return;
      const broadcastCallback = () => {
        redirect();
        // saves pending data
        const sarcophagusCreateData = {
          assetDoubleHash,
          name,
          doubleEncryptedFile,
          endpoint: archaeologist.endpoint,
        };
        setCreatedSarcophagusData(sarcophagusCreateData);
        setPendingSarcophagi([sarcophagusCreateData]);
      };

      const successCallback = ({ transactionHash }: { transactionHash: string }) => {
        // adds completed transaction hash to create data
        setCreatedSarcophagusData((data: any) => ({ ...data, txReceipt: transactionHash }));
        setPendingSarcophagi([]);
        console.info("CREATE TX HASH", transactionHash);
        // redirects back to tomb
        successRefresh();
      };

      // make the contract call
      contractCall(
        () =>
          sarcophagusContract.createSarcophagus(
            name,
            archaeologist.address,
            resurrectionTimeUTC,
            storageFee,
            diggingFeeBN,
            bountyBN,
            assetDoubleHash,
            recipientPublicKeyBA
          ),
        SarcophagusStatus.Mining,
        broadcastCallback,
        "Transaction failed...",
        "Transaction successful",
        undefined,
        successCallback
      );
    } catch (e: any) {
      if (e?.code === 4001) {
        toast.error("Transaction Rejected");
      } else if (e?.error?.code === -32603) {
        if (e?.error?.message === "execution reverted: revert resurrection time must be in the future") {
          toast.error("Resurrection time must be in the future");
        }
        if (e?.error?.message === "execution reverted: ERC20: transfer amount exceeds balance") {
          toast.error("Sarco balance too low to execute transaction");
        }
      } else {
        toast.error("There was a problem creating sarcophagus");
        console.error("There was a problem creating sarcophagus:", e);
      }
    }
  };

  const updateSarcophagus: UpdateSarcophagus = async (setStatus, successRefresh) => {
    try {
      if (!sarcophagusContract || !createdSarcophagusData) return;
      let { newPublicKey, assetDoubleHash, assetId, V, R, S } = createdSarcophagusData;
      const buffedNewPublicKey = Buffer.from(newPublicKey || "", "base64");

      const broadcastCallback = () => {
        setStatus(SarcophagusStatus.Mining);
      };

      const successCallback = async ({ transactionHash }: { transactionHash: string }) => {
        console.info("UPDATE TX HASH", transactionHash);
        setStatus(SarcophagusStatus.Active);
        setCreatedSarcophagusData(null);
        successRefresh();
      };

      contractCall(
        () => sarcophagusContract.updateSarcophagus(buffedNewPublicKey, assetDoubleHash, assetId, V, R, S),
        SarcophagusStatus.Mining,
        broadcastCallback,
        "Transaction failed...",
        "Transaction successful",
        undefined,
        successCallback
      );
    } catch (e: any) {
      if (e?.code === 4001) {
        toast.error("Transaction Rejected");
      } else if (e?.error?.message === "execution reverted: public key already used") {
        toast.error("Public key already used");
        setStatus(SarcophagusStatus.PublicKeyUsed);
      } else {
        toast.error("There was a problem updating sarcophagus");
        console.error("There was a problem updating sarcophagus", e);
      }
    }
  };

  /**
   * @function rewrapSarcophagus
   * @description sends transaction to rewrap sarcophagus; pushing the resurrection data by given time in the future
   * @param buffedAssetDoubleHash AssetDoubleHash that has been buffed
   * @param resurrectionTimeBN Resurrection time UTC (seconds) as a big number
   * @param diggingFeeBN Digging fees of sarcophagus's archaeologist
   * @param bountyBN Bounty fee of sarcophagus's archaeologist
   * @param setStatus passed to allow updating the sarcophagus's status to mining state.
   * @returns
   */
  const rewrapSarcophagus: RewrapSarcophagus = (
    buffedAssetDoubleHash,
    resurrectionTimeBN,
    diggingFeeBN,
    bountyBN,
    setStatus,
    successRefresh
  ) => {
    try {
      if (!sarcophagusContract) return;

      // while broadcasting
      const broadcastCallback = () => {
        setStatus(SarcophagusStatus.Mining);
      };

      // when transaction is successfull
      const successCallback = ({ transactionHash }: any) => {
        console.info("REWRAP TX HASH", transactionHash);
        successRefresh();
      };

      contractCall(
        () =>
          sarcophagusContract.rewrapSarcophagus(
            buffedAssetDoubleHash,
            resurrectionTimeBN,
            diggingFeeBN,
            bountyBN
          ),
        SarcophagusStatus.Mining,
        broadcastCallback,
        "Transaction failed...",
        "Transaction successful",
        undefined,
        successCallback
      );
    } catch (e: any) {
      if (e?.code === 4001) {
        toast.error("Transaction Rejected");
      } else if (e?.error?.code === -32603) {
        if (e?.error?.message === "execution reverted: revert resurrection time must be in the future") {
          toast.error("Resurrection time must be in the future");
        }
        if (e?.error?.message === "execution reverted: ERC20: transfer amount exceeds balance") {
          toast.error("Sarco balance too low to execute transaction");
        }
      } else {
        toast.error("There was a problem rewrapping sarcophagus");
        console.error("There was a problem rewrapping sarcophagus", e);
      }
    }
  };

  const burySarcophagus: BurySarcophagus = (buffedAssetDoubleHash, setStatus, successRefresh) => {
    try {
      if (!sarcophagusContract) return;

      const broadcastCallback = () => {
        setStatus(SarcophagusStatus.Mining);
      };

      const successCallback = ({ transactionHash }: any) => {
        console.info("BURY TX HASH", transactionHash);
        successRefresh();
      };

      contractCall(
        () => sarcophagusContract.burySarcophagus(buffedAssetDoubleHash),
        SarcophagusStatus.Mining,
        broadcastCallback,
        "Transaction failed...",
        "Transaction successful",
        undefined,
        successCallback
      );
    } catch (e: any) {
      if (e?.code === 4001) {
        toast.error("Transaction Rejected");
      } else {
        toast.error("There was a problem buring sarcophagus");
        console.error("There was a problem buring sarcophagus", e);
      }
    }
  };

  const cleanSarcophagus: CleanSarcophagus = (
    buffedAssetDoubleHash,
    archaeologist,
    setStatus,
    successRefresh
  ) => {
    try {
      if (!sarcophagusContract) return;
      const broadcastCallback = () => {
        setStatus(SarcophagusStatus.Mining);
      };

      const successCallback = ({ transactionHash }: any) => {
        console.info("CLEAN TX HASH", transactionHash);
        successRefresh();
      };

      contractCall(
        () => sarcophagusContract.cleanUpSarcophagus(buffedAssetDoubleHash, archaeologist),
        SarcophagusStatus.Mining,
        broadcastCallback,
        "Transaction failed...",
        "Transaction successful",
        undefined,
        successCallback
      );
    } catch (e: any) {
      if (e?.code === 4001) {
        toast.error("Transaction Rejected");
      } else {
        toast.error("There was a problem cleaning sarcophagus");
        console.error("There was a problem cleaning sarcophagus", e);
      }
    }
  };

  const cancelSarcophagus: CancelSarcophagus = (buffedAssetDoubleHash, setStatus, successCallback) => {
    try {
      if (!sarcophagusContract) return;
      const broadcastCallback = () => {
        setStatus(SarcophagusStatus.Mining);
      };

      contractCall(
        () => sarcophagusContract.cancelSarcophagus(buffedAssetDoubleHash),
        SarcophagusStatus.Mining,
        broadcastCallback,
        "Transaction failed...",
        "Transaction successful",
        undefined,
        successCallback
      );
    } catch (e: any) {
      if (e?.code === 4001) {
        toast.error("Transaction Rejected");
      } else {
        toast.error("There was a problem canceling sarcophagus");
        console.error("There was a problem canceling sarcophagus", e);
      }
    }
    return false;
  };

  const accuseArchaeologist: AccuseSarcophagus = (identifierUint, singleHashUint, address, successCallback) => {
    try {
      if (!sarcophagusContract) return;

      const broadcastCallback = () => {
        toast.dark("Checking accusal", { toastId: "accusalPending" });
      };

      contractCall(
        () => sarcophagusContract.accuseArchaeologist(identifierUint, singleHashUint, address),
        "Checking accusal",
        broadcastCallback,
        "The accusal was unsuccessful",
        "The accusal was successful",
        undefined,
        successCallback
      );
    } catch (e: any) {
      if (e?.code === 4001) {
        toast.error("Transaction Rejected");
      } else {
        console.error("Accused Unsuccessful: ", e);
      }
    }
  };

  return {
    createSarcophagus,
    updateSarcophagus,
    cancelSarcophagus,
    cleanSarcophagus,
    burySarcophagus,
    rewrapSarcophagus,
    accuseArchaeologist,
    createdSarcophagusData,
    setCreatedSarcophagusData,
    pendingSarcophagi,
  };
};

export default useContractMethods;

import { BigNumber, utils } from "ethers";
import { useState } from "react";
import { toast } from "react-toastify";
import { useTransaction } from "../BlockChain/useTransaction";
import { IArchaeologists } from "../Archaeologist/archaeologist.interfaces";
import { SarcophagusStatus } from "../../components/SarcophagusTomb/tomb.enums";
import { formatCustomResurrectionTime } from "../../utils/datetime";
import { initialValues } from "../../components/Accuse/initialValues";
import { ISarcophagusContract } from "../BlockChain/types/contract.interfaces";
import { ISarcophagus } from "./sarcophagi.interfaces";


// todo this whole file needs to be reimagined
const useContractMethods = (sarcophagusContract: ISarcophagusContract) => {
  const { contractCall } = useTransaction();
  const [createData, setCreateData] = useState<any>(null);
  const [pendingSarcophagi, setPendingSarcophagi] = useState<any[]>([]);

  const createSarcophagus = async (
    sarcophagusName: string,
    archaeologist: IArchaeologists,
    resurrectionTimeUTC: BigNumber,
    storageFeeBN: BigNumber,
    diggingFeeBN: BigNumber,
    bountyBN: BigNumber,
    assetDoubleHash: BigNumber,
    recipientPublicKeyBA: BigNumber,
    doubleEncryptedFile: BigNumber,
    history: any,
    refresh: any
  ) => {
    try {
      const broadcastCallback = () => {
        // saves pending data
        const sarcophagusCreateData = {
          assetDoubleHash,
          sarcophagusName,
          doubleEncryptedFile,
          endpoint: archaeologist.endpoint,
          txReceipt: null,
        };
        setCreateData(sarcophagusCreateData);
        setPendingSarcophagi([sarcophagusCreateData]);
        history.replace("/");
      };

      const successCallback = ({ transactionHash }: { transactionHash: string }) => {
        // adds completed transaction hash to create data
        // redirects back to tomb
        setCreateData((data: any) => ({ ...data, txReceipt: transactionHash }));
        setPendingSarcophagi([]);
        console.info("CREATE TX HASH", transactionHash);
        refresh();
      };

      // make the contract call
      contractCall(
        () =>
          sarcophagusContract.createSarcophagus(
            sarcophagusName,
            archaeologist.address,
            resurrectionTimeUTC,
            storageFeeBN,
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

  const updateSarcophagus = (setCurrentStatus: (v: SarcophagusStatus) => void, refresh: () => void, toggle: () => void, setError: any) => {
    try {
      let { NewPublicKey, AssetDoubleHash, AssetId, V, R, S } = createData;
      NewPublicKey = Buffer.from(NewPublicKey, "base64");

      const broadcastCallback = () => {
        setCurrentStatus(SarcophagusStatus.Mining);
        toggle();
      };

      const successCallback = async ({ transactionHash }: {transactionHash: string}) => {
        refresh();
        console.info("UPDATE TX HASH", transactionHash);
        setCurrentStatus(SarcophagusStatus.Active);
        setCreateData(null);
      };

      contractCall(
        () => sarcophagusContract.updateSarcophagus(NewPublicKey, AssetDoubleHash, AssetId, V, R, S),
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
        setCurrentStatus(SarcophagusStatus.Default); // todo this needs to show an error
        setError("Public key already used");
      } else {
        toast.error("There was a problem updating sarcophagus");
        console.error("There was a problem updating sarcophagus", e);
      }
    }
  };

  const rewrapSarcophagus = (sarcophagus: ISarcophagus, values: any, refresh: any, toggle: any, setCurrentStatus: any, refreshTimers: any) => {
    try {
      const { AssetDoubleHash } = sarcophagus;
      const { bounty, diggingFee, resurrectionTime, custom } = values;

      const doubleHashUint = Buffer.from(utils.arrayify(AssetDoubleHash));

      let resurrectionTimeUTC = custom
        ? formatCustomResurrectionTime(resurrectionTime)
        : BigNumber.from(resurrectionTime / 1000);

      const diggingFeeBN = utils.parseEther(diggingFee.toString());
      const bountyBN = utils.parseEther(bounty.toString());

      const broadcastCallback = () => {
        setCurrentStatus(SarcophagusStatus.Mining);
        toggle();
      };

      const successCallback = ({ transactionHash }: any) => {
        console.info("REWRAP TX HASH", transactionHash);
        refresh();
        refreshTimers();
      };

      contractCall(
        () => sarcophagusContract.rewrapSarcophagus(doubleHashUint, resurrectionTimeUTC, diggingFeeBN, bountyBN),
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

  const burySarcophagus = async (sarcophagus: any, setCurrentStatus: any, refresh: any, toggle: any, refreshTimers: any) => {
    try {
      const { AssetDoubleHash } = sarcophagus;
      const doubleHashUint = Buffer.from(utils.arrayify(AssetDoubleHash));

      const broadcastCallback = () => {
        toggle();
        setCurrentStatus(SarcophagusStatus.Mining);
      };

      const successCallback = ({ transactionHash }: any) => {
        console.info("BURY TX HASH", transactionHash);
        refresh();
        refreshTimers();
      };

      contractCall(
        () => sarcophagusContract.burySarcophagus(doubleHashUint),
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

  const cleanSarcophagus = async (sarcophagus: any, setCurrentStatus: any, toggle: any, refresh: any, refreshTimers: any) => {
    try {
      const { AssetDoubleHash, archaeologist } = sarcophagus;
      const doubleHashUint = Buffer.from(utils.arrayify(AssetDoubleHash));

      const broadcastCallback = () => {
        setCurrentStatus(SarcophagusStatus.Mining);
        toggle();
      };

      const successCallback = ({ transactionHash }: any) => {
        console.info("CLEAN TX HASH", transactionHash);
        refresh();
        refreshTimers();
      };

      contractCall(
        () => sarcophagusContract.cleanUpSarcophagus(doubleHashUint, archaeologist),
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

  const cancelSarcophagus = async (sarcophagus: any, setCurrentStatus: any, toggle: any, refresh: any, refreshTimers: any) => {
    try {
      const { AssetDoubleHash } = sarcophagus;
      const doubleHashUint = Buffer.from(utils.arrayify(AssetDoubleHash));
      const broadcastCallback = () => {
        setCurrentStatus(SarcophagusStatus.Mining);
        toggle();
      };

      const successCallback = ({ transactionHash }: any) => {
        console.info("CANCEL TX HASH", transactionHash);
        refresh();
        refreshTimers();
      };

      contractCall(
        () => sarcophagusContract.cancelSarcophagus(doubleHashUint),
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
  };

  const accuseArchaeologist = async (values: any, resetForm: any) => {
    try {
      const { singleHash, identifier, address } = values;
      const identifierUint = Buffer.from(utils.arrayify(identifier));
      const singleHashUint = Buffer.from(utils.arrayify(singleHash));

      const broadcastCallback = () => {
        toast.dark("Checking accusal", { toastId: "accusalPending" });
      };

      const successCallback = ({ transactionHash }: any) => {
        console.info("Accuse TX HASH", transactionHash);
        resetForm(initialValues);
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
    createData,
    setCreateData,
    pendingSarcophagi,
  };
};

export default useContractMethods;

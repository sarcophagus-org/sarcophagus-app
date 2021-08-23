import { BigNumber, utils } from "ethers";
import { useState } from "react";
import { toast } from "react-toastify";
import {
  ACCUSAL_SUCCESSFUL,
  ACCUSAL_UNSUCCESSFUL,
  STATUSES,
  TRANSACTION_REJECTED,
} from "../../../constants";
import { formatCustomResurrectionTime } from "../../../utils/datetime";
import { initialValues } from "../../Accuse/initialValues";
import { useTransaction } from "../BlockChainContext/transaction";

const useSarcophagus = (sarcophagusContract) => {
  const { contractCall } = useTransaction();
  const [createData, setCreateData] = useState(null);
  const [pendingSarcophagi, setPendingSarcophagi] = useState([]);

  const createSarcophagus = async (
    sarcophagusName,
    archaeologist,
    resurrectionTimeUTC,
    storageFeeBN,
    diggingFeeBN,
    bountyBN,
    assetDoubleHash,
    recipientPublicKeyBA,
    doubleEncryptedFile,
    history,
    refresh
  ) => {
    try {
      const pendingCallback = () => {
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

      const successCallback = ({ transactionHash }) => {
        // adds completed transaction hash to create data
        // redirects back to tomb
        setCreateData((data) => ({ ...data, txReceipt: transactionHash }));
        setPendingSarcophagi([]);
        console.info("CREATE TX HASH", transactionHash);
        refresh();
      };

      // make the contract call
      contractCall(
        sarcophagusContract.createSarcophagus,
        [
          sarcophagusName,
          archaeologist.address,
          resurrectionTimeUTC,
          storageFeeBN,
          diggingFeeBN,
          bountyBN,
          assetDoubleHash,
          recipientPublicKeyBA,
        ],
        STATUSES.TRANSACTION_MINING_IN_PROGRESS,
        pendingCallback,
        "Transaction failed...",
        "Transaction successful",
        successCallback
      );
    } catch (e) {
      if (e?.code === 4001) {
        toast.error(TRANSACTION_REJECTED);
      } else if (e?.error?.code === -32603) {
        if (
          e?.error?.message ===
          "execution reverted: revert resurrection time must be in the future"
        ) {
          toast.error("Resurrection time must be in the future");
        }
        if (
          e?.error?.message ===
          "execution reverted: ERC20: transfer amount exceeds balance"
        ) {
          toast.error("Sarco balance too low to execute transaction");
        }
      } else {
        toast.error("There was a problem creating sarcophagus");
        console.error("There was a problem creating sarcophagus:", e);
      }
    }
  };

  const updateSarcophagus = (setCurrentStatus, refresh, toggle, setError) => {
    try {
      let { NewPublicKey, AssetDoubleHash, AssetId, V, R, S } = createData;
      NewPublicKey = Buffer.from(NewPublicKey, "base64");

      const pendingCallback = () => {
        setCurrentStatus(STATUSES.TRANSACTION_MINING_IN_PROGRESS);
        toggle();
      };

      const successCallback = async ({ transactionHash }) => {
        refresh();
        console.info("UPDATE TX HASH", transactionHash);
        setCurrentStatus(STATUSES.ACTIVE);
        setCreateData(null)
      };

      contractCall(
        sarcophagusContract.updateSarcophagus,
        [NewPublicKey, AssetDoubleHash, AssetId, V, R, S],
        STATUSES.TRANSACTION_MINING_IN_PROGRESS,
        pendingCallback,
        "Transaction failed...",
        "Transaction successful",
        successCallback
      );
    } catch (e) {
      if (e?.code === 4001) {
        toast.error(TRANSACTION_REJECTED);
      } else if (
        e?.error?.message === "execution reverted: public key already used"
      ) {
        toast.error("Public key already used");
        setCurrentStatus("");
        setError("Public key already used");
      } else {
        toast.error("There was a problem updating sarcophagus");
        console.error("There was a problem updating sarcophagus", e);
      }
    }
  };

  const rewrapSarcophagus = (
    sarcophagus,
    values,
    refresh,
    toggle,
    setCurrentStatus,
    refreshTimers
  ) => {
    try {
      const { AssetDoubleHash } = sarcophagus;
      const { bounty, diggingFee, resurrectionTime, custom } = values;

      const doubleHashUint = Buffer.from(utils.arrayify(AssetDoubleHash));

      let resurrectionTimeUTC = custom
        ? formatCustomResurrectionTime(resurrectionTime)
        : BigNumber.from(resurrectionTime / 1000);

      const diggingFeeBN = utils.parseEther(diggingFee.toString());
      const bountyBN = utils.parseEther(bounty.toString());

      const pendingCallback = () => {
        setCurrentStatus(STATUSES.TRANSACTION_MINING_IN_PROGRESS);
        toggle();
      };

      const successCallback = ({ transactionHash }) => {
        console.info("REWRAP TX HASH", transactionHash);
        refresh();
        refreshTimers();
      };
      setCurrentStatus(STATUSES.TRANSACTION_MINING_IN_PROGRESS);
      contractCall(
        sarcophagusContract.rewrapSarcophagus,
        [doubleHashUint, resurrectionTimeUTC, diggingFeeBN, bountyBN],
        STATUSES.TRANSACTION_MINING_IN_PROGRESS,
        pendingCallback,
        "Transaction failed...",
        "Transaction successful",
        successCallback
      );
    } catch (e) {
      if (e?.code === 4001) {
        toast.error(TRANSACTION_REJECTED);
      } else if (e?.error?.code === -32603) {
        if (
          e?.error?.message ===
          "execution reverted: revert resurrection time must be in the future"
        ) {
          toast.error("Resurrection time must be in the future");
        }
        if (
          e?.error?.message ===
          "execution reverted: ERC20: transfer amount exceeds balance"
        ) {
          toast.error("Sarco balance too low to execute transaction");
        }
      } else {
        toast.error("There was a problem rewrapping sarcophagus");
        console.error("There was a problem rewrapping sarcophagus", e);
      }
    }
  };

  const burySarcophagus = async (
    sarcophagus,
    setCurrentStatus,
    refresh,
    toggle,
    refreshTimers
  ) => {
    try {
      const { AssetDoubleHash } = sarcophagus;
      const doubleHashUint = Buffer.from(utils.arrayify(AssetDoubleHash));

      const pendingCallback = () => {
        toggle();
        setCurrentStatus(STATUSES.TRANSACTION_MINING_IN_PROGRESS);
      };

      const successCallback = ({ transactionHash }) => {
        console.info("BURY TX HASH", transactionHash);
        refresh();
        refreshTimers();
      };

      contractCall(
        sarcophagusContract.burySarcophagus,
        [doubleHashUint],
        STATUSES.TRANSACTION_MINING_IN_PROGRESS,
        pendingCallback,
        "Transaction failed...",
        "Transaction successful",
        successCallback
      );
    } catch (e) {
      if (e?.code === 4001) {
        toast.error(TRANSACTION_REJECTED);
      } else {
        toast.error("There was a problem buring sarcophagus");
        console.error("There was a problem buring sarcophagus", e);
      }
    }
  };

  const cleanSarcophagus = async (
    sarcophagus,
    setCurrentStatus,
    toggle,
    refresh,
    refreshTimers
  ) => {
    try {
      const { AssetDoubleHash, archaeologist } = sarcophagus;
      const doubleHashUint = Buffer.from(utils.arrayify(AssetDoubleHash));

      const pendingCallback = () => {
        setCurrentStatus(STATUSES.TRANSACTION_MINING_IN_PROGRESS);
        toggle();
      };

      const successCallback = ({ transactionHash }) => {
        console.info("CLEAN TX HASH", transactionHash);
        refresh();
        refreshTimers();
      };

      contractCall(
        sarcophagusContract.cleanUpSarcophagus,
        [doubleHashUint, archaeologist],
        STATUSES.TRANSACTION_MINING_IN_PROGRESS,
        pendingCallback,
        "Transaction failed...",
        "Transaction successful",
        successCallback
      );
    } catch (e) {
      if (e?.code === 4001) {
        toast.error(TRANSACTION_REJECTED);
      } else {
        toast.error("There was a problem cleaning sarcophagus");
        console.error("There was a problem cleaning sarcophagus", e);
      }
    }
  };

  const cancelSarcophagus = async (
    sarcophagus,
    setCurrentStatus,
    toggle,
    refresh,
    refreshTimers
  ) => {
    try {
      const { AssetDoubleHash } = sarcophagus;
      const doubleHashUint = Buffer.from(utils.arrayify(AssetDoubleHash));
      const pendingCallback = () => {
        setCurrentStatus(STATUSES.TRANSACTION_MINING_IN_PROGRESS);
        toggle();
      };

      const successCallback = ({ transactionHash }) => {
        console.info("CANCEL TX HASH", transactionHash);
        refresh();
        refreshTimers();
      };

      contractCall(
        sarcophagusContract.cancelSarcophagus,
        [doubleHashUint],
        STATUSES.TRANSACTION_MINING_IN_PROGRESS,
        pendingCallback,
        "Transaction failed...",
        "Transaction successful",
        successCallback
      );
    } catch (e) {
      if (e?.code === 4001) {
        toast.error(TRANSACTION_REJECTED);
      } else {
        toast.error("There was a problem canceling sarcophagus");
        console.error("There was a problem canceling sarcophagus", e);
      }
    }
  };

  const accuseArchaeologist = async (values, resetForm) => {
    try {
      const { singleHash, identifier, address } = values;
      const identifierUint = Buffer.from(utils.arrayify(identifier));
      const singleHashUint = Buffer.from(utils.arrayify(singleHash));

      const pendingCallback = () => {
        toast.dark("Checking accusal", { toastId: "accusalPending" });
      };

      const successCallback = ({ transactionHash }) => {
        console.info("Accuse TX HASH", transactionHash);
        resetForm(initialValues);
      };

      contractCall(
        sarcophagusContract.accuseArchaeologist,
        [identifierUint, singleHashUint, address],
        "Checking accusal",
        pendingCallback,
        ACCUSAL_UNSUCCESSFUL,
        ACCUSAL_SUCCESSFUL,
        successCallback
      );
    } catch (e) {
      if (e?.code === 4001) {
        toast.error(TRANSACTION_REJECTED);
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

export { useSarcophagus };

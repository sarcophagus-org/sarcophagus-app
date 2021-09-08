import { useEffect, useState } from "react";
import { isTimePast } from "../../../utils/datetime";
import { ERROR, FILE_MINING, STATUSES } from "../../../constants";
import { toast } from "react-toastify";
import { useSarcophagiData } from "../../Context/SarcophagiContext";
import useArchFileSend, { SEND_STATUS_OPTIONS } from "./useSendFile";

const useCheckStatus = (sarcophagus, refresh) => {
  const [currentStatus, setCurrentStatus] = useState(STATUSES.CHECKING_STATUS);
  const [error, setError] = useState(false);
  const { createData, setCreateData } = useSarcophagiData(null);

  const { sendStatus, sendFileToArchService } = useArchFileSend(
    createData,
    setCreateData,
    sarcophagus
  );

  useEffect(() => {
    if (error) {
      setCurrentStatus(false);
    }
  }, [error]);

  useEffect(() => {
    if (currentStatus === STATUSES.ARWEAVE_PENDING) {
      window.addEventListener("beforeunload", alertUser);
    } else {
      window.removeEventListener("beforeunload", alertUser);
    }
    return () => window.removeEventListener("beforeunload", alertUser);
  }, [currentStatus]);

  const alertUser = (event) => {
    const message =
      "Leaving before Sarcophagus update is signed, will result in loss of sarcophagus";
    toast.error(message, { autoClose: 2000, position: "top-center" });
    event.preventDefault();
    event.returnValue = message;
    return message;
  };

  const checkStatus = async (sarcophagus) => {
    // first checks mining status / removes errors for UI purposes
    if (currentStatus === STATUSES.TRANSACTION_MINING_IN_PROGRESS) {
      setError(false);
      return;
    }

    // checks if window for archaeologist wrapping has passed, if so clean is shown
    if (sarcophagus?.assetId) {
      if (
        isTimePast(sarcophagus.resurrectionTime, sarcophagus.resurrectionWindow)
      ) {
        setCurrentStatus(STATUSES.WINDOW_CLOSED);
        return;
      }
      // checks for archaeologist unwrapping update
      if (
        sarcophagus.resurrectionTime.toNumber() * 1000 - Date.now().valueOf() <=
        0
      ) {
        setTimeout(() => {
          refresh();
        }, 3000);
        return;
      }
      // check for state of 2 on sarcophagus for unwrapping should not be here
      if (sarcophagus?.state === 2) {
        console.error("Should never see this");
        return;
      }
      // if no assetId on sarcophagus, mark as finished
      if (
        sarcophagus?.assetId &&
        sarcophagus?.privateKey ===
          "0x0000000000000000000000000000000000000000000000000000000000000000"
      ) {
        setError(false);
        setCurrentStatus(STATUSES.ACTIVE);
        return;
      }
    }
    if (!!createData) {
      if (currentStatus === STATUSES.ACTIVE) return;
      switch (sendStatus) {
        case SEND_STATUS_OPTIONS.Sending:
          break;
        case SEND_STATUS_OPTIONS.Success:
          toast.dismiss("fileMining");
          setCurrentStatus(STATUSES.SARCOPHAGUS_AWAIT_SIGN);
          break;
        case SEND_STATUS_OPTIONS.Mining:
          setCurrentStatus(STATUSES.ARWEAVE_PENDING);
          toast.dark(FILE_MINING, { toastId: "fileMining", autoClose: false });
          break;
        case SEND_STATUS_OPTIONS.Failed:
          toast.dismiss("fileMining");
          setError(ERROR.ARWEAVE_FILE_ERROR);
          break;
        default:
          if (currentStatus !== STATUSES.ARWEAVE_STARTED) {
            setCurrentStatus(STATUSES.ARWEAVE_STARTED);
            sendFileToArchService();
          }
      }
    }
    if (!sarcophagus.assetId && !createData) {
      if (currentStatus === STATUSES.TRANSACTION_MINING_IN_PROGRESS || currentStatus === STATUSES.ACTIVE) return;
      setError("Unknown");
    }
  };

  return { currentStatus, setCurrentStatus, error, setError, checkStatus };
};

export default useCheckStatus;

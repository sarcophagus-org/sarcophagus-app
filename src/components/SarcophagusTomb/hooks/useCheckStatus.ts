import { useEffect, useState } from "react";
import { isTimePast } from "../../../utils/datetime";
import { ERROR, FILE_MINING, STATUSES } from "../../../constants";
import { toast } from "react-toastify";
import { useSarcophagiData } from "../../Context/SarcophagiContext";
import { ISarcophagus } from "../../../stores/Sarcophagi/sarcophagi.interfaces";
import { SarcophagusStatus } from "../tomb.enums";
// import useArchFileSend, { SEND_STATUS_OPTIONS } from "./useSendFile";

const useCheckStatus = (sarcophagus: ISarcophagus) => {
  const [sarcophagusStatus, setSarcophagusStatus] = useState<SarcophagusStatus | null>(
    SarcophagusStatus.Default
  );
  const [error, setError] = useState(false);
  const { createdSarcophagusData, setcreatedSarcophagusData } = useSarcophagiData();

  // const { sendStatus, sendFileToArchService } = useArchFileSend(
  //   setcreatedSarcophagusData,
  //   setcreatedSarcophagusData,
  //   sarcophagus
  // );

  useEffect(() => {
    if (error) {
      setSarcophagusStatus(null);
    }
  }, [error]);

  useEffect(() => {
    if (sarcophagusStatus === SarcophagusStatus.ArweaveMining) {
      window.addEventListener("beforeunload", alertUser);
    } else {
      window.removeEventListener("beforeunload", alertUser);
    }
    return () => window.removeEventListener("beforeunload", alertUser);
  }, [sarcophagusStatus]);

  const alertUser = (event: any) => {
    const message = "Leaving before Sarcophagus update is signed, will result in loss of sarcophagus";
    toast.error(message, { autoClose: 2000, position: "top-center" });
    event.preventDefault();
    event.returnValue = message;
    return message;
  };

  const checkStatus = async (sarcophagus: ISarcophagus) => {
    // first checks mining status / removes errors for UI purposes
    if (sarcophagusStatus === STATUSES.TRANSACTION_MINING_IN_PROGRESS) {
      setError(false);
      return;
    }

    // checks if window for archaeologist wrapping has passed, if so clean is shown
    if (sarcophagus?.assetId) {
      if (isTimePast(sarcophagus.resurrectionTime, sarcophagus.resurrectionWindow)) {
        setSarcophagusStatus(SarcophagusStatus.Closed);
        return;
      }
      // checks for archaeologist unwrapping update
      if (sarcophagus.resurrectionTime.toNumber() * 1000 - Date.now().valueOf() <= 0) {
        setTimeout(() => {
          // todo update this
          // refresh();
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
        sarcophagus?.privateKey === "0x0000000000000000000000000000000000000000000000000000000000000000"
      ) {
        setError(false);
        setSarcophagusStatus(SarcophagusStatus.Active);
        return;
      }
    }
    if (!!setcreatedSarcophagusData) {
      if (sarcophagusStatus === STATUSES.ACTIVE) return;
      // switch (sendStatus) {
      //   case SEND_STATUS_OPTIONS.Sending:
      //     break;
      //   case SEND_STATUS_OPTIONS.Success:
      //     toast.dismiss("fileMining");
      //     setSarcophagusStatus(STATUSES.SARCOPHAGUS_AWAIT_SIGN);
      //     break;
      //   case SEND_STATUS_OPTIONS.Mining:
      //     setSarcophagusStatus(STATUSES.ARWEAVE_PENDING);
      //     toast.dark(FILE_MINING, { toastId: "fileMining", autoClose: false });
      //     break;
      //   case SEND_STATUS_OPTIONS.Failed:
      //     toast.dismiss("fileMining");
      //     setError(ERROR.ARWEAVE_FILE_ERROR);
      //     break;
      //   default:
      //     if (sarcophagusStatus !== STATUSES.ARWEAVE_STARTED) {
      //       setSarcophagusStatus(STATUSES.ARWEAVE_STARTED);
      //       sendFileToArchService();
      //     }
      // }
    }
    if (!sarcophagus.assetId && !setcreatedSarcophagusData) {
      if (
        sarcophagusStatus === STATUSES.TRANSACTION_MINING_IN_PROGRESS ||
        sarcophagusStatus === STATUSES.ACTIVE
      )
        return;
      setError(true);
    }
  };

  return { sarcophagusStatus, setSarcophagusStatus, error, setError, checkStatus };
};

export default useCheckStatus;

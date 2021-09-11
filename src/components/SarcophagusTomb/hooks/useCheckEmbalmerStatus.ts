import { useEffect, useState } from "react";
import { isTimePast } from "../../../utils/datetime";
import { toast } from "react-toastify";
import { ISarcophagus } from "../../../stores/Sarcophagi/sarcophagi.interfaces";
import { SarcophagusStatus } from "../tomb.enums";
import { useSarcophagiStore } from "../../../stores/Sarcophagi";
// import useArchFileSend, { SEND_STATUS_OPTIONS } from "./useSendFile";

const useCheckStatus = (sarcophagus: ISarcophagus) => {
  const [sarcophagusStatus, setSarcophagusStatus] = useState<SarcophagusStatus>(SarcophagusStatus.Default);
  const { createdSarcophagusData, setCreatedSarcophagusData } = useSarcophagiStore();

  // const { sendStatus, sendFileToArchService } = useArchFileSend(
  //   setcreatedSarcophagusData,
  //   createdSarcophagusData,
  //   sarcophagus
  // );

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

  const checkStatus = async () => {
    switch (sarcophagusStatus) {
      // first checks mining status / removes errors for UI purposes
      case SarcophagusStatus.Mining: {
        return;
      }
      // watch active sarcophagus for changes
      case SarcophagusStatus.Active: {
        // checks if window for archaeologist wrapping has passed, if so clean is shown
        if (isTimePast(sarcophagus.resurrectionTime, sarcophagus.resurrectionWindow)) {
          setSarcophagusStatus(SarcophagusStatus.WindowClosed);
        }
        return;
      }
      case SarcophagusStatus.WindowClosed: {
        // checks for archaeologist unwrapping update
        if (sarcophagus.resurrectionTime.toNumber() * 1000 - Date.now().valueOf() <= 0) {
          setTimeout(() => {
            // todo update this
            // refresh();
          }, 3000);
        }
        return;
      }
      // no status is set; checks where in process sarcophagus is and sets status
      default: {
        // set sarcophagus in active state
        if (
          sarcophagus?.assetId &&
          sarcophagus?.privateKey === "0x0000000000000000000000000000000000000000000000000000000000000000"
        ) {
          setSarcophagusStatus(SarcophagusStatus.Active);
        }

        if (!!createdSarcophagusData) {
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
      }
    }

    if (!!createdSarcophagusData) {
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
  };

  const updateStatus = (status: SarcophagusStatus) => {
    setSarcophagusStatus(status)
  }
  return { sarcophagusStatus, updateStatus, checkStatus};
};

export default useCheckStatus;

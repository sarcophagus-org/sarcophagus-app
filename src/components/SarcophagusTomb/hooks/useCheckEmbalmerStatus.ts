import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSarcophagiStore } from "../../../stores/Sarcophagi";
import { SarcophagusStatus } from "../tomb.enums";
import { isTimePast } from "../tomb.utils";
import { Sarcophagus, SarcophagusStore } from "../../../stores/Sarcophagi/sarcophagi.interfaces";
import useArchaeologistService, { ServiceStatus } from "./useArchaeologistService";

const PRIVATE_KEY_DEFAULT = "0x0000000000000000000000000000000000000000000000000000000000000000";

const useCheckStatus = (sarcophagus: Sarcophagus) => {
  const [sarcophagusStatus, setSarcophagusStatus] = useState<SarcophagusStatus>(SarcophagusStatus.Default);
  const [stopChecking, setStopChecking] = useState(false);
  const { createdSarcophagusData, setCreatedSarcophagusData } = useSarcophagiStore();
  const sarcophagiStore: SarcophagusStore = useSarcophagiStore();

  const { sendStatus, sendFileToArchService, setSendStatus } = useArchaeologistService(
    createdSarcophagusData,
    setCreatedSarcophagusData
  );

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
      case SarcophagusStatus.ArweaveMining:
      case SarcophagusStatus.ArweaveUploading: {
        switch (sendStatus) {
          case ServiceStatus.Sending:
            return;
          case ServiceStatus.Success:
            toast.dismiss("fileMining");
            setSarcophagusStatus(SarcophagusStatus.Signing);
            return;
          case ServiceStatus.Mining:
            if(sarcophagusStatus === SarcophagusStatus.ArweaveMining) return
            setSarcophagusStatus(SarcophagusStatus.ArweaveMining);
            toast.dark(SarcophagusStatus.ArweaveMining, { toastId: "fileMining", autoClose: false });
            return;
          case ServiceStatus.Failed:
            toast.dismiss("fileMining");
            setSarcophagusStatus(SarcophagusStatus.ArweaveMiningError);
            return;
          default:
            return;
        }
      }
      case SarcophagusStatus.WindowClosed: {
        // checks for archaeologist unwrapping update
        if (sarcophagus.resurrectionTime.toNumber() * 1000 - Date.now().valueOf() <= 0) {
          setTimeout(() => {
            sarcophagiStore.loadSarcophagi();
          }, 3000);
        }
        return;
      }
      // no status is set;
      default: {
        if (stopChecking) return;
        // if sarcophagus is active
        if (sarcophagus?.assetId && sarcophagus?.privateKey === PRIVATE_KEY_DEFAULT) {
          setSarcophagusStatus(SarcophagusStatus.Active);
          return;
        }
        // if sarcophagus creation is in process
        if (createdSarcophagusData && !sendStatus) {
          setSarcophagusStatus(SarcophagusStatus.ArweaveUploading);
          setSendStatus(ServiceStatus.Sending)
          sendFileToArchService();
          return;
        }
        if (sarcophagusStatus === SarcophagusStatus.Default) {
          setSarcophagusStatus(SarcophagusStatus.Error);
          setStopChecking(true);
        }
      }
    }
  };

  const updateStatus = (status: SarcophagusStatus) => {
    setSarcophagusStatus(status);
  };
  return { sarcophagusStatus, updateStatus, checkStatus };
};

export default useCheckStatus;

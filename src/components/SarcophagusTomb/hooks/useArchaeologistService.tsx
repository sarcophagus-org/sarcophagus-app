import { ethers } from "ethers";
import { useCallback, useEffect, useState } from "react";
import { Sarcophagus } from "../../../stores/Sarcophagi/sarcophagi.interfaces";
import { CreatedSarcophagusData, ResponseFromArch, SarcophagusStatus, ServiceStatus } from "../../../types/sarcophagusTomb";
import { arweaveFileValid, initArweave } from "../tomb.utils";

const MINING_RETRIES = 5;
const VALIDATION_RETRIES = 50;
const MILLISECONDS_VALIDATE_CHECK = 500;
const MILLISECONDS_MINING_CHECK = 1500;
const MILLISECONDS_FILE_UPLOAD = 8000;

/**
 * @function useArchaeologistService (custom hook)
 * @param createdSarcophagusData new sarcophagus creation data
 * @param setCreatedSarcophagusData set action for creation data
 * @param sarcophagus current sarcophagus
 * @param setSarcophagusStatus  set action for sarcophagus status
 * @returns arweave send status
 */
const useArchaeologistService = (
  createdSarcophagusData: CreatedSarcophagusData,
  setCreatedSarcophagusData: React.Dispatch<React.SetStateAction<CreatedSarcophagusData | null>>,
  sarcophagus: Sarcophagus,
  setSarcophagusStatus: React.Dispatch<React.SetStateAction<SarcophagusStatus>>
) => {
  const [sendStatus, setSendStatus] = useState<ServiceStatus | null>(null);

  const validateFile = useCallback(
    async (assetId: string, doubleEncryptedFile: Uint8Array) => {
      let tries = VALIDATION_RETRIES;
      const Arweave = initArweave();
      const validateFileSent = async () => {
        const fileValid = await arweaveFileValid(Arweave, assetId, doubleEncryptedFile);
        if (!fileValid) {
          if (!tries) {
            setCreatedSarcophagusData(null);
            setSendStatus(ServiceStatus.Failed);
            return;
          }
          tries -= 1;
          setTimeout(() => validateFileSent(), MILLISECONDS_VALIDATE_CHECK);
          return;
        } else {
          setSendStatus(ServiceStatus.Success);
          return;
        }
      };
      setTimeout(() => validateFileSent(), MILLISECONDS_VALIDATE_CHECK);
    },
    [setCreatedSarcophagusData]
  );

  const checkArweaveMiningStatus = useCallback(
    async (responseFromArch: ResponseFromArch) => {
      const doubleEncryptedFile = createdSarcophagusData.doubleEncryptedFile as Uint8Array;
      const { NewPublicKey, AssetDoubleHash, AssetId, V, R, S } = responseFromArch;
      let errorRetries = MINING_RETRIES;

      const getArweaveMiningStatus = async () => {
        try {
          const Arweave = initArweave();
          const arweaveResponse = await Arweave.api.get(`tx/${AssetId}`);
          switch (arweaveResponse.status) {
            case 202:
            case 304: {
              console.log(`Sarcophagus is still mining`);
              setTimeout(() => getArweaveMiningStatus(), MILLISECONDS_MINING_CHECK);
              return;
            }
            case 200: {
              // Success
              await validateFile(AssetId, doubleEncryptedFile);
              setSendStatus(ServiceStatus.Success);
              setCreatedSarcophagusData({
                newPublicKey: NewPublicKey,
                assetDoubleHash: AssetDoubleHash,
                assetId: AssetId,
                V,
                R,
                S,
                doubleEncryptedFile,
              });
              return;
            }
            default: {
              // if status it not 200 or 202 there was an error
              if (errorRetries) {
                errorRetries -= 1;
                setTimeout(() => getArweaveMiningStatus(), MILLISECONDS_MINING_CHECK);
                return;
              }
              setSendStatus(ServiceStatus.Failed);
            }
          }
        } catch (err) {
          console.warn("🚀 ~ checkArweaveMiningStatus", err);
          setSendStatus(ServiceStatus.Failed);
        }
      };
      setTimeout(() => getArweaveMiningStatus(), MILLISECONDS_MINING_CHECK);
    },
    [createdSarcophagusData, setCreatedSarcophagusData, validateFile]
  );

  const encodeFile = (doubleEncryptedFile: Uint8Array): string => {
    const reducedString: any = [""].reduce.call(
      doubleEncryptedFile,
      (p: any, c: any): string => {
        return p + String.fromCharCode(c);
      },
      ""
    );
    const fileEncoded = btoa(reducedString);
    return fileEncoded;
  };

  const sendFile = useCallback(async () => {
    try {
      const archEndpoint = (createdSarcophagusData.endpoint as string) + "/file";
      const encodedFile = encodeFile(createdSarcophagusData.doubleEncryptedFile as Uint8Array);
      const responseFromArch = await fetch(archEndpoint, {
        method: "POST",
        body: JSON.stringify({ fileBytes: encodedFile }),
      });
      return responseFromArch;
    } catch (error) {
      return { error: error };
    }
  }, [createdSarcophagusData]);

  const sendFileToArchService = useCallback(
    async (tryAgain: boolean) => {
      const responseFromArch: any = await sendFile();
      if (!responseFromArch.ok || responseFromArch.error) {
        if (responseFromArch.status === 406 && tryAgain) {
          setTimeout(() => {
            setTimeout(() => sendFileToArchService(false), MILLISECONDS_FILE_UPLOAD);
          }, 5000);
          return
        }
        setSendStatus(ServiceStatus.Failed);
        setCreatedSarcophagusData(null);
        console.error("ResponseFromArch error", responseFromArch.error || responseFromArch);
        return;
      }
      const newSarcopagusArchData = await responseFromArch.json();
      setSendStatus(ServiceStatus.Mining);
      checkArweaveMiningStatus(newSarcopagusArchData);
      return;
    },
    [checkArweaveMiningStatus, sendFile, setCreatedSarcophagusData]
  );

  useEffect(() => {
    // if sarcophagus is sarcophagus that is being created.
    const isCreatedSarcophagus =
      createdSarcophagusData?.assetDoubleHash &&
      Buffer.from(createdSarcophagusData?.assetDoubleHash).equals(
        Buffer.from(ethers.utils.arrayify(sarcophagus.AssetDoubleHash))
      );

    if (createdSarcophagusData && !sendStatus && isCreatedSarcophagus) {
      setSarcophagusStatus(SarcophagusStatus.ArweaveUploading);
      setSendStatus(ServiceStatus.Sending);
      setTimeout(() => sendFileToArchService(true), MILLISECONDS_FILE_UPLOAD);
      return;
    }
  }, [createdSarcophagusData, sarcophagus, sendFileToArchService, sendStatus, setSarcophagusStatus]);

  return { sendStatus };
};

export default useArchaeologistService;

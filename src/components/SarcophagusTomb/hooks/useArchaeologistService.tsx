import { useState } from "react";
import { CreatedSarcophagusData, ResponseFromArch } from "../tomb.interfaces";
import { arweaveFileValid, initArweave } from "../tomb.utils";

export enum ServiceStatus {
  Sending = "File Sending",
  Failed = "There was a error sending file",
  Mining = "File is Mining",
  Success = "File has been mined",
}

const INTERVAL_LENGTH_SECONDS = 5

const useArchaeologistService = (
  createdSarcophagusData: CreatedSarcophagusData | null,
  setCreatedSarcophagusData: React.Dispatch<React.SetStateAction<CreatedSarcophagusData | null>>
) => {
  const [sendStatus, setSendStatus] = useState<ServiceStatus | null>(null);

  const validateFile = async (assetId?: string, doubleEncryptedFile?: any) => {
    let tries = 50;
    const validateFileSent = async () => {
      const Arweave = initArweave();
      const fileValid = await arweaveFileValid(Arweave, assetId, doubleEncryptedFile);
      if (!fileValid) {
        if (!tries) {
          setSendStatus(ServiceStatus.Failed);
          return;
        }
        tries -= 1;
        await validateFileSent();
      } else {
        setSendStatus(ServiceStatus.Success);
      }
    };
    validateFileSent()
  };

  const checkMiningStatus = async (responseFromArch: ResponseFromArch, doubleEncryptedFile?: Uint8Array) => {
    const { NewPublicKey, AssetDoubleHash, AssetId, V, R, S } = responseFromArch;
    let errorRetries = 2;
    const Arweave = initArweave();

    const checkMiningInterval = async () => {
      const arweaveResponse = await Arweave.api.get(`tx/${AssetId}`);
      switch (arweaveResponse.status) {
        case 202:
        case 304: {
          setSendStatus(ServiceStatus.Mining);
          console.log(`Sarcophagus is still mining`);
          setTimeout(async () => await checkMiningInterval(), INTERVAL_LENGTH_SECONDS * 1000);
          return;
        }
        case 200: {
          // Success
          validateFile(AssetId, doubleEncryptedFile);
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
          // If status it not 200 or 202 there was an error
          if (errorRetries) {
            errorRetries -= 1;
            setTimeout(async () => await checkMiningInterval(), INTERVAL_LENGTH_SECONDS * 1000);
          } else {
            setSendStatus(ServiceStatus.Failed);
          }
          return;
        }
      }
    };
    checkMiningInterval()
  };

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

  const sendFile = async (doubleEncryptedFile?: Uint8Array, endpoint?: string) => {
    const doubleEncryptedFileCheck = doubleEncryptedFile || new Uint8Array([]);
    try {
      const archEndpoint = endpoint + "/file";
      const encodedFile = encodeFile(doubleEncryptedFileCheck);
      const params = {
        method: "POST",
        body: JSON.stringify({ fileBytes: encodedFile }),
      };
      const responseFromArch = await fetch(archEndpoint, params);
      if (!responseFromArch.ok) {
        if (responseFromArch.status === 406) {
          return { error: "try again" };
        }
        return { error: responseFromArch };
      }
      const data = await responseFromArch.json();
      return data
    } catch (error) {
      return { error: error };
    }
  };

  const sendFileToArchService = async () => {
    let tries = 1;
    const sendFileAttempt = async () => {
      const responseFromArch = await sendFile(
        createdSarcophagusData?.doubleEncryptedFile,
        createdSarcophagusData?.endpoint
      );
      if (responseFromArch?.error) {
        if (responseFromArch?.error === "try again" && tries) {
          tries = 0;
          sendFileAttempt();
        } else {
          setSendStatus(ServiceStatus.Failed);
          console.error("ResponseFromArch error", responseFromArch.error);
        }
        return;
      }
      await checkMiningStatus(responseFromArch, createdSarcophagusData?.doubleEncryptedFile)
    };
    sendFileAttempt()
    return;
  };

  return { sendStatus, sendFileToArchService, setSendStatus };
};

export default useArchaeologistService;

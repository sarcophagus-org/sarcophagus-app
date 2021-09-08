import { useState } from "react";
import { ERROR, INTERVAL_LENGTH_SECONDS } from "../../../constants";
import { arweaveFileValid, initArweave } from "../../../utils/arweave";

export const SEND_STATUS_OPTIONS = {
  Sending: "File Sending",
  Failed: "There was a error sending file",
  Mining: "File is Mining",
  Success: "File has been mined",
};

const useArchFileSend = (createData, setCreateData, sarcophagus) => {
  const [sendStatus, setSendStatus] = useState(null);

  const encodeFile = (doubleEncryptedFile) => {
    const fileEncoded = btoa(
      [].reduce.call(
        doubleEncryptedFile,
        function (p, c) {
          return p + String.fromCharCode(c);
        },
        ""
      )
    );
    return fileEncoded;
  };

  const sendFile = async (doubleEncryptedFile, endpoint) => {
    try {
      const archEndpoint = endpoint + "/file";
      const encodedFile = encodeFile(doubleEncryptedFile);
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
      return await responseFromArch.json();
    } catch (error) {
      return { error: error };
    }
  };

  const sendFileToArchService = async () => {
    const { doubleEncryptedFile, endpoint } = createData;
    setSendStatus(SEND_STATUS_OPTIONS.Sending);
    let tries = 1;
    const sendFileAttempt = async () => {
      const responseFromArch = await sendFile(doubleEncryptedFile, endpoint);
      if (responseFromArch?.error) {
        if (responseFromArch?.error === "try again" && tries) {
          return;
        } else {
          setSendStatus(SEND_STATUS_OPTIONS.Failed);
          console.error("ResponseFromArch error", responseFromArch.error);
          return;
        }
      }
      const { NewPublicKey, AssetDoubleHash, AssetId, V, R, S } =
        await responseFromArch;
      const Arweave = initArweave();
      const fileValid = await arweaveFileValid(
        Arweave,
        AssetId,
        doubleEncryptedFile
      );
      if (!fileValid) {
        setSendStatus(SEND_STATUS_OPTIONS.Failed);
        return;
      }
      const storageObject = {
        NewPublicKey,
        AssetDoubleHash,
        V: V,
        R: R,
        S: S,
        AssetId: AssetId,
      };
      setCreateData(storageObject);
      checkMiningStatus(AssetId);
      return;
    };
    if (tries) {
      sendFileAttempt();
      tries = 0;
    }
  };

  const checkMiningStatus = async (AssetId) => {
    let errorRetries = 2;
    const Arweave = initArweave();

    const sendFileInterval = setInterval(async () => {
      const arweaveResponse = await Arweave.api.get(`tx/${AssetId}`);
      switch (arweaveResponse.status) {
        case 202:
          setSendStatus(SEND_STATUS_OPTIONS.Mining);
          console.log(`${sarcophagus.name}: still mining`);
          break;
        case 200:
          // Success
          setSendStatus(SEND_STATUS_OPTIONS.Success);
          clearInterval(sendFileInterval);
          break;
        default:
          // If status it not 200 or 202 there was an error
          if (errorRetries) {
            errorRetries -= 1;
            break;
          } else {
            console.error(ERROR.ARWEAVE_TRANSACTION_FAILED);
            setSendStatus(SEND_STATUS_OPTIONS.Failed);
            clearInterval(sendFileInterval);
            break;
          }
      }
    }, INTERVAL_LENGTH_SECONDS * 1000);
  };

  return { sendStatus, sendFileToArchService };
};

export default useArchFileSend;

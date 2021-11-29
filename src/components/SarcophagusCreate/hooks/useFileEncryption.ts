import { useState, useEffect, useCallback } from "react";
import { encrypt } from "ecies-geth";
import { utils } from "ethers";
import { hexToBytes } from "../../shared/components.utils";

const useFileEncryption = () => {
  const [file, setFile] = useState<File | null>(null);
  const [recipientPublicKey, setRecipientPublicKey] = useState<string | null>(null);
  const [fileByteArray, setFileByteArrayArray] = useState<ArrayBuffer | string | null>(null);
  const [fileEncryptedRecipient, setFileEncryptedRecipient] = useState<Buffer | null>(null);
  const [archaeologistPublicKey, setArchaeologistAddress] = useState<string>("");
  const [doubleEncryptedFile, setDoubleEncryptedFile] = useState<Buffer | null>(null);
  const [assetDoubleHash, setAssetDoubleHash] = useState<Uint8Array | null>(null);

  const firstEncryption = useCallback(async () => {
    try {
      let formattedPublicKey;
      if (recipientPublicKey?.substr(0, 4) !== "0x04") {
        formattedPublicKey = "0x04" + recipientPublicKey;
      }
      const keyToUse = formattedPublicKey ? formattedPublicKey : recipientPublicKey ? recipientPublicKey : "";
      const recipPubKeyBytes = hexToBytes(keyToUse, true).slice(1);
      const encrypted = await encrypt(recipPubKeyBytes, fileByteArray as Buffer);
      setFileEncryptedRecipient(encrypted);

      const hashedOnce = utils.keccak256(encrypted);
      const hashedTwice = utils.keccak256(hashedOnce);
      setAssetDoubleHash(utils.arrayify(hashedTwice));
    } catch (e) {
      console.error(e);
    }
  }, [recipientPublicKey, fileByteArray]);

  const secondEncryption = useCallback(async () => {
    try {
      const archPubKeyBytes = hexToBytes(archaeologistPublicKey, true);
      const encrypted = await encrypt(archPubKeyBytes, fileEncryptedRecipient as Buffer);
      setDoubleEncryptedFile(encrypted);
    } catch (e) {
      console.error(e);
    }
  }, [fileEncryptedRecipient, archaeologistPublicKey]);

  useEffect(() => {
    if (!file) return;
    try {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const result = e.target?.result;
        if (!result) return;
        setFileByteArrayArray(result);
      };
    } catch (e) {
      console.error(e);
    }
  }, [file]);

  useEffect(() => {
    if (!fileByteArray || !recipientPublicKey) return;
    firstEncryption();
  }, [fileByteArray, recipientPublicKey, firstEncryption]);

  useEffect(() => {
    if (!fileEncryptedRecipient || !archaeologistPublicKey) return;
    secondEncryption();
  }, [fileEncryptedRecipient, archaeologistPublicKey, secondEncryption]);

  return {
    file,
    setFile,
    setRecipientPublicKey,
    setArchaeologistAddress,
    doubleEncryptedFile,
    assetDoubleHash,
  };
};

export default useFileEncryption;

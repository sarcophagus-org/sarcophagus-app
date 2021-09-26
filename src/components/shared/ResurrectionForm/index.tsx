import { decrypt } from "ecies-geth";
import { Formik } from "formik";
import { toast } from "react-toastify";
import { utils } from "ethers";
import * as Yup from "yup";
import { arweaveFileValid, hexString, initArweave } from "../../SarcophagusTomb/tomb.utils";
import Button from "../../layout/Button";
import { ISarcophagus } from "../../../stores/Sarcophagi/sarcophagi.interfaces";
import { ResurrectionFormState } from "../../SarcophagusTomb/tomb.interfaces";
import RecipientPrivateKeyField from "./RecipientPrivateKeyField";
import { hexToBytes } from "../components.utils";

interface ResurrectionProps {
  sarcophagus: ISarcophagus;
  recipientPrivateKey?: string;
}

const initialValues = {
  recipientPrivateKey: "",
};

const validationSchema = (hasKeys: boolean) => {
  if (hasKeys) return;
  return Yup.object().shape({
    recipientPrivateKey: Yup.string()
      .test("required", "Recipient Private Key is required", (value) => !!value)
      .test("validDataHextString", "Please enter a valid private key", (value) => {
        let testValue;
        const str = value?.substr?.(0, 2);
        if (str !== "0x") testValue = "0x" + value;
        return utils.isHexString(testValue || value, 32);
      }),
  });
};

const ResurrectionForm = ({ sarcophagus, recipientPrivateKey }: ResurrectionProps) => {
  const handleDownload = async (values: ResurrectionFormState) => {
    try {
      let currentKey = hexString(recipientPrivateKey || values.recipientPrivateKey);
      let archPrivateKey = sarcophagus.privateKey;
      // retrieve arweave file
      const Arweave = initArweave();
      const doubleEncryptedData = await Arweave.transactions.getData(sarcophagus.assetId, { decode: true });
      // !todo make error display when invalid
      const isValid = await arweaveFileValid(Arweave, sarcophagus.assetId, doubleEncryptedData);
      if (!isValid) return;

      // decrypt with private key (NOTE this step may be done by service)
      const outerLayerDecrypted = await decrypt(
        hexToBytes(archPrivateKey, true).slice(1),
        Buffer.from(doubleEncryptedData)
      );

      // decrypt with public key
      const innerLayerDecrypted = await decrypt(
        hexToBytes(currentKey, true).slice(1),
        Buffer.from(outerLayerDecrypted)
      );
      let blob;
      try {
        // create blob using Buffer.from(bytes) and file type (older sarcophagi)
        const parsedFile = JSON.parse(innerLayerDecrypted.toString());
        const { type, data } = parsedFile;
        const parsedFileObject = Object.values<string>(data).join();
        const buffedData = Buffer.from(parsedFileObject);
        blob = new Blob([buffedData], { type: type });
      } catch {
        // create blob from data URI (newer sarcophagi)
        blob = new Blob([innerLayerDecrypted]);
      }

      const url = window.URL.createObjectURL(blob);
      // start download
      toast.dark("Downloading file");
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = sarcophagus.name;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (e) {
      console.error("There was an error downloading file:", e);
      toast.dark("There was an error downloading file");
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema(!!recipientPrivateKey)}
      onSubmit={(values) => handleDownload(values)}
    >
      {({ values, errors, handleChange, handleSubmit }) => (
        <form onSubmit={handleSubmit} className="px-2">
          <RecipientPrivateKeyField
            isVisible={!recipientPrivateKey}
            values={values}
            errors={errors}
            handleChange={handleChange}
          />
          <Button
            addClasses="mx-auto w-full mb-4"
            type="submit"
            label="Resurrect File"
            isDisabled={!recipientPrivateKey && !values.recipientPrivateKey}
          />
        </form>
      )}
    </Formik>
  );
};

export default ResurrectionForm;

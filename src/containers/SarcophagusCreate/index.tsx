import { Formik, FormikErrors } from "formik";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import {
  createInitialValues,
  createValidationSchema,
} from "../../components/SarcophagusCreate/sarcophagusCreate.utils";
import { useArchaeologistsStore } from "../../stores/Archaeologist";
import { Archaeologist, ArchaeologistsStore } from "../../stores/Archaeologist/archaeologist.interfaces";
import useApproval from "../../stores/BlockChain/useApproval";
import { useSarcophagiStore } from "../../stores/Sarcophagi";
import { SarcophagusStore } from "../../stores/Sarcophagi/sarcophagi.interfaces";
import { useWeb3 } from "../../web3";
import useFileEncryption from "../../components/SarcophagusCreate/hooks/useFileEncryption";
import { BigNumber, utils } from "ethers";
import { SarcophagusCreateValues } from "../../components/SarcophagusCreate/sarcophagusCreate.interfaces";
import { connect } from "../../web3/providers";
import CreateTitleAndDescription from "../../components/SarcophagusCreate/CreateTitleAndDescription";
import Settings from "../../components/SarcophagusCreate/Settings";
import UploadSarcophagusFile from "../../components/SarcophagusCreate/UploadSarcophagusFile";
import SelectResurrectionTime from "../../components/SarcophagusCreate/SelectResurrectionTime";
import ArchaeologistSelectForm from "../../components/SarcophagusCreate/SelectArchaeologistForm";
import Button from "../../components/layout/Button";

const CreateSarcophagus = () => {
  const [buttonText, setButtonText] = useState("");
  const [storageFee, setStorageFee] = useState<number | string | BigNumber | null>(null);
  const [selectedArchaeologist, setSelectedArchaeologist] = useState<Archaeologist | null>(null);
  const history = useHistory();

  const {
    file,
    setFile,
    setRecipientPublicKey,
    setArchaeologistAddress,
    doubleEncryptedFile,
    assetDoubleHash,
  } = useFileEncryption();

  const sarcophagiStore: SarcophagusStore = useSarcophagiStore();
  const archaeologistsStore: ArchaeologistsStore = useArchaeologistsStore();
  const { account } = useWeb3();
  const { approved, approveTransaction } = useApproval();

  const handleArchaeologistSelect = (
    selectedArchaeologist: Archaeologist,
    storageFee: number | string | BigNumber
  ) => {
    setStorageFee(storageFee);
    setSelectedArchaeologist(selectedArchaeologist);
    setArchaeologistAddress(selectedArchaeologist?.currentPublicKey);
  };

  const successRefresh = () => {
    sarcophagiStore.loadSarcophagi();
    archaeologistsStore.loadArchaeologists();
  };

  const redirect = () => {
    history.push("/tomb");
  };

  const createSarcophagus = async (values: SarcophagusCreateValues) => {
    if (!selectedArchaeologist || !storageFee || !assetDoubleHash || !doubleEncryptedFile) {
      console.error("🚀 ~ Create values not found");
      return;
    }
    try {
      const { bounty, diggingFee, recipientPublicKey, resurrectionTime, name } = values;
      let resurrectionTimeBN: BigNumber = BigNumber.from(Number(resurrectionTime) / 1000);
      
      const diggingFeeBN = utils.parseEther(diggingFee.toString());
      const bountyBN = utils.parseEther(bounty.toString());
      const storageFeeBN = utils.parseEther(storageFee.toString());
      let formatedPublicKey;
      if (recipientPublicKey.substr(0, 4) !== "0x04") formatedPublicKey = "0x04" + recipientPublicKey;
      const recipientPublicKeyBA = utils.arrayify(formatedPublicKey || recipientPublicKey).slice(1);

      sarcophagiStore.createSarcophagus(
        name,
        selectedArchaeologist,
        resurrectionTimeBN,
        storageFeeBN,
        diggingFeeBN,
        bountyBN,
        assetDoubleHash,
        recipientPublicKeyBA,
        doubleEncryptedFile,
        successRefresh,
        redirect
      );
    } catch (e) {
      console.error(e);
    }
  };

  const handleKey = (publicKey: string) => {
    setRecipientPublicKey(publicKey);
  };

  useEffect(() => {
    if (!approved) {
      setButtonText("Approve");
    } else {
      setButtonText("Finish");
    }
  }, [approved]);

  const handleApproval = (errors: FormikErrors<SarcophagusCreateValues>) => {
    if (!!Object.keys(errors).length) return;
    approveTransaction();
  };
  if (!account) {
    return (
      <div
        className="border border-gray-500 hover:border-white text-white text-md flex justify-center items-center cursor-pointer max-w-128 mx-auto"
        onClick={connect}
        style={{ height: "4.375rem" }}
      >
        Connect to a wallet to get started
      </div>
    );
  }

  return (
    <Formik
      initialValues={createInitialValues}
      validationSchema={createValidationSchema}
      onSubmit={createSarcophagus}
      validateOnMount
    >
      {({ values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue, isValid }) => (
        <form className="ml-8 px-14" onSubmit={handleSubmit}>
          <CreateTitleAndDescription />
          <Settings
            values={values}
            errors={errors}
            touched={touched}
            handleChange={handleChange}
            handleKey={handleKey}
            handleBlur={handleBlur}
          />
          <UploadSarcophagusFile
            handleBlur={handleBlur}
            values={values}
            file={file}
            handleFile={setFile}
            errors={errors}
            touched={touched}
            setFieldValue={setFieldValue}
          />
          <SelectResurrectionTime
            values={values}
            errors={errors}
            touched={touched}
            handleBlur={handleBlur}
            handleChange={handleChange}
            setFieldValue={setFieldValue}
          />
          <ArchaeologistSelectForm
            errors={errors}
            touched={touched}
            file={file}
            values={values}
            handleChange={handleChange}
            handleSelected={handleArchaeologistSelect}
            archSelected={selectedArchaeologist?.address || ""}
            setFieldValue={setFieldValue}
          />
          <Button
            label={buttonText}
            isDisabled={!isValid}
            addClasses="my-8"
            height="large"
            type={approved ? "submit" : "button"}
            onClick={
              approved
                ? () => null
                : () => {
                    handleApproval(errors);
                  }
            }
          />
        </form>
      )}
    </Formik>
  );
};

export default CreateSarcophagus;

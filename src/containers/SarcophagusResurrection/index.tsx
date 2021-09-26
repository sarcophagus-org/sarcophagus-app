import { utils } from "ethers";
import { Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { useLocation } from "react-router-dom";
import icon from "../../assets/images/Resurrection.svg";
import SarcophagusContainer from "../../components/SarcophagusTomb/shared/SarcophagusContainer";
import useCheckRecipientSarcophagi from "../../components/SarcophagusTomb/hooks/useCheckRecipientStatus";
import { ISarcophagus } from "../../stores/Sarcophagi/sarcophagi.interfaces";
import { SarcophagusStatus } from "../../components/SarcophagusTomb/tomb.enums";
import RecipientPrivateKeyField from "../../components/shared/ResurrectionForm/RecipientPrivateKeyField";
import Button from "../../components/layout/Button";
import { Heading } from "../../assets/styles/headings.enum";
import useRecipient from "../../stores/Sarcophagi/useRecipient";
import Loader from "../../components/shared/Loader";

const RecipientSarcophagus = ({
  sarcophagus,
  recipientPrivateKey,
}: {
  sarcophagus: ISarcophagus;
  recipientPrivateKey: string;
}) => {
  const { sarcophagusStatus } = useCheckRecipientSarcophagi(sarcophagus);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <SarcophagusContainer
      status={sarcophagusStatus}
      setStatus={() => null}
      toggleExpansion={() => setIsExpanded((expanded: boolean) => !expanded)}
      sarcophagus={sarcophagus}
      isExpandable={sarcophagusStatus === SarcophagusStatus.Unwrapped}
      isExpanded={isExpanded}
      recipientPrivateKey={recipientPrivateKey}
    />
  );
};

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const hexString = (value: string) => {
  let hexKey;
  if (value?.substr(0, 2) !== "0x") hexKey = "0x" + value;
  return hexKey || value;
};

interface PrivateKeyFieldProps {
  handleQuery: (values: any) => void;
  initialValues: any;
}

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

const PrivateKeyField = ({ handleQuery, initialValues }: PrivateKeyFieldProps) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => handleQuery(values)}
    >
      {({ values, errors, handleChange, handleSubmit }) => (
        <form onSubmit={handleSubmit} className="px-2 w-128">
          <RecipientPrivateKeyField
            values={values}
            errors={errors}
            handleChange={handleChange}
            isVisible={true}
          />
          <Button addClasses="w-full mb-4" type="submit" label="Submit" />
        </form>
      )}
    </Formik>
  );
};

const SarcophagusResurrection = () => {
  // retrieve keys from query
  let query = useQuery();
  const [recipientPrivateKey, setRecipientPrivateKey] = useState("");

  // takes private key param and converts to address
  const address = recipientPrivateKey ? utils.computeAddress(hexString(recipientPrivateKey)) : "";
  const { allRecipientSarcophagi, isRecipientSarcophagiLoaded } = useRecipient(address, true);

  const initialValues = {
    recipientPrivateKey: query.get("recipientPrivateKey") || "",
  };

  const handleQuery = (values: any) => {
    setRecipientPrivateKey(values.recipientPrivateKey);
  };

  return (
    <div className="pt-8 px-8 flex justify-center md:justify-between flex-wrap md:flex-nowrap gap-4 md:gap-8">
      <div style={{ width: "34rem" }}>
        <div className={Heading.PageHeading}>
          <img src={icon} alt="" className="mr-4" />
          <span>Resurrection</span>
        </div>
        <div className="text-md font-normal pl-2 pt-8 pb-4 leading-6">
          If the embalmer does not attest to their Sarcophagus, this is where the receiver will type in the
          private key to decrypt the inner layer and gain access to the file.
        </div>
        <PrivateKeyField handleQuery={handleQuery} initialValues={initialValues} />
      </div>
      <div className="" style={{ width: "34rem" }}>
        {!isRecipientSarcophagiLoaded && recipientPrivateKey ? (
          <Loader />
        ) : (
          allRecipientSarcophagi?.map((sarcophagus: ISarcophagus, i: number) => (
            <RecipientSarcophagus
              key={sarcophagus.archaeologist + i.toString()}
              sarcophagus={sarcophagus}
              recipientPrivateKey={recipientPrivateKey}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default SarcophagusResurrection;

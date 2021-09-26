import * as Yup from "yup";
import { Formik } from "formik";
import eyeOfHorus from "../../assets/images/eyeOfHorus2.svg";
import { ISarcophagusStore } from "../../stores/Sarcophagi/sarcophagi.interfaces";
import { useSarcophagiStore } from "../../stores/Sarcophagi";
import { Heading } from "../../assets/styles/headings.enum";
import Tooltip from "../../components/layout/Tooltip";
import ErrorText from "../../components/layout/ErrorText";
import Button from "../../components/layout/Button";
import { ReactNode } from "react";
import { utils } from "ethers";

const validationSchema = Yup.object().shape({
  identifier: Yup.string(),
  address: Yup.string(),
  singleHash: Yup.string(),
});

export const initialValues = {
  singleHash: "",
  address: "",
  identifier: "",
};

interface AccessArchaeologistValues {
  singleHash: string;
  address: string;
  identifier: string;
}

interface TextAndLabelProps {
  InputElement: ReactNode;
  error?: string;
  touched?: boolean;
  title: string;
  tooltipContent: string;
}

const TextAndLabel = ({ InputElement, error, touched, title, tooltipContent }: TextAndLabelProps) => {
  return (
    <div className="w-128">
      <div className="flex items-center">
        <div className={Heading.PageHeading}>
          <span>{title}</span>
        </div>
        <Tooltip content={tooltipContent} />
        <ErrorText isVisible={!!error && !!touched} text={error} addClasses="text-2xs" />
      </div>
      {InputElement}
    </div>
  );
};

const ArchaeologistAccuse = () => {
  const sarcophagiStore: ISarcophagusStore = useSarcophagiStore();

  const submitAccusal = (values: AccessArchaeologistValues, { resetForm }: { resetForm: () => void }) => {
    const successCallback = ({ transactionHash }: any) => {
      console.info("Accuse TX HASH", transactionHash);
      resetForm();
    };

    const { singleHash, identifier, address } = values;
    const identifierUint = Buffer.from(utils.arrayify(identifier));
    const singleHashUint = Buffer.from(utils.arrayify(singleHash));

    sarcophagiStore.accuseArchaeologist(identifierUint, singleHashUint, address, successCallback);
  };
  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={submitAccusal}>
      {({ values, errors, touched, handleChange, handleSubmit }) => (
        <form onSubmit={handleSubmit} className="px-2 flex flex-wrap md:flex-nowrap justify-center">
          <div className="mr-4 mt-2 w-104 md:w-128">
            <div className={Heading.PageHeading}>
              <img alt="" src={eyeOfHorus} className="mr-4" />
              <span>Eye of Horus</span>
            </div>
            <div className="mt-8 text-md text-white pr-8" style={{ lineHeight: "1.4375rem" }}>
              <div>
                The Eye of Horus watches over your Sarcophagi and allows network participants to prove any
                wrongdoing by the archaeologist at any time.
              </div>
              <div className="mt-4">
                When a Sarcophagus is created, a hash for each layer is also created. The hash is used to
                prove the identity and integrity of the layers.
              </div>
              <div className="mt-4">
                The single hash remains hidden unless the Sarcophagus is unwrapped. This can happen during the
                resurrection time, or if the archaeologist unwraps before then.
              </div>
            </div>
          </div>
          <div className="mt-8 md:mt-16 flex flex-col gap-8">
            <TextAndLabel
              error={errors.address}
              touched={touched.address}
              title="Archaeologist Address"
              tooltipContent="Address of the archaeologist you are accusing"
              InputElement={
                <input
                  type="text"
                  className="w-full mt-4 pl-4 text-md bg-black font-normal text-white remove-input-steps focus:outline-none border-gray-500"
                  style={{ height: "2.625rem" }}
                  value={values.address}
                  onChange={handleChange}
                  name="address"
                  placeholder="0x0000000000000000000000000000000000000000000000000000000000000000"
                />
              }
            />
            <TextAndLabel
              error={errors.singleHash}
              touched={touched.singleHash}
              tooltipContent="The Sarcophagus payload (file bytes) with the outer layer decrypted, hashed once"
              title="Single Hash"
              InputElement={
                <textarea
                  className="w-full mt-4 p-4 bg-black text-white text-md focus:outline-none border border-gray-500"
                  style={{ height: "7.75rem" }}
                  value={values.singleHash}
                  onChange={handleChange}
                  name="singleHash"
                  placeholder="0x0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
                />
              }
            />
            <TextAndLabel
              error={errors.identifier}
              touched={touched.identifier}
              tooltipContent="The Sarcophagus payload (file bytes) encrypted and hashed twice. This proves that the archaeologist uploaded the correct data to Arweave."
              title="Sarcophagus Identifier"
              InputElement={
                <textarea
                  className="w-full mt-4 p-4 bg-black text-white text-md focus:outline-none border border-gray-500"
                  style={{ height: "7.75rem" }}
                  value={values.identifier}
                  onChange={handleChange}
                  name="identifier"
                  placeholder="0x0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
                />
              }
            />
            <Button addClasses="mx-auto mb-4" width="full" type="submit" label="Submit" />
          </div>
        </form>
      )}
    </Formik>
  );
};

export default ArchaeologistAccuse;

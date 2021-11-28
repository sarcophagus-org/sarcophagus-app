import { useEffect, useState } from "react";
import { ethers, BigNumber } from "ethers";
import { Formik } from "formik";
import * as Yup from "yup";
import FeesForm from "../../../shared/FeesForm";
import useApproval from "../../../../stores/BlockChain/useApproval";
import { useArchaeologistsStore } from "../../../../stores/Archaeologist";
import Tooltip from "../../../layout/Tooltip";
import ErrorText from "../../../layout/ErrorText";
import { useSarcophagiStore } from "../../../../stores/Sarcophagi";
import { SarcophagusStatus } from "../../tomb.enums";
import { Heading } from "../../../../assets/styles/headings.enum";
import { RewrapFormErrors, RewrapFormState } from "../../tomb.interfaces";
import { Sarcophagus, SarcophagusStore } from "../../../../stores/Sarcophagi/sarcophagi.interfaces";
import {
  Archaeologist,
  ArchaeologistsStore,
} from "../../../../stores/Archaeologist/archaeologist.interfaces";
import Button from "../../../layout/Button";
import ResurrectionTimeForm from "../../../shared/ResurrectionForm/ResurrectionTimeForm";
import { ResurrectionTimeInterval } from "../../../SarcophagusCreate/sarcophagusCreate.interfaces";
import { getDateInFuture, getDecimalNumber } from "../../../shared/components.utils";

export interface RewrapProps {
  sarcophagus: Sarcophagus;
  toggleExpansion: () => void;
  setStatus: (status: SarcophagusStatus) => void;
}

const Rewrap = ({ sarcophagus, toggleExpansion, setStatus }: RewrapProps) => {
  const sarcophagiStore: SarcophagusStore = useSarcophagiStore();
  const archaeologistStore: ArchaeologistsStore = useArchaeologistsStore();
  const { approved, approveTransaction } = useApproval();
  const [buttonText, setButtonText] = useState("");

  const archaeologist = archaeologistStore.filteredArchaeologists.find(
    (archaeologist: Archaeologist) => archaeologist.address === sarcophagus.archaeologist
  );

  useEffect(() => {
    if (!approved) {
      setButtonText("Approve");
    } else {
      setButtonText("Rewrap Sarcophagus");
    }
  }, [approved]);

  const handleApproval = (errors: RewrapFormErrors) => {
    if (!!Object.keys(errors).length) return;
    approveTransaction();
  };

  const handleSubmit = async (values: RewrapFormState) => {
    const { AssetDoubleHash } = sarcophagus;
    const { bounty, diggingFee, resurrectionTime } = values;

    const buffedAssetDoubleHash = Buffer.from(ethers.utils.arrayify(AssetDoubleHash));
    const resurrectionTimeBN: BigNumber = BigNumber.from(Number(resurrectionTime) / 1000);
    const diggingFeeBN = ethers.utils.parseEther(diggingFee.toString());
    const bountyBN = ethers.utils.parseEther(bounty.toString());

    const successRefresh = () => {
      toggleExpansion();
      setStatus(SarcophagusStatus.Active)
      sarcophagiStore.loadSarcophagi();
    };
    sarcophagiStore.rewrapSarcophagus(
      buffedAssetDoubleHash,
      resurrectionTimeBN,
      diggingFeeBN,
      bountyBN,
      setStatus,
      successRefresh
    );
  };

  const burySarcophagus = () => {
    const { AssetDoubleHash } = sarcophagus;
    const buffedAssetDoubleHash = Buffer.from(ethers.utils.arrayify(AssetDoubleHash));
    const successRefresh = () => {
      sarcophagiStore.loadSarcophagi();
      toggleExpansion();
    };
    sarcophagiStore.burySarcophagus(buffedAssetDoubleHash, setStatus, successRefresh);
  };

  const initialValues: RewrapFormState = {
    resurrectionTime: getDateInFuture(7),
    bounty: getDecimalNumber(archaeologist?.minimumBounty || ethers.BigNumber.from(0), 18) || 0,
    diggingFee: getDecimalNumber(archaeologist?.minimumDiggingFee || ethers.BigNumber.from(0), 18) || 0,
    custom: false,
    customTime: "",
    timeSelect: ResurrectionTimeInterval.Week,
  };

  const validationSchema = Yup.object()
    .shape({
      resurrectionTime: Yup.number().required("Resurrection time is required"),
      bounty: Yup.number()
        .min(
          getDecimalNumber(archaeologist?.minimumBounty || ethers.BigNumber.from(0), 18) || 0,
          "Bounty is too low"
        )
        .required("Bounty is required"),
      diggingFee: Yup.number()
        .min(
          getDecimalNumber(archaeologist?.minimumDiggingFee || ethers.BigNumber.from(0), 18) || 0,
          "Digging Fee is too low"
        )
        .required("Digging Fee is required"),
      customTime: Yup.number().when("custom", {
        is: true,
        then: Yup.number().required("Resurrection time is required"),
      }),
      custom: Yup.bool(),
    })
    .nullable();

  if (!archaeologist) return null;

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      validateOnMount
    >
      {({ values, errors, handleChange, handleSubmit, setFieldValue, isValid }) => (
        <form onSubmit={handleSubmit} className="pb-8 px-10">
          <div className="flex items-center my-4">
            <div className={Heading.PageHeading}>Fees</div>
            <Tooltip content="These fees are based on current minimum fees provided by archaeologist" />
          </div>

          <FeesForm values={values} errors={errors} handleChange={handleChange} isDescriptionShown={false} />

          <div className="flex pt-8 pb-2 items-center">
            <div className={Heading.PageHeading}>Choose new resurrection time</div>
            <Tooltip
              content={
                <div>
                  <div>Choose a resurrection time by selecting an options below</div>
                  <div>1 Week: 7 days from today</div>
                  <div>1 month: 30 days from today</div>
                  <div>3 months: 90 days from today</div>
                </div>
              }
            />
          </div>
          <ErrorText isVisible={!!errors.resurrectionTime} text={errors.resurrectionTime} addClasses="py-2" />
          <ResurrectionTimeForm
            handleChange={handleChange}
            setFieldValue={setFieldValue}
            values={values}
            errors={errors}
          />
          <div className="flex flex-col justify-center items-center mt-8 mb-12">
            <Button
              label={buttonText}
              isDisabled={!isValid}
              type={approved ? "submit" : "button"}
              onClick={
                approved
                  ? () => null
                  : () => {
                      handleApproval(errors);
                    }
              }
            />
            <div
              className="whitespace-nowrap flex mt-8 underline justify-center items-center"
              onClick={burySarcophagus}
            >
              <span className="mr-2 cursor-pointer">Bury sarcophagus</span>
              <Tooltip content="Burying a sarcophagus, releases digging fees to archaeologist and archives sarcophagus." />
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default Rewrap;

import { utils } from "ethers";
import * as Yup from "yup";
import { Archaeologist } from "../../stores/Archaeologist/archaeologist.interfaces";

import { SarcophagusCreateValues } from "./sarcophagusCreate.interfaces";

export const createInitialValues: SarcophagusCreateValues = {
  recipientPublicKey: "",
  name: "",
  resurrectionTime: "",
  bounty: 100,
  diggingFee: 10,
  fileUploaded: false,
  address: "",
  daysDisplayed: 0,
  custom: false,
  customTime: "",
  timeSelect: null,
};

/**
 * @function archaeologistsTableHeaders creates props for header component
 * @param archaeologistsWithStats 
 * @returns array of title and tooltip content for headers
 */
export const archaeologistsTableHeaders = (archaeologistsWithStats: Archaeologist[]) => [
  {
    title: `Archaeologists (${archaeologistsWithStats.length})`,
    tooltipContent: "",
  },
  {
    title: "Fee",
    tooltipContent: "Total fee in $SARCO to create this sarcophagus.",
  },
  {
    title: "Bounty",
    tooltipContent: "This Archaeologists minimum bounty requirement.",
  },
  {
    title: "Digging Fee",
    tooltipContent: "This Archaeologists minimum digging fee for your resurrection date/time.",
  },
  {
    title: "Metrics",
    tooltipContent: "",
  },
];


export const createValidationSchema = Yup.object()
  .shape({
    recipientPublicKey: Yup.string()
      .test("required", "Recipient Address is required", (value) => !!value)
      .test("validDataHextString", "Please enter a valid public key", (value) => {
        let testValue;
        const str = value?.substr?.(0, 4);
        if (str !== "0x04") testValue = "0x04" + value;
        return utils.isHexString(testValue || value, 65);
      }),
    name: Yup.string().required("Name is required"),
    resurrectionTime: Yup.number().required("Resurrection time is required"),
    bounty: Yup.number(),
    diggingFee: Yup.number(),
    customTime: Yup.number().when("custom", {
      is: true,
      then: Yup.number().required("Resurrection time is required"),
    }),
    custom: Yup.bool(),
    fileUploaded: Yup.mixed()
      .test("required", "Please upload a file", (value) => !!value)
      .test("filesize", "Files must not be larger than 2.9MB", (value) =>
        value ? value.size <= 2900000 : true
      ),
    address: Yup.string().required("Please select an archaeologist"),
  })
  .nullable();


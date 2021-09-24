import { BigNumber } from "@ethersproject/bignumber";
import { FormikErrors, FormikTouched } from "formik";
import { Archaeologist } from "../../stores/Archaeologist/archaeologist.interfaces";

export interface SarcophagusCreateValues {
  recipientPublicKey: string;
  name: string;
  resurrectionTime: number | string;
  bounty: number;
  diggingFee: number;
  fileUploaded: boolean;
  address: string;
  daysDisplayed: number;
  custom: boolean;
  customTime: string;
  timeSelect: "week" | "month" | "threeMonths" | "custom" | null;
}

export interface SettingsProps {
  values: SarcophagusCreateValues;
  errors: FormikErrors<SarcophagusCreateValues>;
  touched: FormikTouched<SarcophagusCreateValues>;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  handleKey: any;
  handleBlur: (e: any) => void;
  toggle?: () => void;
}

export interface UploadSarcophagusFileProps {
  values: SarcophagusCreateValues;
  errors: FormikErrors<SarcophagusCreateValues>;
  touched: FormikTouched<SarcophagusCreateValues>;
  file: File | null;
  toggle?: () => void;
  handleFile: (file: File) => void;
  handleBlur: (e: any) => void;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
}

export interface SelectResurrectionProps {
  values: SarcophagusCreateValues;
  errors: FormikErrors<SarcophagusCreateValues>;
  touched: FormikTouched<SarcophagusCreateValues>;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  handleBlur: (e: any) => void;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
}

export interface SelectArchaeologistProps {
  touched: FormikTouched<SarcophagusCreateValues>;
  file: File | null;
  values: SarcophagusCreateValues;
  errors: FormikErrors<SarcophagusCreateValues>;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  handleSelected: (selectedArchaeologist: Archaeologist, storageFee: number | string | BigNumber) => void
  archSelected: string;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
}

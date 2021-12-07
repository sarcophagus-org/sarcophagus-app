import { BigNumber } from "@ethersproject/bignumber";
import { FormikErrors, FormikTouched } from "formik";
import { Archaeologist } from "../stores/Archaeologist/archaeologist.interfaces";

export enum ResurrectionTimes {
  Custom,
  Month,
  ThreeMonths,
  Week,
}

export interface SarcophagusCreateValues {
  address: string;
  bounty: number;
  custom: boolean;
  customTime: string;
  daysDisplayed: number;
  diggingFee: number;
  fileUploaded: boolean;
  name: string;
  recipientPublicKey: string;
  resurrectionTime: number | string;
  timeSelect: ResurrectionTimes | null;
}

export interface SettingsProps {
  errors: FormikErrors<SarcophagusCreateValues>;
  touched: FormikTouched<SarcophagusCreateValues>;
  values: SarcophagusCreateValues;
  handleBlur: (e: React.FocusEvent<any>) => void;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  handleKey: (publicKey: string) => void;
  toggle?: () => void;
}

export interface UploadSarcophagusFileProps {
  errors: FormikErrors<SarcophagusCreateValues>;
  file: File | null;
  touched: FormikTouched<SarcophagusCreateValues>;
  values: SarcophagusCreateValues;
  handleBlur: (e: React.FocusEvent<any>) => void;
  handleFile: (file: File) => void;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  toggle?: () => void;
}

export interface SelectResurrectionProps {
  values: SarcophagusCreateValues;
  errors: FormikErrors<SarcophagusCreateValues>;
  touched: FormikTouched<SarcophagusCreateValues>;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  handleBlur: (e: React.FocusEvent<any>) => void;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
}

export interface SelectArchaeologistProps {
  archSelected: string;
  errors: FormikErrors<SarcophagusCreateValues>;
  file: File | null;
  touched: FormikTouched<SarcophagusCreateValues>;
  values: SarcophagusCreateValues;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  handleSelected: (selectedArchaeologist: Archaeologist, storageFee: number | string | BigNumber) => void;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
}

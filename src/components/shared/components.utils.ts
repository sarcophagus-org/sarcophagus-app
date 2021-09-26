import { BigNumber, utils } from "ethers";
import numeral, { Numeral } from "numeral";
import { Archaeologist } from "../../stores/Archaeologist/archaeologist.interfaces";
export const ENCRYPTED_BYTE_INCREASE = 226;

export const truncate = (fullStr: string, strLen: number, separator?: string, sepLength?: number) => {
  if (fullStr.length <= strLen) return fullStr;

  separator = separator || "...";

  const sepLen = separator.length;
  const charsToShow = strLen - sepLen;
  const frontChars = Math.ceil(sepLength || charsToShow / 2 + 1); // accounts for the "0x"
  const backChars = Math.floor(charsToShow / 2 - 1); // accounts for the "0x"

  return fullStr.substr(0, frontChars) + separator + fullStr.substr(fullStr.length - backChars);
};

export const hexToBytes = (hex: string, pad = false) => {
  let byteArray = utils.arrayify(hex);
  if (pad) {
    let padByte = new Uint8Array([4]);
    return Buffer.from(new Uint8Array([...padByte, ...byteArray]));
  } else {
    return Buffer.from(byteArray);
  }
};

export const convertDataToBigNumber = (dateString: string): BigNumber => {
  const date = new Date(dateString);
  const convertedUTCDate = convertToUTCTime(date);
  const secondsUTC = convertedUTCDate / 1000;
  return BigNumber.from(secondsUTC);
};

export const getDateInFuture = (numDays: number): number => {
  let today = new Date();
  today.setDate(today.getDate() + numDays);
  const dateAsUTC = convertToUTCTime(today);
  return dateAsUTC;
};

export const convertToUTCTime = (date: Date): number => {
  return Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds()
  );
};

export const makeNumeral = (bigNumber: BigNumber, decimals: number): Numeral => {
  return numeral(utils.formatUnits(bigNumber, decimals));
};

export const getDecimalNumber = (bigNumber: BigNumber, decimals: number): number | null => {
  return makeNumeral(bigNumber, decimals).value();
};

export const getNumberalString = (bigNumber: BigNumber, decimals: number, isFixed?: boolean) => {
  if (isFixed) return makeNumeral(bigNumber, decimals)?.value?.();
  return makeNumeral(bigNumber, decimals).input();
};

export const archTotalFees = (archaeologist: Archaeologist, file: File | null, returnBigNumber?: boolean) => {
  const { feePerByte, minimumBounty, minimumDiggingFee } = archaeologist;
  if (!feePerByte || !minimumBounty || !minimumDiggingFee) return "";
  if (!file?.size) return "";
  const calculatedFee = feePerByte
    .mul(file.size + ENCRYPTED_BYTE_INCREASE * 2)
    .add(minimumBounty)
    .add(minimumDiggingFee);
  const totalFees = getNumberalString(calculatedFee, 18);
  if (!returnBigNumber) return totalFees;
  return calculatedFee;
};

export const getStorageFee = (archaeologist: Archaeologist, file: File | null, returnBigNumber?: boolean) => {
  const { feePerByte } = archaeologist;
  if (!feePerByte) return "";
  if (!file?.size) return "";
  const calculatedFee = feePerByte.mul(file.size + ENCRYPTED_BYTE_INCREASE * 2);
  const storageFees = getNumberalString(calculatedFee, 18);
  if (!returnBigNumber) return storageFees;
  return calculatedFee;
};

export const getCursedPercentage = (cursedBond: BigNumber, freeBond: BigNumber) => {
  if (cursedBond?.isZero()) return "0 %";
  const cb = parseFloat(utils.formatEther(cursedBond));
  const total = parseFloat(utils.formatEther(freeBond.add(cursedBond)));
  const percentage = (cb / total) * 100;
  return `${percentage.toFixed(9)} %`;
};

export const getDatefromBigNumber = (UtcBN: BigNumber) => {
  const UTC = makeNumeral(UtcBN, 0).value();
  const dateFromUTC = new Date((UTC || 0) * 1000);
  const timeZoneOffset = dateFromUTC.getTimezoneOffset();
  dateFromUTC.setMinutes(dateFromUTC.getMinutes() + timeZoneOffset);
  return `${dateFromUTC.toLocaleDateString()} ${dateFromUTC.toLocaleTimeString()}`;
};

export const checkReceivedStatus = (resurrectionTime: BigNumber, resurrectionWindow: BigNumber, privateKey: string, SarcophagusState: number) => {
  const resurrectionTimePlusWindow = resurrectionTime.add(resurrectionWindow);
  const isUnwrapped =
    SarcophagusState === 2 &&
    privateKey !== "0x0000000000000000000000000000000000000000000000000000000000000000";
  const isActive =
    SarcophagusState === 1 &&
    resurrectionTimePlusWindow.gte(BigNumber.from(Number(Date.now().valueOf() / 1000).toFixed(0)));
  const isVisible = isUnwrapped || isActive;
  return { isUnwrapped, isActive, isVisible };
};
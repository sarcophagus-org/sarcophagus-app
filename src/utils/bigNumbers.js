import numeral from 'numeral'
import { utils } from 'ethers'

const ENCRYPTED_BYTE_INCREASE = 113

const makeNumeral = (bigNumber, decimals) => {
  return numeral(utils.formatUnits(bigNumber, decimals))
}
const getDecimalNumber = (bigNumber, decimals) => {
  return makeNumeral(bigNumber, decimals).value()
}

const getStorageFee = (archaeologist, file, bigNumber=false) => {
  const { feePerByte, minimumBounty, minimumDiggingFee } = archaeologist
  const { size } = file
  if(!feePerByte || !minimumBounty || !minimumDiggingFee) return ""
  if(!size) return ""
  const calculatedFee = feePerByte.mul(size + (ENCRYPTED_BYTE_INCREASE * 2)).add(minimumBounty).add(minimumDiggingFee)
  const totalFees = getDecimalNumber(calculatedFee, 18)
  if(!bigNumber) return totalFees
  return calculatedFee
}

export {
  ENCRYPTED_BYTE_INCREASE,
  getStorageFee,
  getDecimalNumber,
  makeNumeral
}
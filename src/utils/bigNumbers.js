import numeral from 'numeral'
import { utils } from 'ethers'

const makeNumeral = (bigNumber, decimals) => {
  return numeral(utils.formatUnits(bigNumber, decimals))
}
const getDecimalNumber = (bigNumber, decimals) => {
  return makeNumeral(bigNumber, decimals).value()
}

const getBountyFees = (archaeologist, file, bigNumber=false) => {
  const { feePerByte, minimumBounty, minimumDiggingFee } = archaeologist
  const { size } = file
  if(!feePerByte || !minimumBounty || !minimumDiggingFee) return ""
  if(!size) return ""
  const calculatedFee = feePerByte.mul(size).add(minimumBounty).add(minimumDiggingFee)
  const totalFees = getDecimalNumber(calculatedFee, 18)
  if(!bigNumber) return totalFees
  return calculatedFee
}

const getDate = (maximumResurrectionTime) => {
  return new Date(Number(utils.formatUnits(maximumResurrectionTime, 'wei')).toFixed(0))
}

export {
  getBountyFees,
  getDecimalNumber,
  makeNumeral,
  getDate
}
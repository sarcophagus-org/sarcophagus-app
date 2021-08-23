import numeral from 'numeral'
import { utils } from 'ethers'

const ENCRYPTED_BYTE_INCREASE = 226

const makeNumeral = (bigNumber, decimals) => {
  return numeral(utils.formatUnits(bigNumber, decimals))
}
const getDecimalNumber = (bigNumber, decimals) => {
  return makeNumeral(bigNumber, decimals).value()
}

const getNumberalString = (bigNumber, decimals, isFixed) => {
  if(isFixed) return makeNumeral(bigNumber, decimals).value().toFixed().toString()
  return makeNumeral(bigNumber, decimals).input()
}

const getTotalFee = (archaeologist, file, bigNumber=false) => {
  const { feePerByte, minimumBounty, minimumDiggingFee } = archaeologist
  const { size } = file
  if(!feePerByte || !minimumBounty || !minimumDiggingFee) return ""
  if(!size) return ""
  const calculatedFee = feePerByte.mul(size + (ENCRYPTED_BYTE_INCREASE * 1.5)).add(minimumBounty).add(minimumDiggingFee)
  const totalFees = getNumberalString(calculatedFee, 18)
  if(!bigNumber) return totalFees
  return calculatedFee
}

const getStorageFee = (archaeologist, file, bigNumber=false) => {
  const { feePerByte, minimumBounty, minimumDiggingFee } = archaeologist
  const { size } = file
  if(!feePerByte || !minimumBounty || !minimumDiggingFee) return ""
  if(!size) return ""
  const calculatedFee = feePerByte.mul(size + (ENCRYPTED_BYTE_INCREASE * 2))
  const totalFees = getNumberalString(calculatedFee, 18)
  if(!bigNumber) return totalFees
  return calculatedFee
}


const getCursedPercentage = (cursedBond, freeBond) => {
  if(cursedBond?.isZero()) return '0 %'
  const cb = parseFloat(utils.formatEther((cursedBond)))
  const total = parseFloat(utils.formatEther((freeBond.add(cursedBond))))
  const percentage = (cb / total) * 100
  return `${percentage.toFixed(9)} %`
}

export {
  ENCRYPTED_BYTE_INCREASE,
  getTotalFee,
  getDecimalNumber,
  makeNumeral,
  getNumberalString,
  getCursedPercentage,
  getStorageFee
}
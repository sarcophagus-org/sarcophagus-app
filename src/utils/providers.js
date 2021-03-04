export const checkTransaction = async (hash, provider) => {
  const txReceipt = await provider?.getTransactionReceipt(hash)
  if(txReceipt && txReceipt.blockNumber) {
      return true
    } else {
      return false
    }
}
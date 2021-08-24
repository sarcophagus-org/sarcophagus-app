import Arweave from 'arweave'

const initArweave = () => {
  return Arweave.init({
    host: 'arweave.net',// Hostname or IP address for a Arweave host
    port: 443,          // Port
    protocol: 'https',  // Network protocol http or https
    timeout: 20000,     // Network request timeouts in milliseconds
    logging: false,     // Enable network request logging
  })
}

const arweaveFileValid = async (arweave, transactionId, doubleEncryptedFile) => {
  try {
    const data = await arweave.transactions.getData(transactionId, {decode: true})
    const buffedData = Buffer.from(data)
    const buffFile = Buffer.from(doubleEncryptedFile.data)
    return (Buffer.compare(buffedData, buffFile) === 0)
  } catch (e) {
    console.error(e)
  }
}


export {
  initArweave,
  arweaveFileValid,
}
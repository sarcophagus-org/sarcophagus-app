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

const arweaveFileTypeExists = async (arweave, transactionId) => {
  return arweave.transactions.get(transactionId).then(transaction => {
    const contentType = transaction.get('tags').filter(tag =>
      tag.get('name', {decode: true, string: true}) === 'Content-Type'
    ).map(tag => tag.get('value', {decode: true, string: true}))

    return contentType.length && contentType[0] !== ""
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
  arweaveFileTypeExists,
  arweaveFileValid,
}
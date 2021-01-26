import {BigNumber} from 'ethers'

const handleSendFile = async (doubleEncryptedFile, fileType, endpoint) => {
  const archEndpoint = 'http://' + endpoint + '/file'
  const fileEncoded = btoa([].reduce.call(doubleEncryptedFile, function (p, c) {
    return p + String.fromCharCode(c)
  }, ''))

  return fetch(archEndpoint, {
    method: 'POST',
    body: JSON.stringify({
      fileType: fileType,
      fileBytes: fileEncoded
    })
  }).then((responseFromArch) => {
    console.log('arch response:', responseFromArch)

    // TODO: set explicit error response from arch service
    if (!responseFromArch.ok) { console.log("NOT OKAY", responseFromArch.json()); throw new Error("Failed to send file") }
    return responseFromArch.json()
  }).then((responseFromArchData) => {
    return responseFromArchData
  }).catch((err) => {
    console.log(err)
  })
}

const useSarcophagus = (sarcophagusTokenContract, sarcophagusContract) => {

  const createSarcophagus = async (sarcophagusName, archaeologist, resurrectionTimeUTC, storageFeeBN, diggingFeeBN, bountyBN, assetDoubleHash, recipientPublicKeyBA, doubleEncryptedFile, fileType, history) => {
    /* Approve Transaction */

    sarcophagusTokenContract.approve(sarcophagusContract?.address, BigNumber.from(2).pow(BigNumber.from(256)).sub(BigNumber.from(1)))
      .then((txReceipt) => {
        console.log("🚀 approve ~txReceipt", txReceipt)
        /* Create Sarco Transaction */

        sarcophagusContract.createSarcophagus(sarcophagusName, archaeologist.archaeologist, resurrectionTimeUTC, storageFeeBN, diggingFeeBN, bountyBN, assetDoubleHash, recipientPublicKeyBA)
          .then((txReceipt) => {
            console.log("🚀 create ~txReceipt", txReceipt)

            /* Send File to Archaeologist */

            handleSendFile(doubleEncryptedFile, fileType, archaeologist.endpoint)
              .then(async (responseFromArch) => {
                console.log("response from arch:", responseFromArch)

                // Save vars below in local storage (using AssetDoubleHash as key)
                let { NewPublicKey, AssetDoubleHash, AssetId, V, R, S } = responseFromArch 
                NewPublicKey = Buffer.from(NewPublicKey, 'base64')
                
                const storageObject = { NewPublicKey: NewPublicKey, AssetDoubleHash: AssetDoubleHash, V: V, R: R, S: S, AssetId: AssetId, DEF: doubleEncryptedFile}
                localStorage.setItem(AssetDoubleHash, JSON.stringify(storageObject))
                history.replace('/')
              }).catch(e => console.error("Error sending file to archaeologist:", e))
          }).catch(e => console.error("Error creating Sarcophagus:", e))
      }).catch(e => console.error("Error during approval process:", e))
  }

  return { createSarcophagus }
}

export {
  useSarcophagus
}
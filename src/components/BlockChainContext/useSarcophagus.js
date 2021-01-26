import {BigNumber} from 'ethers'
import {initArweave, arweaveFileTypeExists, arweaveFileValid} from "../../utils/arweave";

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

  const createSarcophagus = async (sarcophagusName, archaeologist, resurrectionTimeUTC, storageFeeBN, diggingFeeBN, bountyBN, assetDoubleHash, recipientPublicKeyBA, doubleEncryptedFile, fileType) => {
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

                // Store in state
                let { NewPublicKey, AssetDoubleHash, AssetId, V, R, S } = responseFromArch
                NewPublicKey = Buffer.from(NewPublicKey, 'base64')

                // At this point, we can redirect user to Tomb page.

                // Move code below elsewhere

                /* Validate Arweave File using assetId from Archaeologist response */
                const arweave = initArweave()
                const fileValid = await arweaveFileValid(arweave, AssetId, doubleEncryptedFile)

                if (!fileValid) {
                  throw new Error("There was an error with the Arweave file")
                }

                /* Wait for TX to be mined */
                var startTime = new Date().getTime();
                const interval = setInterval(async () => {
                  /* Stop checking and fail after 15 minutes */
                  if (new Date().getTime() - startTime > (15 * 60 * 1000)) {
                    clearInterval(interval);
                    throw new Error("There was an error with the Arweave Transaction")
                  }

                  try {
                    const response = await arweave.api.get('tx/1bywe_cEpvGQqKUPV_1LowoGYf0WNMEe00mQQgEp_98')
                    switch (response.status) {
                      case 202:
                        // Pending Tx (still mining)
                        break;
                      case 200:
                        // Successful Tx
                        clearInterval(interval)
                        const fileTypeExists = await arweaveFileTypeExists(arweave, AssetId)
                        if (!fileTypeExists) {
                          throw new Error("There was an error with the Arweave file type")
                        }

                        /* Call Update Sarcophagus with response from Arch */

                        sarcophagusContract.updateSarcophagus(NewPublicKey, AssetDoubleHash, AssetId, V, R, S)
                          .then((txReceipt) => {
                            console.log("🚀 update ~txReceipt", txReceipt)
                          }).catch(e => console.error("Error updating sarcophagus:", e))
                        break;
                      default:
                        // Problem with the Tx
                        clearInterval(interval)
                        throw new Error("There was an error with the Arweave Transaction")
                    }
                  } catch {
                    clearInterval(interval)
                    throw new Error("There was an error with the Arweave Transaction")
                  }
                }, 5000)
              }).catch(e => console.error("Error sending file to archaeologist:", e))
          }).catch(e => console.error("Error creating Sarcophagus:", e))
      }).catch(e => console.error("Error during approval process:", e))
  }

  return {createSarcophagus}
}

export {
  useSarcophagus
}
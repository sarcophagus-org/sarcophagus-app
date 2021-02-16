const initialValues = () => {
  return {
    recipientPublicKey: "0x0459b159955bb46d90b9d4905c5589ab0694a593ae2e82627d6658a363ae97db0bdcf8275ea45cb8cbd21a249a3fe1c15d8523d166fb74dc6773bc5c02ef329342",
    name: "",
    resurrectionTime: "",
    bounty: 0,
    diggingFee: 0,
    custom: false,
    customTime: "",
    fileUploaded: false,
    address: "",
    daysDisplayed: 0,
  }
}

export {
  initialValues
}
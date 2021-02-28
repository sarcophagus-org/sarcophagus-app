const initialValues = () => {
  return {
    recipientPublicKey: "",
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
const initialValues = () => {
  return {
    recipientPublicKey: "0xd5f5868912811ad4e92cd737770488ed4576ee87f14db9b9d50c589a1f7c6a5d52922fd0e8ff02ba0e18fd023f1b175deeab9294791520a04acb34537fb1b7f8",
    name: "",
    resurrectionTime: "",
    bounty: "",
    diggingFee: "",
    days: 365,
    hours: 0,
    minutes: 0,
    custom: false,
    fileUploaded: false,
    address: "",
    daysDisplayed: 0,
  }
}

export {
  initialValues
}
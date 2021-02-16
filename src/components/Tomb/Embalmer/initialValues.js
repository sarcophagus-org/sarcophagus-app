import { getDecimalNumber } from "../../../utils/bigNumbers"

export const initialValues = (archaeologist) => {
    return {
        resurrectionTime: "",
        bounty: getDecimalNumber(archaeologist.minimumBounty, 18),
        diggingFee: getDecimalNumber(archaeologist.minimumDiggingFee, 18),
        custom: false,
        customTime: ""
      }
}
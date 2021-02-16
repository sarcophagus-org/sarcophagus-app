import * as Yup from 'yup'
import { getDecimalNumber } from '../../../utils/bigNumbers'

export const validationSchema = (archaeologist) => {
  return Yup.object().shape({
    resurrectionTime: Yup.number().required('Resurrection time is required'),
    bounty: Yup.number()
      .min(getDecimalNumber(archaeologist.minimumBounty, 18), 'Bounty is too low')
      .required('Bounty is required'),
    diggingFee: Yup.number()
      .min(getDecimalNumber(archaeologist.minimumDiggingFee, 18), 'Digging Fee is too low')
      .required('Digging Fee is required'),
    customTime: Yup.number()
      .when("custom", {
        is: true,
        then:  Yup.number().required('Resurrection time is required')
      }),
    custom: Yup.bool()
  }).nullable()
}
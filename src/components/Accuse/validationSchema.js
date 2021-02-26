import * as Yup from 'yup'

export const validationSchema = () => {
  return Yup.object().shape({
    identifier: Yup.string(),
    paymentAddress: Yup.string(),
    singleHash: Yup.string()
  })
}
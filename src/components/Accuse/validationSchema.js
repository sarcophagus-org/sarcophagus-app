import * as Yup from 'yup'

export const validationSchema = Yup.object().shape({
  identifier: Yup.string(),
  address: Yup.string(),
  singleHash: Yup.string()
})

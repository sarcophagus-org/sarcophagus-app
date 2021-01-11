import * as Yup from 'yup'

const validationFileSchema = () => {
  return Yup.object().shape({})
}
const validationFeesSchema = () => {
  return Yup.object().shape({})
}

export {
  validationFileSchema,
  validationFeesSchema
}
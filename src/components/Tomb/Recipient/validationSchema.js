import { utils } from 'ethers'
import * as Yup from 'yup'

export const validationSchema = () => {
  return Yup.object().shape({
    recipientPrivateKey: Yup.string()
      .test(
        'required',
        'Recipient Private Key is required',
        (value) => !!value)
      .test(
        'validDataHextString',
        'Please enter a valid public key',
        (value) => utils.isHexString(value, 32)
      ),
  })
}
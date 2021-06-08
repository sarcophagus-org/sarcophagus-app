import { utils } from 'ethers'
import * as Yup from 'yup'

export const validationSchema = (hasKeys) => {
  if(hasKeys) return
  return Yup.object().shape({
    recipientPrivateKey: Yup.string()
      .test(
        'required',
        'Recipient Private Key is required',
        (value) => !!value)
      .test(
        'validDataHextString',
        'Please enter a valid public key',
        (value) => {
          let testValue
          const str = value?.substr?.(0, 2)
          if(str !== "0x") testValue = "0x" + value
          return utils.isHexString(testValue || value, 32)
        }
      ),
  })
}
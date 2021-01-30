import { utils } from 'ethers'

const hexToBytes = (hex, pad = false) => {
  let byteArray = utils.arrayify(hex)
  if (pad) {
    let padByte = new Uint8Array([4])
    return Buffer.from(new Uint8Array([...padByte, ...byteArray]))
  } else {
    return Buffer.from(byteArray)
  }
}

export {
  hexToBytes
}
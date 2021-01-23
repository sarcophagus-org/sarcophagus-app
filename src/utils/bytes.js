import { utils } from 'ethers'

const hexToBytes = (hex, pad = false) => {
  let byteArray = utils.arrayify(hex)
  if (pad) {
    let padByte = new Uint8Array([4])
    return new Buffer(new Uint8Array([...padByte, ...byteArray]))
  } else {
    return new Buffer(byteArray)
  }
}

export {
  hexToBytes
}
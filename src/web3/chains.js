import { useState, useEffect } from 'react'

const supportedChains = () => {
  const dev = process.env.NODE_ENV !== 'production' ? [parseInt(process.env.REACT_APP_LOCAL_CHAINID, 10)] : []
  return [...dev, 5]
}

const useAddresses = chainId => {
  const [addresses, setAddresses] = useState()

  useEffect(() => {
    if (chainId === parseInt(process.env.REACT_APP_LOCAL_CHAINID, 10)) {
      setAddresses({
        sarcophagus: process.env.REACT_APP_LOCAL_SARCOPHAGUS_ADDRESS,
        sarcophagusToken: process.env.REACT_APP_LOCAL_SARCOPHAGUS_TOKEN_ADDRESS
      })
    } else if (chainId === 5) {
      setAddresses({
        sarcophagus: '0xAcD4684Ad0d02A5C4ce606c7951Ce949e77FC01b',
        sarcophagusToken: '0x1Ca4f48412216A886079Fd770E8026B4E2a96FB2'
      })
    }
  }, [chainId])

  return addresses
}

export {
  supportedChains,
  useAddresses
} 
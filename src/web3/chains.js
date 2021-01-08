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
        sarcophagus: process.env.REACT_APP_LOCAL_SARCOPHAGUS_ADDRESS
      })
    } else if (chainId === 5) {
      setAddresses({
        sarcophagus: '0x65411a12F5Ddc37b6f1f7355cd3fCe77499961aB'
      })
    }
  }, [chainId])

  return addresses
}

export {
  supportedChains,
  useAddresses
} 
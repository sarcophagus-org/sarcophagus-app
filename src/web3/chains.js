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
        sarcophagus: '0x1744b883C9F8aD97001D332D13744B5f8F12e3B8',
        sarcophagusToken: '0x4633b43990b41B57b3678c6F3Ac35bA75C3D8436'
      })
    }
  }, [chainId])

  return addresses
}

export {
  supportedChains,
  useAddresses
} 
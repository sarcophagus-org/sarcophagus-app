import { useState, useEffect } from 'react'

const supportedChains = () => {
  const dev = process.env.NODE_ENV !== 'production' ? [parseInt(process.env.REACT_APP_LOCAL_CHAINID, 10)] : []
  return [...dev, process.env.CHAINID]
}

const useAddresses = chainId => {
  const [addresses, setAddresses] = useState()

  useEffect(() => {
    if (chainId === parseInt(process.env.REACT_APP_LOCAL_CHAINID, 10)) {
      setAddresses({
        sarcophagus: process.env.REACT_APP_LOCAL_SARCOPHAGUS_ADDRESS,
        sarcophagusToken: process.env.REACT_APP_LOCAL_SARCOPHAGUS_TOKEN_ADDRESS
      })
    } else if (chainId === process.env.REACT_APP_CHAINID) {
      setAddresses({
        sarcophagus: process.env.REACT_APP_SARCO_CONTRACT_ADDRESS,
        sarcophagusToken: process.env.REACT_APP_SARCO_TOKEN_ADDRESS
      })
    }
  }, [chainId])

  return addresses
}

export {
  supportedChains,
  useAddresses
} 
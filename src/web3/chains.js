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
        liquidityMining: process.env.REACT_APP_LOCAL_LIQUIDITY_MINING_ADDRESS
      })
    } else if (chainId === 5) {
      setAddresses({
        liquidityMining: '0x94A4f22e2a5E56AEA1762d3f1c76C82C94e90E1e'
      })
    }
  }, [chainId])

  return addresses
}

export {
  supportedChains,
  useAddresses
} 
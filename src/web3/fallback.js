import { useState, useEffect } from 'react'
import { getDefaultProvider } from 'ethers'

const useFallbackConnect = (next) => {
  const [provider, setProvider] = useState(null)

  useEffect(() => {
    if (provider || !next) return

    setProvider(getDefaultProvider(parseInt(process.env.REACT_APP_DEFAULT_CHAIN_ID, 10)))      
  }, [provider, next])

  return provider
}

export { useFallbackConnect }
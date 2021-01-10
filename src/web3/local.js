import { useState, useEffect } from 'react'
import { ethers } from 'ethers'

const useLocalConnect = (previousProvider) => {
  const [local, setLocal] = useState(null)

  useEffect(() => {
    if (process.env.NODE_ENV === 'production' || previousProvider) {
      setLocal(null)
      return
    }

    if (local) {
      return
    }

    const provider = new ethers.providers.JsonRpcProvider(process.env.REACT_APP_LOCAL_PROVIDER_URL)
    provider.detectNetwork()
      .then(() => setLocal(provider))
      .catch(() => setLocal(null))
  }, [local, previousProvider])

  return local
}

export { useLocalConnect }

import { useState, useEffect } from 'react'
import { ethers } from 'ethers'

const useLocalConnect = (next) => {
  const [local, setLocal] = useState(null)
  const [localNext, setLocalNext] = useState(false)

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      setLocalNext(true)
      return
    }

    if (local || !next) return

    const provider = new ethers.providers.JsonRpcProvider(process.env.REACT_APP_LOCAL_PROVIDER_URL)
    provider.detectNetwork()
      .then(() => {
        setLocalNext(true)
        setLocal(provider)
      })
      .catch(() => {
        setLocalNext(true)
        setLocal(null)
      })
  }, [local, next])

  return { local, localNext }
}

export { useLocalConnect }

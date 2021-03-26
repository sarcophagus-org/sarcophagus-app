import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { toast } from 'react-toastify'
import { supportedChains } from './chains'

function useListeners(provider, web3Modal) {
  const [myProvider, setMyProvider] = useState(null)

  useEffect(() => {
    // subscribe to connect events
    web3Modal.on('connect', provider => {
      if (!supportedChains().includes(parseInt(provider.chainId))) {
        toast.dark('Switch to a supported network', { toastId: 'switchNetwork' })
        web3Modal.clearCachedProvider()
        setMyProvider(null)
      } else {
        const web3Provider = new ethers.providers.Web3Provider(provider)
        setMyProvider(web3Provider)
        toast.dark('Connected', { toastId: 'connected' })
      }
    })

    return () => {
      web3Modal.off('connect')
    }
  }, [web3Modal])

  useEffect(() => {
    if (!provider) return

    // subscribe to Network events
    provider.on('chainChanged', chainId => {
      if (!supportedChains().includes(parseInt(chainId))) {
        toast.dark('Switch to a supported network', { toastId: 'switchNetwork' })
        web3Modal.clearCachedProvider()
        setMyProvider(null)
      } else {
        window.location.reload()
      }
    })

    // subscribe to account change events
    provider.on('accountsChanged', accounts => {
      if (accounts.length === 0) {
        toast.dark('Account disconnected', { toastId: 'disconnected' })
        web3Modal.clearCachedProvider()
        setMyProvider(null)
      } else {
        toast('Account changed', { toastId: 'connected' })
        setMyProvider(null)
      }
    })

    // subscribe to provider disconnection
    provider.on('disconnect', () => {
      toast.dark('Account disconnected', { toastId: 'disconnected' })
      web3Modal.clearCachedProvider()
      setMyProvider(null)
    })

    // unsubscribe
    return () => {
      provider.removeAllListeners()
    }
  }, [provider, web3Modal])

  return myProvider
}

export { useListeners }
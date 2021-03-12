import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { toast } from 'react-toastify'
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { supportedChains } from './chains'

const toastOptions = {
  position: "bottom-right",
  hideProgressBar: false,
  closeOnClick: true,
  autoClose: 3000,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
}

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: "27e484dcd9e3efcfd25a83a78777cdf1",
    },
  },
}

const web3Modal = new Web3Modal({ providerOptions , cacheProvider: true})

const useUserSuppliedConnect = () => {
  const [userSupplied, setUserSupplied] = useState(null)
  const [ provider, setProvider ] = useState(null)

  useEffect(() => {
    if(web3Modal.cachedProvider) {
      web3Modal.connect().then(provider => {
        setProvider(provider)
      }).catch(e => {
        console.error("error connecting", e)
      })
    }

    // subscribe to connect events
    web3Modal?.on('connect', provider => {
      if (!supportedChains().includes(parseInt(provider.chainId))) {
        toast.dark('Switch to a supported network', { ...toastOptions, toastId: 'switchNetwork' })
        web3Modal.clearCachedProvider()
        setUserSupplied(null)
      } else {
        setProvider(provider)
        toast.dark('Connected', { toastId: 'connected', ...toastOptions })
      }
    })
      // subscribe to Network events
      provider?.on('chainChanged', chainId => {
        if (!supportedChains().includes(parseInt(chainId))) {
          toast.dark('Switch to a supported network', { ...toastOptions, toastId: 'switchNetwork' })
          web3Modal.clearCachedProvider()
          window.location.reload()
        } else {
          toast.dark('Network changed, reloading', { ...toastOptions, toastId: 'changedNetwork' })
          window.location.reload()
        }
      })
      
      // subscribe to account change events
      provider?.on('accountsChanged', accounts => {
        if (accounts.length === 0) {
          toast.dark('Account disconnected', { toastId: 'disconnected', ...toastOptions })
          setUserSupplied(null)
          web3Modal.clearCachedProvider()
          window.location.reload()
        } else {
          toast.dark('Account Changed, reloading...', { toastId: 'disconnected', ...toastOptions })
          window.location.reload()
        }
      })
      
      // subscribe to provider disconnection
      provider?.on("disconnect", error => {
        toast.error('Disconnected from wallet', {
          ...toastOptions,
          toastId: 'Disconnected'
        })
      });

      // unsubscribe
      return () => {
        provider?.removeAllListeners()
      }
    
}, [ provider ])

useEffect(() => {
  // set web3Provider
  if(!!provider) {
    const web3Provider = new ethers.providers.Web3Provider(provider)
    setUserSupplied(web3Provider)
  }
}, [ provider ])

return { userSupplied, connect }
}

const connect = async () => {
  await web3Modal.connect()

}

export { useUserSuppliedConnect, connect }
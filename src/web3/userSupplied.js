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

  useEffect(() => {
    if(web3Modal.cachedProvider) {
      web3Modal.connect()
    }

    // subscribe to connect events
    web3Modal.on('connect', provider => {
      const web3Provider = new ethers.providers.Web3Provider(provider)
      setUserSupplied(web3Provider)
      toast.dark('Connected', { toastId: 'connected', ...toastOptions })

      // subscribe to Network events
      provider.on('chainChanged', chainId => {
        if (!supportedChains().includes(parseInt(chainId))) {
          toast.dark('Switch to a supported network', { ...toastOptions, toastId: 'switchNetwork' })
          setUserSupplied(null)
        } else {
          toast.dark('Network changed', { ...toastOptions, toastId: 'changedNetwork' })
          web3Modal.connect()
        }
      })
      
      // subscribe to account change events
      provider.on('accountsChanged', accounts => {
        if (accounts.length === 0) {
          toast.dark('Account disconnected', { toastId: 'disconnected', ...toastOptions })
          setUserSupplied(null)
        } else {
          toast.dark('Account Changed', { toastId: 'disconnected', ...toastOptions })
          web3Modal.connect()
        }
      })
      
      // subscribe to provider disconnection
      provider.on("disconnect", error => {
        toast.error('Disconnected from wallet', {
          ...toastOptions,
          toastId: 'Disconnected'
        })
      });

      // unsubscribe
      return () => {
        provider.off('chainChanged')
        provider.off('disconnect')
        provider.off('accountsChanged')
      }
    })
    
}, [])


return { userSupplied }
}

const connect = async () => {
  web3Modal.connect().catch(console.error) 
}

export { useUserSuppliedConnect, connect }
import { useEffect, useState } from 'react'
import { ethers, getDefaultProvider } from 'ethers'
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { supportedChains } from './chains'
import { useListeners } from './useListeners'

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: process.env.REACT_APP_INFURA_API_KEY,
    },
  },
}

const web3Modal = new Web3Modal({
  providerOptions,
  cacheProvider: true,
  theme: 'dark'
})

const defaultName = 'not connected'
const defaultWeb3 = {
  name: defaultName,
  account: false,
  chainId: null,
  provider: null,
  signerOrProvider: null,
}

function makeInjectedProvider(web3Provider) {
  return {
    name: 'injected provider',
    account: web3Provider.provider.selectedAddress,
    chainId: parseInt(web3Provider.provider.chainId),
    provider: web3Provider,
    signerOrProvider: web3Provider.getSigner(),
  }
}

function getInjectedProvider(web3Modal) {
  return new Promise((resolve, reject) => {
    web3Modal.connect().then(userSuppliedProvider => {
      const web3Provider = new ethers.providers.Web3Provider(userSuppliedProvider)
      resolve(makeInjectedProvider(web3Provider))
    }).catch(reject)
  })
}

function getLocalProvider() {
  const localProvider = new ethers.providers.JsonRpcProvider(process.env.REACT_APP_LOCAL_PROVIDER_URL)
  return new Promise((resolve, reject) => {
    localProvider.detectNetwork().then(network => {
      resolve({
        name: 'local provider',
        account: false,
        chainId: network.chainId,
        provider: localProvider,
        signerOrProvider: localProvider,
      })
    }).catch(reject)
  })
}

function getFallbackProvider() {
  const providerKeys = {}
  if (process.env.REACT_APP_INFURA_API_KEY) providerKeys.infura = process.env.REACT_APP_INFURA_API_KEY
  if (process.env.REACT_APP_ALCHEMY_API_KEY) providerKeys.alchemy = process.env.REACT_APP_ALCHEMY_API_KEY
  if (process.env.REACT_APP_ETHERSCAN_API_KEY) providerKeys.etherscan = process.env.REACT_APP_ETHERSCAN_API_KEY

  const defaultProvider = getDefaultProvider(parseInt(process.env.REACT_APP_CHAINID, 10), providerKeys)

  return {
    name: 'fallback provider',
    account: false,
    chainId: defaultProvider.network.chainId,
    provider: defaultProvider,
    signerOrProvider: defaultProvider,
  }
}

function useProvider() {
  const [web3Provider, setWeb3Provider] = useState(defaultWeb3)

  const reloadedProvider = useListeners(web3Provider.provider?.provider, web3Modal)
  useEffect(() => {
    if (!reloadedProvider) {
      setWeb3Provider(defaultWeb3)
    } else {
      setWeb3Provider(makeInjectedProvider(reloadedProvider))
    }
  }, [reloadedProvider])

  useEffect(() => {
    if (web3Provider.name !== defaultName) return

    if (web3Modal.cachedProvider || (web3Provider.signerOrProvider && supportedChains().includes(parseInt(web3Provider.signerOrProvider.chainId)))) {
      getInjectedProvider(web3Modal)
        .then(setWeb3Provider)
        .catch(console.error)
    } else if (process.env.NODE_ENV === 'development') {
      getLocalProvider()
        .then(setWeb3Provider)
        .catch(() => setWeb3Provider(getFallbackProvider()))
    } else {
      setWeb3Provider(getFallbackProvider())
    }
  }, [web3Provider.name, web3Provider.signerOrProvider])

  return web3Provider
}

async function connect() {
  await web3Modal.connect()
}

export { useProvider, connect }
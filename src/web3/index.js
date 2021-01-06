import { useEffect, useState, createContext, useContext } from 'react'
import { useFallbackConnect } from './fallback'
import { useLocalConnect } from './local'
import { useUserSuppliedConnect } from './userSupplied'
import { supportedChains } from './chains'

let context

const createWeb3Root = () => {
  context = createContext()

  context.displayName = 'Web3 Provider'
  const Provider = context.Provider

  return ({ children }) => {
    const { userSupplied, userSuppliedNext } = useUserSuppliedConnect()
    const { local, localNext } = useLocalConnect(userSuppliedNext)
    const fallback = useFallbackConnect(localNext)

    const defaultName = 'Not connected'

    const [web3, setWeb3] = useState({
      name: defaultName,
      account: false,
      chainId: null,
      provider: null,
      signerOrProvider: null,
    })

    useEffect(() => {
      if (userSupplied.active && userSupplied.account && supportedChains().includes(userSupplied.chainId)) {
        setWeb3({
          name: 'User supplied provider',
          account: userSupplied.account,
          chainId: userSupplied.chainId,
          provider: userSupplied.library,
          signerOrProvider: userSupplied.library.getSigner(),
        })
      } else if (local) {
        local.detectNetwork().then(network => {
          setWeb3({
            name: 'Local provider',
            account: false,
            chainId: network.chainId,
            provider: local,
            signerOrProvider: local,
          })
        }).catch(console.error)
      } else if (fallback) {
        setWeb3({
          name: 'Fallback provider',
          account: false,
          chainId: fallback.network.chainId,
          provider: fallback,
          signerOrProvider: fallback,
        })
      } else {
        setWeb3({
          name: defaultName,
          account: false,
          chainId: null,
          provider: null,
          signerOrProvider: null
        })
      }
    }, [userSupplied, local, fallback])

    return <Provider value={web3}>{children}</Provider>
  }
}

const Web3Provider = createWeb3Root()

const useWeb3 = () => {
  return useContext(context)
}

export { Web3Provider, useWeb3 }

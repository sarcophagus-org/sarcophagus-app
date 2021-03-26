import { createContext, useContext } from 'react'
import { useProvider } from './useProvider.js'

let context

function createWeb3Root() {
  context = createContext()

  context.displayName = 'Web3 Provider'
  const Provider = context.Provider

  return function ({ children }) {
    const web3Provider = useProvider()

    return (
      <Provider value={web3Provider}>
        {children}
      </Provider>
    )
  }
}

const Web3Provider = createWeb3Root()

function useWeb3() {
  return useContext(context)
}

export { Web3Provider, useWeb3 }
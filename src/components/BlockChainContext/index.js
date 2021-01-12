import { createContext, useContext } from 'react'
import { useArcheologists } from './useArchaeologists'
import { useDecimals, useSarcophagusContract, useSarcophagusTokenContract } from './contracts'
import { useSarcophagus } from './useSarcophagus'
let context

const createDataRoot = () => {
  context = createContext()

  context.displayName = 'Data Provider'
  const Provider = context.Provider

  
  return ({ children }) => {
    const sarcophagusContract = useSarcophagusContract()
    const sarcophagusTokenContract = useSarcophagusTokenContract()

    const { archaeologists } = useArcheologists(sarcophagusContract)
    const createSarcophagus = useSarcophagus(sarcophagusContract)

    const decimals = useDecimals(sarcophagusTokenContract)
  
    const dataContext = {
      sarcophagusContract,
      sarcophagusTokenContract,
      archaeologists,
      createSarcophagus,
      decimals
    }
    return <Provider value={dataContext}>{children}</Provider>
  }
}

const DataProvider = createDataRoot()

const useData = () => {
  return useContext(context)
}

export { DataProvider, useData }
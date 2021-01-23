import { createContext, useContext } from 'react'
import { useArcheologists } from './useArchaeologists'
import { useSarcophagusContract, useSarcophagusTokenContract } from './contracts'
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
    const { createSarcophagus } = useSarcophagus(sarcophagusTokenContract, sarcophagusContract) // Should return status updates and will need to update button
  
    const dataContext = {
      sarcophagusContract,
      sarcophagusTokenContract,
      archaeologists,
      createSarcophagus
    }
    return <Provider value={dataContext}>{children}</Provider>
  }
}

const DataProvider = createDataRoot()

const useData = () => {
  return useContext(context)
}

export { DataProvider, useData }
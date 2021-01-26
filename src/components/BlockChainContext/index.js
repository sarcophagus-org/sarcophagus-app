import { createContext, useContext } from 'react'
import { useArcheologists } from './useArchaeologists'
import { useSarcophagusContract, useSarcophagusTokenContract } from './contracts'
import { useSarcophagus } from './useSarcophagus'
import { useSarcoAllowance } from './myBalances'
import { useSarcophagi } from './useSarcophagi'
let context

const createDataRoot = () => {
  context = createContext()

  context.displayName = 'Data Provider'
  const Provider = context.Provider

  
  return ({ children }) => {
    const sarcophagusContract = useSarcophagusContract()
    const sarcophagusTokenContract = useSarcophagusTokenContract()

    const { archaeologists } = useArcheologists(sarcophagusContract)
    const { createSarcophagus } = useSarcophagus(sarcophagusTokenContract, sarcophagusContract)
    const { sarcophagi } = useSarcophagi(sarcophagusContract)
    console.log("🚀 ~ file: index.js ~ line 23 ~ return ~ sarcophagi", sarcophagi)
    const { sarcoAllowance } = useSarcoAllowance(sarcophagusContract, sarcophagusTokenContract)
    
    const dataContext = {
      sarcophagusContract,
      sarcophagusTokenContract,
      archaeologists,
      sarcoAllowance,
      createSarcophagus,
      sarcophagi,
    }
    return <Provider value={dataContext}>{children}</Provider>
  }
}

const DataProvider = createDataRoot()

const useData = () => {
  return useContext(context)
}

export { DataProvider, useData }
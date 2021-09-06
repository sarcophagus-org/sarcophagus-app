import { createContext, useContext } from 'react'
import { useData } from '../BlockChainContext'
import { useArcheologists } from './useArchaeologists'
import { useArchaeologistsCheck } from './useArchaeologistsCheck'
let context

const createDataRoot = () => {
  context = createContext()
  context.displayName = 'Data Provider'
  const Provider = context.Provider
    
  return ({ children }) => {
    const { sarcophagusContract } = useData()
    const { rawArchaeologists, getArchaeologistCount } = useArcheologists(sarcophagusContract)
    const { archaeologists } = useArchaeologistsCheck(sarcophagusContract, rawArchaeologists)

    const dataContext = {
      getArchaeologistCount,
      archaeologists:  archaeologists || rawArchaeologists,
    }

    return <Provider value={dataContext}>{children}</Provider>
  }
}

const ArchaeologistsDataProvider = createDataRoot()

const useArchData = () => {
  return useContext(context)
}

export { ArchaeologistsDataProvider, useArchData }
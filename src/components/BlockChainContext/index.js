import { createContext, useContext } from 'react'
import { useArcheologists } from './useArchaeologists'
import { useSarcophagusContract, useSarcophagusTokenContract } from './contracts'
import { useSarcophagus } from './useSarcophagus'
import { useSarcoAllowance, useSarcoBalance } from './myBalances'
import { useCurrentBlock } from './blocks'

let context

const createDataRoot = () => {
  context = createContext()
  context.displayName = 'Data Provider'
  const Provider = context.Provider

  
  return ({ children }) => {
    const sarcophagusContract = useSarcophagusContract()
    const sarcophagusTokenContract = useSarcophagusTokenContract()

    const { archaeologists } = useArcheologists(sarcophagusContract)
    
    const { currentBlock } = useCurrentBlock()
    
    const allowance = useSarcoAllowance(sarcophagusContract, sarcophagusTokenContract)
    const balance = useSarcoBalance(sarcophagusTokenContract, currentBlock)
    const { createSarcophagus, updateSarcophagus, cancelSarcophagus, cleanSarcophagus, rewrapSarcophagus, burySarcophagus } = useSarcophagus(sarcophagusContract)



    const dataContext = {
      sarcophagusContract,
      sarcophagusTokenContract,
      archaeologists,
      createSarcophagus,
      updateSarcophagus,
      allowance,
      balance,
      cancelSarcophagus, 
      cleanSarcophagus, 
      rewrapSarcophagus, 
      burySarcophagus
    }
    return <Provider value={dataContext}>{children}</Provider>
  }
}

const DataProvider = createDataRoot()

const useData = () => {
  return useContext(context)
}

export { DataProvider, useData }
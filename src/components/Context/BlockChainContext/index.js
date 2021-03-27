import { createContext, useContext } from 'react'
import { useSarcophagusContract, useSarcophagusTokenContract } from './contracts'
import { useSarcoAllowance, useSarcoBalance } from './myBalances'
import { useCurrentBlock } from './blocks'

let context

const createDataRoot = () => {
  context = createContext()
  context.displayName = 'Data Provider'
  const Provider = context.Provider

  
  return ({ children }) => {
    const sarcophagusContract = useSarcophagusContract()
    const sarcophagusTokenContract = useSarcophagusTokenContract(sarcophagusContract)

    const { currentBlock } = useCurrentBlock()
    
    const allowance = useSarcoAllowance(sarcophagusContract, sarcophagusTokenContract)
    const balance = useSarcoBalance(sarcophagusTokenContract, currentBlock)

    const dataContext = {
      sarcophagusContract,
      sarcophagusTokenContract,
      allowance,
      balance,
    }
    return <Provider value={dataContext}>{children}</Provider>
  }
}

const DataProvider = createDataRoot()

const useData = () => {
  return useContext(context)
}

export { DataProvider, useData }
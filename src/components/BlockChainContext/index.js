import { createContext, useContext } from 'react'
import { useArcheologists } from './useArchaeologists'
import { useSarcophagusContract, useSarcophagusTokenContract } from './contracts'
import { useSarcophagus } from './useSarcophagus'
import { useSarcoAllowance, useSarcoBalance } from './myBalances'
import { useCurrentBlock } from './blocks'
import { useEmbalmerSarcophagi } from './useEmbalmerSarcophagi'
import { useRecipientSarcophagi } from './useRecipientSarcophagi'
import { useArchivedSarcophagi } from './useArchivedSarcophagi'
import { useArchaeologistsCheck } from './useArchaeologistsCheck'

let context

const createDataRoot = () => {
  context = createContext()
  context.displayName = 'Data Provider'
  const Provider = context.Provider

  
  return ({ children }) => {
    const sarcophagusContract = useSarcophagusContract()
    const sarcophagusTokenContract = useSarcophagusTokenContract()
    
    const { rawArchaeologists, getArchaeologistCount } = useArcheologists(sarcophagusContract)
    const { archaeologists } = useArchaeologistsCheck(sarcophagusContract, rawArchaeologists)
    const { embalmerSarcophagi, embalmerAllSarcophagi, pendingSarcophagi, checkStorage} = useEmbalmerSarcophagi(sarcophagusContract)
    const { recipientSarcophagi, recipientAllSarcophagi, getRecipientSarcophagi } = useRecipientSarcophagi(sarcophagusContract)

    const { archivedSarcophagi } = useArchivedSarcophagi(embalmerAllSarcophagi, recipientAllSarcophagi)
    const { currentBlock } = useCurrentBlock()
    
    const allowance = useSarcoAllowance(sarcophagusContract, sarcophagusTokenContract)
    const balance = useSarcoBalance(sarcophagusTokenContract, currentBlock)
    const { createSarcophagus, updateSarcophagus, cancelSarcophagus, cleanSarcophagus, rewrapSarcophagus, burySarcophagus, accuseArchaeologist } = useSarcophagus(sarcophagusContract)

    const dataContext = {
      sarcophagusContract,
      sarcophagusTokenContract,
      archaeologists,
      accuseArchaeologist,
      createSarcophagus,
      updateSarcophagus,
      allowance,
      balance,
      cancelSarcophagus, 
      cleanSarcophagus, 
      rewrapSarcophagus, 
      burySarcophagus,
      embalmerSarcophagi, 
      archivedSarcophagi,
      recipientSarcophagi,
      pendingSarcophagi,
      refresh: () => {
        checkStorage()
        getRecipientSarcophagi()
        getArchaeologistCount()
      }
    }
    return <Provider value={dataContext}>{children}</Provider>
  }
}

const DataProvider = createDataRoot()

const useData = () => {
  return useContext(context)
}

export { DataProvider, useData }
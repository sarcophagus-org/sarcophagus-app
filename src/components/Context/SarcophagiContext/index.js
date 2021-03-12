import { createContext, useContext } from 'react'
import { useData } from '../BlockChainContext'
import { useArchivedSarcophagi } from './useArchivedSarcophagi'
import { useEmbalmerSarcophagi } from './useEmbalmerSarcophagi'
import { useRecipientSarcophagi } from './useRecipientSarcophagi'
import { useSarcophagus } from './useSarcophagus'
let context

const createDataRoot = () => {
  context = createContext()
  context.displayName = 'Data Provider'
  const Provider = context.Provider

  return ({ children }) => {
    const { sarcophagusContract } = useData()
    const { embalmerSarcophagi, embalmerAllSarcophagi, pendingSarcophagi, checkStorage} = useEmbalmerSarcophagi(sarcophagusContract)
    const { recipientSarcophagi, recipientAllSarcophagi, getRecipientSarcophagi } = useRecipientSarcophagi(sarcophagusContract)
    const { archivedSarcophagi } = useArchivedSarcophagi(embalmerAllSarcophagi, recipientAllSarcophagi)
    const { createSarcophagus, updateSarcophagus, cancelSarcophagus, cleanSarcophagus, rewrapSarcophagus, burySarcophagus, accuseArchaeologist } = useSarcophagus(sarcophagusContract)
    
    const dataContext = {
      createSarcophagus,
      updateSarcophagus,
      cancelSarcophagus, 
      cleanSarcophagus, 
      rewrapSarcophagus, 
      burySarcophagus,
      archivedSarcophagi,
      pendingSarcophagi,
      embalmerSarcophagi : embalmerSarcophagi || [], 
      recipientSarcophagi: recipientSarcophagi || [],
      accuseArchaeologist,
      checkStorage,
      getRecipientSarcophagi,
    }
    
    return <Provider value={dataContext}>{children}</Provider>
  }
}

const SarcophagiDataProvider = createDataRoot()

const useSarcophagiData = () => {
  return useContext(context)
}

export { SarcophagiDataProvider, useSarcophagiData }
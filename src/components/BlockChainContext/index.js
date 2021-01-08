import { createContext, useContext, useState, useEffect } from 'react'
import { useArcheologists } from './archeologists'
import { useSarcophagusContract } from './contracts'
let context

const createDataRoot = () => {
  context = createContext()

  context.displayName = 'Data Provider'
  const Provider = context.Provider

  
  return ({ children }) => {
    const sarcophagusContract = useSarcophagusContract()
    const { archeaologists } = useArcheologists(sarcophagusContract)
    const dataContext = {
      archeaologists: archeaologists
    }
    return <Provider value={dataContext}>{children}</Provider>
  }
}

const DataProvider = createDataRoot()

const useData = () => {
  return useContext(context)
}

export { DataProvider, useData }
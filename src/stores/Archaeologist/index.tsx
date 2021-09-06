import { Context, createContext, useContext } from "react";
import { useBlockChainStore } from "../BlockChain";
import { useArcheologists } from "./useArchaeologists";
import { useArchaeologistsFilter } from "./useArchaeologistsFilters";

let context: Context<any>;

const createDataRoot = () => {
  context = createContext(undefined);
  context.displayName = "Data Provider";
  const Provider = context.Provider;

  return ({ children }: { children: JSX.Element[] }) => {
    const { sarcophagusContract } = useBlockChainStore();
    const {archaeologists, loadArchaeologists} = useArcheologists(sarcophagusContract)

    // filters archaeologists
    const {filteredArchaeologists} = useArchaeologistsFilter(archaeologists)
    const dataContext = {
      filteredArchaeologists,
      loadArchaeologists
    };

    return <Provider value={dataContext}>{children}</Provider>;
  };
};

const ArchaeologistsProvider = createDataRoot();

const useSarcophagiStore = () => {
  return useContext(context);
};

export { ArchaeologistsProvider, useSarcophagiStore };

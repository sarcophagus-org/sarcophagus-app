import { Context, createContext, useContext } from "react";
import { useBlockChainStore } from "../BlockChain";
import { IArchaeologistsStore } from "./archaeologist.interfaces";
import { useArcheologists } from "./useArchaeologists";
import { useArchaeologistsFilter } from "./useArchaeologistsFilters";
import useArchaeologistStats from "./useArchaeologistsStats";

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
    // archaeologists with stats
    const { archaeologistsWithStats } = useArchaeologistStats(sarcophagusContract, filteredArchaeologists)

    const dataContext: IArchaeologistsStore = {
      archaeologistsWithStats,
      archaeologists,
      filteredArchaeologists,
      loadArchaeologists
    };

    return <Provider value={dataContext}>{children}</Provider>;
  };
};

const ArchaeologistsProvider = createDataRoot();

const useArchaeologistsStore = () => {
  return useContext(context);
};

export { ArchaeologistsProvider, useArchaeologistsStore };

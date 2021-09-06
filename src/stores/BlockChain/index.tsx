import { Context, createContext, useContext } from "react";
import { useSarcoAllowance, useSarcoBalance } from "./useBalances";
import { useCurrentBlock } from "./useBlocks";
import { useSarcophagusContract, useSarcophagusTokenContract } from "./useContracts";

let context: Context<any>;

const createDataRoot = () => {
  context = createContext(undefined);
  context.displayName = "Data Provider";
  const Provider = context.Provider;

  return ({ children }: { children: JSX.Element }) => {
    const sarcophagusContract = useSarcophagusContract()
    const sarcophagusTokenContract = useSarcophagusTokenContract(sarcophagusContract)

    const currentBlock = useCurrentBlock()
    
    const allowance = useSarcoAllowance(sarcophagusContract, sarcophagusTokenContract)
    const balance = useSarcoBalance(sarcophagusTokenContract, currentBlock)

    const dataContext = {
      sarcophagusContract,
      sarcophagusTokenContract,
      allowance,
      balance,
    }

    return <Provider value={dataContext}>{children}</Provider>;
  };
};

const BlockChainProvider = createDataRoot();

const useBlockChainStore = () => {
  return useContext(context);
};

export { BlockChainProvider, useBlockChainStore };

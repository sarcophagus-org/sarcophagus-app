import { Context, createContext, useContext } from "react";

let context: Context<any>;

const createDataRoot = () => {
  context = createContext(undefined);
  context.displayName = "Data Provider";
  const Provider = context.Provider;

  return ({ children }: { children: JSX.Element }) => {
    const dataContext = {};

    return <Provider value={dataContext}>{children}</Provider>;
  };
};

const ArchaeologistProvider = createDataRoot();

const useSarcophagiStore = () => {
  return useContext(context);
};

export { ArchaeologistProvider, useSarcophagiStore };

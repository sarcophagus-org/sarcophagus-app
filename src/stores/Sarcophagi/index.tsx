import { Context, createContext, useContext } from "react";
import { checkReceivedStatus } from "../../components/shared/components.utils";
import { Sarcophagus } from "./sarcophagi.interfaces";
import useContractMethods from "./useContractMethods";
import useEmbalmer from "./useEmbalmer";
import useRecipient from "./useRecipient";

let context: Context<any>;

const createDataRoot = () => {
  context = createContext(undefined);
  context.displayName = "Data Provider";
  const Provider = context.Provider;

  return ({ children }: { children: JSX.Element }) => {
    const { allEmbalmerSarcophagi, isEmbalmerSarcophagiLoaded, loadEmbalmerSarcophagi } = useEmbalmer();
    const { allRecipientSarcophagi, isRecipientSarcophagiLoaded, loadRecipientSarcophagi } = useRecipient();
    const contractMethods = useContractMethods();
    // filters out only active embalmer sarcophagi
    const filterEmbalmer = (sarcophagus: Sarcophagus) => sarcophagus.state === 1;

    // filters out active recipient sarcophagi
    const filterRecipient = (sarcophagus: Sarcophagus) => {
      const check = checkReceivedStatus(
        sarcophagus.resurrectionTime,
        sarcophagus.resurrectionWindow,
        sarcophagus.privateKey,
        sarcophagus.state
      );
      return check.isVisible;
    };

    // filters out archived sarcophagi from embalmer and recipient lists
    const filterArchivedSarcophagi = (
      embalmerSarcophagi: Sarcophagus[],
      recipientSarcophagi: Sarcophagus[]
    ) => {
      if (!embalmerSarcophagi.length && !recipientSarcophagi.length) return [];
      const stateOfTwoFilter = (sarcophagus: Sarcophagus) => sarcophagus.state === 2;
      const filteredEmbalmer = embalmerSarcophagi.filter(stateOfTwoFilter);
      const filteredRecipient = recipientSarcophagi.filter(stateOfTwoFilter);
      // creates a new array filtering out the duplicates
      const archivedSarcophagi: Sarcophagus[] = Array.from(
        [...filteredEmbalmer, ...filteredRecipient]
          .reduce(
            (acc: any, item: any) =>
              item && item["AssetDoubleHash"] && acc.set(item["AssetDoubleHash"], item),
            new Map()
          )
          .values()
      );
      return archivedSarcophagi;
    };

    const loadSarcophagi = async () => {
      await loadEmbalmerSarcophagi();
      await loadRecipientSarcophagi();
    };

    const dataContext: any = {
      ...contractMethods,
      embalmerSarcophagi: allEmbalmerSarcophagi.filter(filterEmbalmer),
      recipientSarcophagi: allRecipientSarcophagi.filter(filterRecipient),
      archivedSarcophagi: filterArchivedSarcophagi(allEmbalmerSarcophagi, allRecipientSarcophagi),
      isSarcophagiLoaded: isEmbalmerSarcophagiLoaded && isRecipientSarcophagiLoaded,
      loadRecipientSarcophagi,
      loadEmbalmerSarcophagi,
      loadSarcophagi,
    };
    return <Provider value={dataContext}>{children}</Provider>;
  };
};

const SarcophagiProvider = createDataRoot();

const useSarcophagiStore = () => {
  return useContext(context);
};

export { SarcophagiProvider, useSarcophagiStore };

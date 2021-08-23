import { createContext, useContext } from "react";
import { useData } from "../BlockChainContext";
import { useArchivedSarcophagi } from "./useArchivedSarcophagi";
import { useEmbalmerSarcophagi } from "./useEmbalmerSarcophagi";
import { useRecipientSarcophagi } from "./useRecipientSarcophagi";
import { useSarcophagus } from "./useSarcophagus";
let context;

const createDataRoot = () => {
  context = createContext();
  context.displayName = "Data Provider";
  const Provider = context.Provider;

  return ({ children }) => {
    const { sarcophagusContract } = useData();
    // loads embalmers sarcophagi
    const { embalmerSarcophagi, embalmerAllSarcophagi, getEmbalmerSarcophagi } =
      useEmbalmerSarcophagi(sarcophagusContract);

    // loads recieved sarcophagi
    const {
      recipientSarcophagi,
      recipientAllSarcophagi,
      getRecipientSarcophagi,
    } = useRecipientSarcophagi(sarcophagusContract);

    // filters just archived sarcophagi from both lists
    const { archivedSarcophagi } = useArchivedSarcophagi(
      embalmerAllSarcophagi,
      recipientAllSarcophagi
    );

    // handles contract methods
    const {
      createSarcophagus,
      updateSarcophagus,
      cancelSarcophagus,
      cleanSarcophagus,
      rewrapSarcophagus,
      burySarcophagus,
      accuseArchaeologist,
      createData,
      setCreateData,
      pendingSarcophagi,
    } = useSarcophagus(sarcophagusContract);

    const dataContext = {
      createSarcophagus,
      updateSarcophagus,
      cancelSarcophagus,
      cleanSarcophagus,
      rewrapSarcophagus,
      burySarcophagus,
      accuseArchaeologist,
      getRecipientSarcophagi,
      getEmbalmerSarcophagi,
      createData,
      setCreateData,
      pendingSarcophagi,
      archivedSarcophagi,
      embalmerSarcophagi,
      recipientSarcophagi,
      embalmerSarcophagiCount: embalmerSarcophagi.length,
      recipientSarcophagiCount: recipientSarcophagi.length,
      archivedSarcophagiCount: archivedSarcophagi.length,
    };

    return <Provider value={dataContext}>{children}</Provider>;
  };
};

const SarcophagiDataProvider = createDataRoot();

const useSarcophagiData = () => {
  return useContext(context);
};

export { SarcophagiDataProvider, useSarcophagiData };

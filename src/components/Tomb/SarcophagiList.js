import React from "react";
import { Route, useRouteMatch } from "react-router-dom";
import Tabs from "./Tabs";
import { useSarcophagiData } from "../Context/SarcophagiContext";
import { useArchData } from "../Context/ArchaeologistContext";
import Embalmer from "./Embalmer";
import Recipient from "./Recipient";
import Archived from "./Archived";

const SarcophagiList = () => {
  const match = useRouteMatch();
  const {
    getRecipientSarcophagi,
    embalmerSarcophagiCount,
    getEmbalmerSarcophagi,
    recipientSarcophagiCount,
    archivedSarcophagiCount,
  } = useSarcophagiData();
  const { getArchaeologistCount } = useArchData();

  const refresh = () => {
    getEmbalmerSarcophagi();
    getRecipientSarcophagi();
    getArchaeologistCount();
  };
  return (
    <div className="border-t border-gray-500 md:border-none mt-8 md:mt-0 pt-8 md:pt-0 w-full overflow-x-scroll hide-scrollbar max-w-128">
      <Tabs
        embalmerCount={embalmerSarcophagiCount}
        recipientCount={recipientSarcophagiCount}
        archivedCount={archivedSarcophagiCount}
      />

      <div className="mt-8">
        <Route path={`${match.path}`} exact>
          <Embalmer refresh={refresh} />
        </Route>
        <Route path={`${match.path}/resurrect`}>
          <Recipient refresh={refresh} />
        </Route>
        <Route path={`${match.path}/archive`}>
          <Archived refresh={refresh} />
        </Route>
      </div>
    </div>
  );
};
export default SarcophagiList;

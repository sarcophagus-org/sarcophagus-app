import React from "react";
import { useSarcophagiData } from "../../Context/SarcophagiContext";
import ArchivedSarcophagusWrapper from "./SarcophagusWrapper";

const Archived = ({ refresh }) => {
  const { archivedSarcophagi } = useSarcophagiData();

  return archivedSarcophagi?.map((sarcophagus, i) => (
    <ArchivedSarcophagusWrapper
      key={sarcophagus.archaeologist + i.toString()}
      sarcophagus={sarcophagus}
      refresh={refresh}
    />
  ));
};

export default Archived;

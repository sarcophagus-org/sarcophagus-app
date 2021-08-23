import React from "react";
import { useSarcophagiData } from "../../Context/SarcophagiContext";
import RecipientSarcophagusWrapper from "./SarcophagusWrapper";

const Recipient = ({ refresh }) => {
  const { recipientSarcophagi } = useSarcophagiData();
  
  return recipientSarcophagi.map((sarcophagus, i) => (
    <RecipientSarcophagusWrapper
      key={sarcophagus.archaeologist + i.toString()}
      sarcophagus={sarcophagus}
      refresh={refresh}
    />
  ));
};

export default Recipient;

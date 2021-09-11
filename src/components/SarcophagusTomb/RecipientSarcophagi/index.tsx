import { useState } from "react";
import { useSarcophagiStore } from "../../../stores/Sarcophagi";
import { ISarcophagus, ISarcophagusStore } from "../../../stores/Sarcophagi/sarcophagi.interfaces";
import useCheckRecipientSarcophagi from "../hooks/useCheckRecipientStatus";
import SarcophagusContainer from "../shared/SarcophagusContainer";
import { SarcophagusStatus } from "../tomb.enums";

const RecipientSarcophagus = ({ sarcophagus }: { sarcophagus: ISarcophagus }) => {
  const { sarcophagusStatus } = useCheckRecipientSarcophagi(sarcophagus);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <SarcophagusContainer
      status={sarcophagusStatus}
      setStatus={() => null}
      toggleExpansion={() => setIsExpanded((expanded: boolean) => !expanded)}
      sarcophagus={sarcophagus}
      isExpandable={sarcophagusStatus === SarcophagusStatus.Unwrapped}
      isExpanded={isExpanded}
    />
  );
};

const RecipientSarcophagi = () => {
  const sarcophagiStore: ISarcophagusStore = useSarcophagiStore();
  if (!sarcophagiStore.isSarcophagiLoaded) return null;
  return (
    <div>
      {sarcophagiStore.recipientSarcophagi.map((sarcophagus: ISarcophagus, index: number) => (
        <RecipientSarcophagus key={sarcophagus.name + index} sarcophagus={sarcophagus} />
      ))}
    </div>
  );
};

export default RecipientSarcophagi;

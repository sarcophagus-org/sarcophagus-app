import { useState } from "react";
import { useSarcophagiStore } from "../../../stores/Sarcophagi";
import { Sarcophagus, SarcophagusStore } from "../../../stores/Sarcophagi/sarcophagi.interfaces";
import { SarcophagusStatus } from "../../../types/sarcophagusTomb";
import Loader from "../../shared/Loader";
import useCheckRecipientSarcophagi from "../hooks/useCheckRecipientStatus";
import SarcophagusContainer from "../shared/SarcophagusContainer";

const RecipientSarcophagus = ({ sarcophagus }: { sarcophagus: Sarcophagus }) => {
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
  const sarcophagiStore: SarcophagusStore = useSarcophagiStore();
  if (!sarcophagiStore.isSarcophagiLoaded) {
    return <Loader />;
  }
  return (
    <div>
      {sarcophagiStore.recipientSarcophagi.map((sarcophagus: Sarcophagus, index: number) => (
        <RecipientSarcophagus key={sarcophagus.name + index} sarcophagus={sarcophagus} />
      ))}
    </div>
  );
};

export default RecipientSarcophagi;

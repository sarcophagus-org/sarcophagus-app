import { useSarcophagiStore } from "../../../stores/Sarcophagi";
import { Sarcophagus, SarcophagusStore } from "../../../stores/Sarcophagi/sarcophagi.interfaces";
import Loader from "../../shared/Loader";
import { useCheckArchivedStatus } from "../hooks/useArchivedStatus";
import SarcophagusContainer from "../shared/SarcophagusContainer";

const ArchivedSarcophagus = ({ sarcophagus }: { sarcophagus: Sarcophagus }) => {
  const { sarcophagusStatus } = useCheckArchivedStatus(sarcophagus);
  return (
    <SarcophagusContainer
      status={sarcophagusStatus}
      setStatus={() => null}
      toggleExpansion={() => null}
      sarcophagus={sarcophagus}
      isExpandable={false}
      isExpanded={false}
    />
  );
};

const ArchivedSarcophagi = () => {
  const sarcophagiStore: SarcophagusStore = useSarcophagiStore();
  if (!sarcophagiStore.isSarcophagiLoaded) {
    return <Loader />;
  }
  return (
    <div>
      {sarcophagiStore.archivedSarcophagi.map((sarcophagus: Sarcophagus, index: number) => (
        <ArchivedSarcophagus key={sarcophagus.name + index} sarcophagus={sarcophagus} />
      ))}
    </div>
  );
};

export default ArchivedSarcophagi;

import { useSarcophagiStore } from "../../../stores/Sarcophagi";
import { ISarcophagus, ISarcophagusStore } from "../../../stores/Sarcophagi/sarcophagi.interfaces";
import { useCheckArchivedStatus } from "../hooks/useArchivedStatus";
import SarcophagusContainer from "../shared/SarcophagusContainer";

const ArchivedSarcophagus = ({ sarcophagus }: { sarcophagus: ISarcophagus }) => {
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
  const sarcophagiStore: ISarcophagusStore = useSarcophagiStore();
  if (!sarcophagiStore.isSarcophagiLoaded) return null;
  return (
    <div>
      {sarcophagiStore.archivedSarcophagi.map((sarcophagus: ISarcophagus, index: number) => (
        <ArchivedSarcophagus key={sarcophagus.name + index} sarcophagus={sarcophagus} />
      ))}
    </div>
  );
};

export default ArchivedSarcophagi;

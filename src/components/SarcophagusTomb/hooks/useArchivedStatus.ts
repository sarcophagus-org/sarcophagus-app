import { useEffect, useState } from "react";
import { Sarcophagus } from "../../../stores/Sarcophagi/sarcophagi.interfaces";
import { ArchaeologistsStore } from "../../../stores/Archaeologist/archaeologist.interfaces";
import { useArchaeologistsStore } from "../../../stores/Archaeologist";
import { SarcophagusStatus } from "../../../types/sarcophagusTomb";

const useCheckArchivedStatus = (sarcophagus: Sarcophagus) => {
  const archaeologistStore: ArchaeologistsStore = useArchaeologistsStore();
  const [sarcophagusStatus, setSarcophagusStatus] = useState(SarcophagusStatus.Default);

  useEffect(() => {
    if (!archaeologistStore.archaeologistsWithStats.length) return;

    // loops through each archaeologists stat identifiers to find archived state
    for (let i = 0; i <= archaeologistStore.archaeologistsWithStats.length - 1; i++) {
      if (
        archaeologistStore.archaeologistsWithStats[i].accusedIdentifiers?.includes(
          sarcophagus.AssetDoubleHash
        )
      ) {
        setSarcophagusStatus(SarcophagusStatus.Accused);
        break;
      } else if (
        archaeologistStore.archaeologistsWithStats[i].canceledIdentifiers?.includes(
          sarcophagus.AssetDoubleHash
        )
      ) {
        setSarcophagusStatus(SarcophagusStatus.Canceled);
        break;
      } else if (
        archaeologistStore.archaeologistsWithStats[i].cleanupIdentifiers?.includes(
          sarcophagus.AssetDoubleHash
        )
      ) {
        setSarcophagusStatus(SarcophagusStatus.Cleaned);
        break;
      } else if (
        archaeologistStore.archaeologistsWithStats[i].successesIdentifiers?.includes(
          sarcophagus.AssetDoubleHash
        )
      ) {
        setSarcophagusStatus(SarcophagusStatus.ArchivedUnwrapped);
        break;
      } else {
        setSarcophagusStatus(SarcophagusStatus.Buried);
      }
    }
  }, [sarcophagus, archaeologistStore]);

  return { sarcophagusStatus };
};

export { useCheckArchivedStatus };

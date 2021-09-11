import { useEffect, useState } from "react";
import { ISarcophagus } from "../../../stores/Sarcophagi/sarcophagi.interfaces";
import { IArchaeologistsStore } from "../../../stores/Archaeologist/archaeologist.interfaces";
import { useArchaeologistsStore } from "../../../stores/Archaeologist";
import { SarcophagusStatus } from "../tomb.enums";

const useCheckArchivedStatus = (sarcophagus: ISarcophagus) => {
  const archaeologistStore: IArchaeologistsStore = useArchaeologistsStore();
  const [sarcophagusStatus, setSarcophagusStatus] = useState(SarcophagusStatus.Default);

  useEffect(() => {
    if (!archaeologistStore.archaeologistsWithStats.length) return;
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

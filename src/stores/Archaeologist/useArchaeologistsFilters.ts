import { useCallback, useEffect, useState } from "react";
import { fetchWithTimeout } from "./archaeologist.utils";
import { IArchaeologists } from "./archaeologist.interfaces";

const useArchaeologistsFilter = (archaeologists: IArchaeologists[]) => {
  const [filteredArchaeologists, setFilteredArchaeologists] = useState<IArchaeologists[]>([]);

  const filterArchaeologists = useCallback(async () => {
    if (!archaeologists.length) return;
    // removes archaeologists with no free bond
    const filterFreebond = (archaeologist: IArchaeologists) => !archaeologist.freeBond.isZero();

    // filters for inActive archaeologist
    const pingArchaeologists = async (archaeologist: IArchaeologists) => {
      try {
        const response = await fetchWithTimeout(archaeologist.endpoint + "/ping", { timeout: 3000 });
        if (response.ok) return archaeologist;
        else return { ...archaeologist, isOffline: true };
      } catch {
        console.error(
          "Archaeologist unavailable -",
          "Address:",
          archaeologist.address,
          "Endpoint:",
          archaeologist.endpoint
        );
        return { ...archaeologist, isOffline: true };
      }
    };

    const filteredArchaeologists = await Promise.all(
      archaeologists.filter(filterFreebond).map(pingArchaeologists)
    );
    setFilteredArchaeologists(filteredArchaeologists);
  }, [archaeologists]);

  useEffect(() => {
    filterArchaeologists();
  }, [filterArchaeologists]);
  return { filteredArchaeologists };
};

export { useArchaeologistsFilter };

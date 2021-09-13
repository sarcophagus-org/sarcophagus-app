import { useCallback, useEffect, useState } from "react";
import { fetchWithTimeout } from "./archaeologist.utils";
import { Archaeologist } from "./archaeologist.interfaces";

const useArchaeologistsFilter = (archaeologists: Archaeologist[]) => {
  const [filteredArchaeologists, setFilteredArchaeologists] = useState<Archaeologist[]>([]);

  const filterArchaeologists = useCallback(async () => {
    if (!archaeologists.length) return;
    // removes archaeologists with no free bond
    const filterFreebond = (archaeologist: Archaeologist) => !archaeologist.freeBond.isZero();

    // filters for inActive archaeologist
    const pingArchaeologists = async (archaeologist: Archaeologist) => {
      try {
        const response = await fetchWithTimeout(archaeologist.endpoint + "/ping", { timeout: 3000 });
        if (response.ok) return { ...archaeologist, isOnline: true };
        else return { ...archaeologist, isOnline: false };
      } catch {
        console.error(
          "Archaeologist unavailable -",
          "Address:",
          archaeologist.address,
          "Endpoint:",
          archaeologist.endpoint
        );
        return { ...archaeologist, isOnline: false };
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

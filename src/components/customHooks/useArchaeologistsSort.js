import { utils } from "ethers";
import { useState, useEffect, useCallback } from "react";
import { getTotalFee } from "../../utils/bigNumbers";
import usePagination from "./usePagination";

const useArchaeologistsSort = (archaeologists, file, bounty, diggingFee) => {
  const [filteredList, setList] = useState([]);
  const {
    page,
    perPage,
    totalPages,
    handlePrevPage,
    handleNextPage,
    goToPage,
    pageNumbers,
  } = usePagination(archaeologists?.length);

  // set list when archaeologists are loaded
  useEffect(() => {
    if (!Array.isArray(archaeologists) || !archaeologists.length) return;
    setList(
      archaeologists.filter(
        (_, i) => i >= page * perPage && i <= (page + 1) * perPage - 1
      )
    );
  }, [archaeologists, page, perPage]);

  const pingArchaeologists = useCallback(async (archaeologist) => {
    try {
      const response = await fetch(archaeologist.endpoint + "/ping");
      if (response.ok) return archaeologist;
      else return {...archaeologist, isOffline: true};
    } catch {
      console.error(
        "Archaeologist unavailable -",
        "Address:",
        archaeologist.address,
        " Endpoint:",
        archaeologist.endpoint
      );
      return {...archaeologist, isOffline: true};
    }
  }, []);

  useEffect(() => {
    if (!bounty || !diggingFee || !file) return;
		Promise.all(archaeologists.map(pingArchaeologists)).then(
			(archaeologists) =>
					// if file, bounty and digging fee is present sort by fee then
					archaeologists.sort((a, b) => getTotalFee(b, file) - getTotalFee(a, file))
					// sort disabled to be in the back then
					.sort((a) => a.disabled && -1).sort((a, b) =>
						a.minimumBounty.lte(utils.parseEther(bounty.toString())) &&
						a.minimumDiggingFee.lte(utils.parseEther(diggingFee.toString()))
							? -1
							: b.minimumBounty.lte(utils.parseEther(bounty.toString())) &&
								b.minimumDiggingFee.lte(
									utils.parseEther(diggingFee.toString())
								)
							? 1
							: 0
					)
					// filter by page
					.filter(
						(_, i) => i >= page * perPage && i <= (page + 1) * perPage - 1
					)
		).then(filteredArchaeologists => setList(filteredArchaeologists))
  }, [
    bounty,
    diggingFee,
    file,
    page,
    perPage,
    archaeologists,
    pingArchaeologists,
  ]);

  return {
    filteredList,
    page,
    totalPages,
    handlePrevPage,
    handleNextPage,
    goToPage,
    pageNumbers,
  };
};

export default useArchaeologistsSort;

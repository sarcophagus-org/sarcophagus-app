import { utils } from 'ethers'
import { useState, useEffect } from 'react'
import { getStorageFee } from '../../utils/bigNumbers'
import usePagination from './usePagination'

const useArchaeologistsSort = (archaeologists, file, bounty, diggingFee ) => {
	const [ filteredList, setList ] = useState([])
	const { page, perPage, totalPages, handlePrevPage, handleNextPage, goToPage, pageNumbers } = usePagination(archaeologists.length)

	// set list when archaeologists are loaded
	useEffect(() => {
		if(!Array.isArray(archaeologists) || !archaeologists.length) return
		setList(archaeologists.filter((_, i) => i >= page * perPage && i <= ((page + 1) * perPage) - 1 ))
	}, [archaeologists, page, perPage])

	useEffect(() => {
		if(!bounty || !diggingFee || !file) return
		setList( archaeologists
			// if file, bounty and digging fee is present sort by fee then
			.sort((a, b) => getStorageFee(b, file) - getStorageFee(a, file))
			// sort disabled to be in the back then
			.sort((a, b) => a.minimumBounty.lte(utils.parseEther(bounty.toString())) && a.minimumDiggingFee.lte(utils.parseEther(diggingFee.toString())) ? -1 : b.minimumBounty.lte(utils.parseEther(bounty.toString())) && b.minimumDiggingFee.lte(utils.parseEther(diggingFee.toString())) ? 1 : 0)
			// filter by page
			.filter((_, i) => i >= page * perPage && i <= ((page + 1) * perPage) - 1 )
			)
	}, [bounty, diggingFee, file, page, perPage, archaeologists])


  return { filteredList, page, totalPages, handlePrevPage, handleNextPage, goToPage, pageNumbers }
}

export default useArchaeologistsSort
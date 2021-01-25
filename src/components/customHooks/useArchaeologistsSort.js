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

	// if file sort and show bounty fee (everything is still disabled)
	useEffect(() => {
		if(!Array.isArray(archaeologists) || !archaeologists.length) return
		if(!file) return
		setList( (archaeologists
			.sort((a, b) => getStorageFee(a, file) - getStorageFee(b, file))
			.filter((_, i) => i >= page * perPage && i <= ((page + 1) * perPage) - 1 )
		))
	}, [archaeologists, file, page, perPage])

	// disabled sort last
	useEffect(() => {
    if(!bounty || !diggingFee || !file) return
		setList( (archaeologists
			.sort((a) => a.minimumBounty.lte(utils.parseEther(bounty.toString())) && a.minimumDiggingFee.lte(utils.parseEther(diggingFee.toString())) ? -1 : 1)
			.filter((_, i) => i >= page * perPage && i <= ((page + 1) * perPage) - 1 )
		))
	}, [bounty, diggingFee, file, page, perPage, archaeologists])


  return { filteredList, page, totalPages, handlePrevPage, handleNextPage, goToPage, pageNumbers }
}

export default useArchaeologistsSort
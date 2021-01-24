import { utils } from 'ethers'
import { useState, useEffect } from 'react'
import { getStorageFee } from '../../utils/bigNumbers'

const useArchaeologistSelect = (archaeologists, file, bounty, diggingFee ) => {
	const [ filteredList, setList ] = useState([])

	// set list when archaeologists are loaded
	useEffect(() => {
		if(!Array.isArray(archaeologists) || !archaeologists.length) return
		setList(archaeologists)
	}, [archaeologists])
	
	// default filtered (freeBond removed, all listed, all disabled)
  useEffect(() => {
		if(!Array.isArray(archaeologists) || !archaeologists.length) return
    setList( (filteredList) => filteredList
      .filter(v => !v.freeBond.isZero())
			)
	},[archaeologists])

	// if file sort and show bounty fee (everything is still disabled)
	useEffect(() => {
		if(!Array.isArray(archaeologists) || !archaeologists.length) return
		if(!file) return
		setList( (filteredList) => filteredList
			.sort((a, b) => getStorageFee(a, file) - getStorageFee(b, file)))
	}, [archaeologists, file])

	// disabled sort last
	useEffect(() => {
    if(!bounty || !diggingFee || !file) return
		setList( (filteredList) => filteredList
			.sort((a) => a.minimumBounty.lte(utils.parseEther(bounty.toString())) && a.minimumDiggingFee.lte(utils.parseEther(diggingFee.toString())) ? -1 : 1)
		)
	}, [bounty, diggingFee, file])
  return { filteredList }
}

export default useArchaeologistSelect
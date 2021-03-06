import { useState, useEffect } from 'react'


const usePagination = (itemsTotal) => {
    const [ page, setPage ] = useState(0)
    const [ totalPages, setTotalPages ] = useState(0)
    const [ pageNumbers, setPageNumbers ] = useState([])
    const perPage = 5
    
    // setTotalPages
    useEffect(() => { setTotalPages(Math.floor(itemsTotal / perPage))}, [itemsTotal])
    useEffect(() => { 
        let arr = []
        for(let i = 0; i <= totalPages; i++) arr.push(i)
        setPageNumbers(arr)
    }, [totalPages])

    // user clicks next page
    const handleNextPage = () => {
        if(page >= totalPages) return
        setPage(page => page + 1)
    }   

    // user clicks prev page
    const handlePrevPage = () => {
        if(page === 0) return
        setPage(page => page - 1)
    }

    const goToPage = (page) => {
		setPage(page)
	}

    return { page, perPage, totalPages, handlePrevPage, handleNextPage, pageNumbers, goToPage }
}

export default usePagination
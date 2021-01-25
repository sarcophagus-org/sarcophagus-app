import React from 'react'
import { labels } from '../../constants'
import SectionContainer from '../layout/SectionContainer'
import Title from '../layout/Title'
import Fees from './Fees'
import ArchTableRow from './ArchTableRow'
import PageSelect from './PageSelect'
import ArchaeologistsList from './ArchaeologistsList'
import useArchaeologistsSort from '../customHooks/useArchaeologistsSort'

const PickArchaeologist = ({ archaeologists, handleSelected, archSelected, file, values, handleChange, setFieldValue, errors, touched }) => {
  const { bounty, diggingFee } = values
  const { filteredList, page, totalPages, handlePrevPage, handleNextPage, goToPage, pageNumbers } = useArchaeologistsSort(archaeologists, file, bounty, diggingFee )

  return (
    <SectionContainer border={false}>
      <Title type="subOne" title={labels.pickArchaeologist} />
      <Fees values={values} handleChange={handleChange} errors={errors} touched={touched} />
      
      <ArchTableRow headerOne={`Archaeologists (${archaeologists.length})`} headerTwo="Fee" headerThree="Metrics" />
        {filteredList.map( (archaeologist, i) => 
          <ArchaeologistsList 
          key={`${i}${archaeologist.archaeologist}`} 
          setFieldValue={setFieldValue} 
          selected={archSelected}
          handleSelected={handleSelected} 
          archaeologist={archaeologist} 
          file={file} 
          bounty={bounty} 
          diggingFee={diggingFee} 
          gtSign="&#62;"
          />
          )}
      {/* Once Pagination is added this will change */}
      {archaeologists.length > 0 && <PageSelect 
          page={page} 
          totalPages={totalPages} 
          handlePrevPage={handlePrevPage} 
          handleNextPage={handleNextPage}
          pageNumbers={pageNumbers}
          goToPage={goToPage} />}
    </SectionContainer>
  )
}
export default PickArchaeologist
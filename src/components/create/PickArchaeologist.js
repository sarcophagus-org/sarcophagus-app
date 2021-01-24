import React from 'react'
import { labels } from '../../constants'
import SectionContainer from '../layout/SectionContainer'
import Title from '../layout/Title'
import Fees from './Fees'
import ArchTableRow from './ArchTableRow'
import PageSelect from './PageSelect'
import ArchaeologistsList from './ArchaeologistsList'
import useArchaeologistSelect from '../customHooks/useArchaeologistSelect'

const PickArchaeologist = ({ archaeologists, handleSelected, archSelected, file, values, handleChange, setFieldValue, errors, touched }) => {
  const { bounty, diggingFee } = values
  const { filteredList, setDisabled } = useArchaeologistSelect(archaeologists, file, bounty, diggingFee )

  return (
    <SectionContainer border={false}>
      <Title type="subOne" title={labels.pickArchaeologist} />
      <Fees values={values} handleChange={handleChange} errors={errors} touched={touched} />
      
      <ArchTableRow headerOne={`Archaeologists (${filteredList.length})`} headerTwo="Fee" headerThree="Metrics" />
      {filteredList.map( (archaeologist) => 
        <ArchaeologistsList 
          key={archaeologist.archaeologist} 
          setFieldValue={setFieldValue} 
          selected={archSelected}
          setDisabled={setDisabled}
          handleSelected={handleSelected} 
          archaeologist={archaeologist} 
          file={file} 
          bounty={bounty} 
          diggingFee={diggingFee} 
          gtSign="&#62;"/>
        )}
      
      {/* Once Pagination is added this will change */}
      {filteredList.length !== 0 && <PageSelect />}
    </SectionContainer>
  )
}
export default PickArchaeologist
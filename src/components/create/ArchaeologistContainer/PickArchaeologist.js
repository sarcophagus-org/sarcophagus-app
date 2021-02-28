import React from 'react'
import SectionContainer from '../../layout/SectionContainer'
import Title from '../../layout/Title'
import Fees from './Fees'
import ArchTableRow from './ArchTableRow'
import PageSelect from './PageSelect'
import ArchaeologistsList from './ArchaeologistsList'
import useArchaeologistsSort from '../../customHooks/useArchaeologistsSort'
import arrowDown from '../../../assets/images/arrowDown.svg'
import Error from '../../Error'

const PickArchaeologist = ({ archaeologists, handleSelected, archSelected, file, values, handleChange, setFieldValue, errors, touched, toggle, icon, title }) => {
  const { bounty, diggingFee } = values
  const { filteredList, page, totalPages, handlePrevPage, handleNextPage, goToPage, pageNumbers } = useArchaeologistsSort(archaeologists, file, bounty, diggingFee )

  return (
    <SectionContainer>
      <div className="relative pb-4 ease-in-transition">
        <div className="flex justify-between">
          <Title type="subOne" title={title} icon={icon} />
          <img alt="" src={arrowDown} onClick={toggle} />
        </div>
        <Fees values={values} handleChange={handleChange} errors={errors} touched={touched} />
        <div className="hide-scrollbar overflow-x-scroll w-full whitespace-nowrap">
          {errors.address && touched.address && <Error extraPadding="ml-6">{errors.address}</Error>}
          <ArchTableRow headerOne={`Archaeologists (${archaeologists.length})`} headerTwo="Fee" headerThree="Digging Fee" headerFour='Bounty' headerFive='Metrics' />
          {filteredList.map( (archaeologist, i) => 
            <ArchaeologistsList key={`${i}${archaeologist.paymentAddress}`} setFieldValue={setFieldValue} selected={archSelected} handleSelected={handleSelected} archaeologist={archaeologist} file={file} bounty={bounty} diggingFee={diggingFee} gtSign="&#62;"/>)}

        </div>
        {archaeologists.length > 0 && <PageSelect 
            page={page} 
            totalPages={totalPages} 
            handlePrevPage={handlePrevPage} 
            handleNextPage={handleNextPage}
            pageNumbers={pageNumbers}
            goToPage={goToPage} />}
      </div>
    </SectionContainer>
  )
}
export default PickArchaeologist
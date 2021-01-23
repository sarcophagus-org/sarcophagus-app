import React, { useEffect, useState } from 'react'
import { labels } from '../../constants'
import SectionContainer from '../layout/SectionContainer'
import Title from '../layout/Title'
import { utils } from 'ethers'
import { getStorageFee } from '../../utils/bigNumbers'
import Fees from './Fees'
import ArchTableRow from './ArchTableRow'
import PageSelect from './PageSelect'
import ArchaeologistsList from './ArchaeologistsList'

const PickArchaeologist = ({ archaeologists, handleSelected, archSelected, file, values, handleChange, setFieldValue, errors, touched }) => {
  const [ filteredList, setList ] = useState([])
  const [ selected, setSelected ] = useState(false)

  useEffect(() => {
    if(archSelected) {    
    setSelected(archSelected)
  }}, [archSelected, setSelected])


  useEffect(() => {
    if(!values.bounty || !values.diggingFee || !file) return
    if(!Array.isArray(archaeologists) || !archaeologists.length) return
    setList(archaeologists
      .filter(v => !v.freeBond.isZero())
      .filter(v => v.minimumBounty.lte(utils.parseEther(values.bounty.toString())))
      .filter(v => v.minimumDiggingFee.lte(utils.parseEther(values.bounty.toString())))
      .sort((a, b) => getStorageFee(a, file) - getStorageFee(b, file)))
  },[archaeologists, values.bounty, values.diggingFee, file])

  return (
    <SectionContainer border={false}>
      <Title type="subOne" title={labels.pickArchaeologist} />
      <Fees values={values} handleChange={handleChange} errors={errors} touched={touched} />
      
      <ArchTableRow headerOne={`Archaeologists (${filteredList.length})`} headerTwo="Fee" headerThree="Metrics" />
      {filteredList.map( (archaeologist) => <ArchaeologistsList key={archaeologist.archaeologist} setFieldValue={setFieldValue} selected={selected} handleSelected={handleSelected} archaeologist={archaeologist} file={file} gtSign="&#62;"/>)}
      
      {/* Once Pagination is added this will change */}
      {filteredList.length !== 0 && <PageSelect />}
    </SectionContainer>
  )
}
export default PickArchaeologist
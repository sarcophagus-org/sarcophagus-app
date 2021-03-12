import React from 'react'
import { CREATE_MAIN_CONTENT, CREATE_MAIN_HEADER } from '../../constants'
import SectionContainer from '../layout/SectionContainer'
import Title from '../layout/Title'
import sarcophagusIcon from '../../assets/images/sarcophagus.svg'

const PageHeading = () => (
  <SectionContainer transition={false}>
    <Title type="main" title={CREATE_MAIN_HEADER} icon={sarcophagusIcon} />
    <div className="text-md font-normal">
      {CREATE_MAIN_CONTENT}
    </div>
  </SectionContainer>
)

export default PageHeading
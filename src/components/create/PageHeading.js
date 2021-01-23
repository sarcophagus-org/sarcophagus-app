import React from 'react'
import { labels } from '../../constants'
import SectionContainer from '../layout/SectionContainer'
import Title from '../layout/Title'
import sarcophagusIcon from '../../assets/images/sarcophagus.svg'

const PageHeading = () => (
  <SectionContainer>
    <Title type="main" title={labels.createSarco} icon={sarcophagusIcon} />
    <div className="text-md font-normal">
      Excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. 
    </div>
  </SectionContainer>
)

export default PageHeading
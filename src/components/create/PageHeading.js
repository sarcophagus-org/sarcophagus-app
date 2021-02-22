import React from 'react'
import { labels } from '../../constants'
import SectionContainer from '../layout/SectionContainer'
import Title from '../layout/Title'
import sarcophagusIcon from '../../assets/images/sarcophagus.svg'

const PageHeading = () => (
  <SectionContainer transition={false}>
    <Title type="main" title={labels.createSarco} icon={sarcophagusIcon} />
    <div className="text-md font-normal">
      Use this page to create a sarcophagus, this process is called “embalming”. You will need to name your sarcophagus, paste in the full public key of the recipient, and upload the file you wish to embalm.
    </div>
  </SectionContainer>
)

export default PageHeading
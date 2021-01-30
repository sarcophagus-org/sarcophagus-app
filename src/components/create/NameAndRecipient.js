import React from 'react'
import Error from '../Error'
import { labels } from '../../constants'
import InfoBox from '../layout/InfoBox'
import Input from '../layout/Input'
import SectionContainer from '../layout/SectionContainer'
import Title from '../layout/Title'
import TwoColumnContainer from '../layout/TwoColumnContainer'

const NameAndRecipient = ({values, errors, touched, handleChange, handleKey}) => (
  <SectionContainer>
    <Title type="subOne" title={labels.nameAndRecipient} />

    <TwoColumnContainer>
      <div>
        <div className="flex">
          <Title type="subTwo" title="Title &#x2739;" />
          {errors.name && touched.name && <Error>{errors.name}</Error>}
        </div>
        <Input type="text" height="lg" placeholder="" errored={errors.name && touched.name} error={errors.name} name="name" value={values.name} onChange={handleChange} maxLength={256}/>
      </div>
      <InfoBox style={{marginTop: '1.75rem'}}>
          Helper text here can explain something and have space for a link to learn more
      </InfoBox>
    </TwoColumnContainer>
    
    <TwoColumnContainer>
      <div>
        <div className="flex">
          <Title type="subTwo" title="Recipient &#x2739;" />
          {errors.recipientPublicKey && touched.recipientPublicKey && <Error>{errors.recipientPublicKey}</Error>}
        </div>
        <Input name="recipientPublicKey" value={values.recipientPublicKey} errored={errors.recipientPublicKey && touched.recipientPublicKey} error={errors.recipientPublicKey} onChange={(e) => {handleChange(e); handleKey(e.target.value)}} type="textarea" height="xl" placeholder="0x........00000" />         
      </div>
      <InfoBox style={{marginTop: '1.75rem'}}>
        <div className="border-b border-gray-400 mb-4" style={{width: 'fit-content'}}>Eth public key</div>
        <div className="text-gray-400">Helper text here can explain something and have space for a link to learn more</div>
      </InfoBox>
    </TwoColumnContainer>
  </SectionContainer>
)

export default NameAndRecipient
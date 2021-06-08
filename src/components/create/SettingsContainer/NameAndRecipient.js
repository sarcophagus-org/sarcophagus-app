import React from 'react'
import Error from '../../Error'
import InfoBox from '../../layout/InfoBox'
import Input from '../../layout/Input'
import SectionContainer from '../../layout/SectionContainer'
import Title from '../../layout/Title'
import TwoColumnContainer from '../../layout/TwoColumnContainer'
import arrowDown from '../../../assets/images/arrowDown.svg'
import { NavLink } from 'react-router-dom'
import { NAME_INFO_CONTENT, RECIPIENT_INFO_LINK, RECIPIENT_INFO_PART_1, RECIPIENT_INFO_PART_2 } from '../../../constants'

const NameAndRecipient = ({values, errors, touched, handleChange, handleKey, title, icon, toggle}) => (
  <SectionContainer>
    <div className="flex justify-between cursor-pointer" onClick={toggle}>
      <Title type="subOne" title={title} icon={icon} />
      <img alt="" src={arrowDown} />
    </div>

    <TwoColumnContainer>
      <div>
        <div className="flex items-center mb-2">
          <Title type="subTwo" title="Title" />
          {errors.name && touched.name && <Error>{errors.name}</Error>}
        </div>
        <Input type="text" height="lg" placeholder="" errored={errors.name && touched.name} error={errors.name} name="name" value={values.name} onChange={handleChange} maxLength={256}/>
      </div>
      <InfoBox style={{marginTop: '1.75rem'}}>
      { NAME_INFO_CONTENT }
      </InfoBox>
    </TwoColumnContainer>
    
    <TwoColumnContainer>
      <div>
        <div className="flex items-center mb-2">
          <Title type="subTwo" title="Recipient" />
          {errors.recipientPublicKey && touched.recipientPublicKey && <Error>{errors.recipientPublicKey}</Error>}
        </div>
        <Input name="recipientPublicKey" value={values.recipientPublicKey} errored={errors.recipientPublicKey && touched.recipientPublicKey} error={errors.recipientPublicKey} onChange={(e) => {handleChange(e); handleKey(e.target.value)}} type="textarea" height="xl" placeholder="0x0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000" />         
      </div>
      <InfoBox style={{marginTop: '1.75rem'}}>
        <div className="border-b border-gray-400 mb-4" style={{width: 'fit-content'}}>Eth public key</div>
        <div className="text-gray-400 leading-5">
         <NavLink className="cursor-pointer mr-2 underline hover:text-gray-300 text-white" to="/publicKey">{RECIPIENT_INFO_LINK}</NavLink>
          {RECIPIENT_INFO_PART_1}
          {RECIPIENT_INFO_PART_2} 
        </div>
      </InfoBox>
    </TwoColumnContainer>
  </SectionContainer>
)

export default NameAndRecipient
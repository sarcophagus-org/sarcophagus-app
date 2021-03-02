import React from 'react'
import Error from '../../Error'
import InfoBox from '../../layout/InfoBox'
import Input from '../../layout/Input'
import SectionContainer from '../../layout/SectionContainer'
import Title from '../../layout/Title'
import TwoColumnContainer from '../../layout/TwoColumnContainer'
import arrowDown from '../../../assets/images/arrowDown.svg'
import { NavLink } from 'react-router-dom'

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
        Enter a name for your sarcophagus, this will be public on the blockchain.
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
        <div className="text-gray-400">
          Paste your recipient’s full Ethereum public key here, this is not the same as a public address. You can visit
         <NavLink className="cursor-pointer mx-2 text-md underline hover:text-white" to="/publicKey">Get Public Key</NavLink>
         to get your full public key.</div>
      </InfoBox>
    </TwoColumnContainer>
  </SectionContainer>
)

export default NameAndRecipient
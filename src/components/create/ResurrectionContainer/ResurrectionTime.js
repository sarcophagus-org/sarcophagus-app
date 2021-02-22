import React from 'react'
import InfoBox from '../../layout/InfoBox'
import SectionContainer from '../../layout/SectionContainer'
import Title from '../../layout/Title'
import Error from '../../Error'
import arrowDown from '../../../assets/images/arrowDown.svg'
import TwoColumnContainer from '../../layout/TwoColumnContainer'
import TimeFields from './TimeFields'


const ResurrectionTime = ({values, errors, touched, setFieldValue, title, icon, toggle}) => (
  <SectionContainer>
    <div className="flex justify-between">
      <div className="flex">
        <Title type="subOne" title={title} icon={icon} />
        {errors.resurrectionTime && touched.resurrectionTime && <Error>{errors.resurrectionTime}</Error>}
      </div>
      <img alt="" src={arrowDown} onClick={toggle} />
    </div>
    <TwoColumnContainer>
      <TimeFields errors={errors} touched={touched} setFieldValue={setFieldValue} values={values} />
      <InfoBox margin="-mt-1">
        <div className="pb-2">
          The resurrection time is the exact time and date that the outer layer of your sarcophagus will be decrypted by the Archaeologist.
        </div>
        <div className="pb-2">
          If you fail to re-wrap before this time; only the inter layer of encryption controlled by the recipient is protecting the data in your sarcophagus. 
        </div>
        <div>
          The further the resurrection date is into the future, the more it will cost to create your sarcophagus.
        </div>
      </InfoBox>
    </TwoColumnContainer>
  </SectionContainer>
)


export default ResurrectionTime
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
      <InfoBox>
        Set your resurrection time. Helper text here can explain something and have space for a link to learn more
      </InfoBox>
    </TwoColumnContainer>
  </SectionContainer>
)


export default ResurrectionTime
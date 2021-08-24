import React from 'react'
import InfoBox from '../../layout/InfoBox'
import SectionContainer from '../../layout/SectionContainer'
import Title from '../../layout/Title'
import Error from '../../Error'
import arrowDown from '../../../assets/images/arrowDown.svg'
import TwoColumnContainer from '../../layout/TwoColumnContainer'
import TimeFields from './TimeFields'
import { RESURRECTION_INFO_P_1, RESURRECTION_INFO_P_2, RESURRECTION_INFO_P_3 } from '../../../constants'


const ResurrectionTime = ({values, errors, touched, setFieldValue, title, icon, toggle}) => (
  <SectionContainer>
    <div className="flex justify-between">
      <div className="flex items-center">
        <Title type="subOne" title={title} icon={icon} />
        {errors.resurrectionTime && touched.resurrectionTime && <Error>{errors.resurrectionTime}</Error>}
      </div>
      <img alt="" src={arrowDown} onClick={toggle} />
    </div>
    <TwoColumnContainer>
      <TimeFields errors={errors} touched={touched} setFieldValue={setFieldValue} values={values} />
      <InfoBox margin="-mt-1">
        <div className="pb-2">
          { RESURRECTION_INFO_P_1 }
        </div>
        <div className="pb-2">
          { RESURRECTION_INFO_P_2 }
        </div>
        <div>
          { RESURRECTION_INFO_P_3 }
        </div>
      </InfoBox>
    </TwoColumnContainer>
  </SectionContainer>
)


export default ResurrectionTime
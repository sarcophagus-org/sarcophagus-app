import React from 'react'
import { labels, monthAhead, threeMonthAhead, weekAhead } from '../../constants'
import InfoBox from '../layout/InfoBox'
import Input from '../layout/Input'
import SectionContainer from '../layout/SectionContainer'
import Title from '../layout/Title'
import clockIcon from '../../assets/images/clock.svg'
import CustomTimeSelect from '../CustomTimeSelect'
import { getCustomDateUTC } from '../../utils/datetime'
import Error from '../Error'

const ResurrectionTime = ({values, errors, touched, handleChange, setFieldValue}) => (
  <SectionContainer>
    <div className="flex">
      <Title type="subOne" clock={clockIcon} title={labels.resurrectionTime} />
      {errors.resurrectionTime && touched.resurrectionTime && <Error>{errors.resurrectionTime}</Error>}
    </div>
    <div className="flex mt-8 gap-8">
      <div className={errors.resurrectionTime && touched.resurrectionTime ? "border border-red px-8 py-4" : "border border-gray-500 px-8 py-4"} style={{height: '15.25rem', width: '28rem'}}>
        <div className="flex flex-col justify-around h-full text-gray-400 radio-styles">
          <Title type="resurrection" title={labels.resurrectionTime} values={values} />
          {/* One Week */}
          <Input type="radio" name="timeSelect" onChange={() => {setFieldValue('timeSelect', 'week'); setFieldValue("resurrectionTime", weekAhead); setFieldValue('daysDisplayed', 7)}} checked={values.timeSelect === 'week'} value={weekAhead}>1 week</Input>
          {/* One Month */}
          <Input type="radio" name="timeSelect" onChange={() => {setFieldValue('timeSelect', 'month'); setFieldValue("resurrectionTime", monthAhead); setFieldValue('daysDisplayed', 30)}} checked={values.timeSelect === 'month'} value={monthAhead}>1 month</Input>
          {/* Three Months */}
          <Input type="radio" name="timeSelect" onChange={() => {setFieldValue('timeSelect', 'threeMonth'); setFieldValue("resurrectionTime", threeMonthAhead); setFieldValue('daysDisplayed', 90)}} checked={values.timeSelect === 'threeMonth'} value={threeMonthAhead}>3 months</Input>
          {/* Custom */}
          <Input type="radio" name="timeSelect" onChange={() => null} onClick={() => {setFieldValue('timeSelect', 'custom'); setFieldValue('resurrectionTime', getCustomDateUTC(values.days, values.hours, values.minutes)); setFieldValue('daysDisplayed', values.days)}} checked={values.timeSelect === 'custom'} value={getCustomDateUTC(values.days, values.hours, values.minutes)} custom="custom">
            <CustomTimeSelect isDisabled={values.timeSelect !== 'custom'} handleChange={handleChange} />
          </Input>
        </div>
      </div>
      <InfoBox>
        Set your resurrection time. Helper text here can explain something and have space for a link to learn more
      </InfoBox>
    </div>
  </SectionContainer>
)


export default ResurrectionTime
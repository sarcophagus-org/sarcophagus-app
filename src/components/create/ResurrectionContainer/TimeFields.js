import React from 'react'
import Input from '../../layout/Input';
import Title from '../../layout/Title';
import CustomTimeSelect from './CustomTimeSelect';
import { monthAhead, threeMonthAhead, weekAhead } from '../../../constants'
import { getCustomDate } from '../../../utils/datetime'

const TimeFields = ({errors, touched, values, setFieldValue}) => (
    <div className="flex gap-8">
      <div className={errors.resurrectionTime && touched.resurrectionTime ? "border border-red pl-8 py-4" : "border border-gray-500 px-8 py-4"} style={{height: '15.25rem', width: '28rem'}}>
        <div className="flex flex-col justify-around h-full text-gray-400 radio-styles">
          <Title type="resurrection" values={values} />
          {/* One Week */}
          <Input type="radio" name="timeSelect" onChange={() => {setFieldValue('timeSelect', 'week'); setFieldValue("resurrectionTime", weekAhead)}} checked={values.timeSelect === 'week'} value={weekAhead}>1 week</Input>
          {/* One Month */}
          <Input type="radio" name="timeSelect" onChange={() => {setFieldValue('timeSelect', 'month'); setFieldValue("resurrectionTime", monthAhead)}} checked={values.timeSelect === 'month'} value={monthAhead}>1 month</Input>
          {/* Three Months */}
          <Input type="radio" name="timeSelect" onChange={() => {setFieldValue('timeSelect', 'threeMonth'); setFieldValue("resurrectionTime", threeMonthAhead)}} checked={values.timeSelect === 'threeMonth'} value={threeMonthAhead}>3 months</Input>
          {/* Custom */}
          <Input type="radio" name="timeSelect" onChange={() => null} onClick={() => {setFieldValue('timeSelect', 'custom'); setFieldValue('resurrectionTime', values.customTime)}} checked={values.timeSelect === 'custom'} value={getCustomDate(values.resurrectionTime)} custom="custom">
            <CustomTimeSelect values={values} setFieldValue={setFieldValue} />
          </Input>
        </div>
      </div>
    </div>
)

export default TimeFields
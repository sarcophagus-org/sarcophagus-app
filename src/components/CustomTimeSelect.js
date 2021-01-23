import React from 'react'
import { days, hours, minutes } from '../constants'
import Select from './layout/Select'

const CustomTimeSelect = ({handleChange , isDisabled}) => (
  <div className="inline-block">
    <div className="flex items-center">
      <span className="mr-4">Custom</span>
      <Select defaultValue={days["number_365"]} disabled={isDisabled} onChange={handleChange} name="days">
        {Object.keys(days).map((key) => <option key={key} value={days[key]}>{days[key]} d</option>)}
      </Select>
      <Select onChange={handleChange} name="hours" disabled={isDisabled}>
        {Object.keys(hours).map((key) => <option key={key} value={hours[key]}>{hours[key]} h</option>)}
      </Select>
      <Select onChange={handleChange} name="minutes" disabled={isDisabled}>
        {Object.keys(minutes).map((key) => <option key={key} value={minutes[key]}>{minutes[key]} m</option>)}
      </Select>
    </div>
  </div>
)

export default CustomTimeSelect
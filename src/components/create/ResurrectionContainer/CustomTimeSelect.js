import React from 'react'
import DatePicker from 'react-datepicker'
import { convertToUTCTime, getCustomDateUTC } from '../../../utils/datetime'

const DatePickerButton = React.forwardRef(({value, onClick}, ref) => (
    <>
      {value ? (
        <span ref={ref} onClick={onClick} className="w-full border border-gray-500 bg-black flex justify-center items-center focus:outline-none">{value}</span>
      ) : (
        <button ref={ref} type="button" onClick={onClick} className="w-full border border-gray-500 bg-black flex justify-center items-center focus:outline-none" style={{height: '1.88rem'}} >Choose Resurrection Time</button>
      )}
    </>
  ))
  
  const DatePickerComponent = (props) => (
    <div className="date-picker-width ml-2">
      <DatePicker {...props} popperClassName="-mr-10" />
    </div>
  )

  const CustomTimeSelect = ({values, setFieldValue}) => {
      const { customTime } = values
      const date = new Date()
      // Controls how far in future time must be set
      // date.setDate(new Date().getDate() + 1)
      return (
        <DatePickerComponent customInput={<DatePickerButton />} 
            selected={customTime ? getCustomDateUTC(customTime) : date} 
            value={customTime ? getCustomDateUTC(customTime) : ""} 
            title={customTime ? getCustomDateUTC(customTime) : date} 
            onChange={(date) => {
                setFieldValue("custom", true)
                setFieldValue("customTime", convertToUTCTime(date))
                setFieldValue("resurrectionTime", convertToUTCTime(date))
            }} 
            dateFormat="MM/dd/yyyy hh:mm" 
            // minDate={date} 
            showTimeSelect
        />
    )}

  export default CustomTimeSelect
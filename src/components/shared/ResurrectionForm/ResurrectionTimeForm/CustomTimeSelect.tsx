import React from 'react'
import DatePicker from 'react-datepicker'
import { convertToUTCTime } from '../../components.utils'
import { RewrapFormState } from '../../../SarcophagusTomb/tomb.interfaces'
import { utcToDateObject } from '../../../SarcophagusTomb/tomb.utils'
import { SarcophagusCreateValues } from '../../../SarcophagusCreate/sarcophagusCreate.interfaces'

interface CustomTimeSelectProps {
  values: RewrapFormState | SarcophagusCreateValues;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
}

interface DatePickerComponentProps {
  selected: Date;
  value: string;
  title: string;
  onChange: (e: any) => void;
  dateFormat: string;
  minDate: Date;
  showTimeSelect: boolean;
  customInput: JSX.Element;
}

interface DatePickerButtonProps {
  value?: string,
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

const DatePickerButton = React.forwardRef(({value, onClick}: DatePickerButtonProps, ref: any) => (
    <>
      {value ? (
        <span ref={ref} onClick={onClick} className="w-full border border-gray-500 bg-black flex justify-center items-center focus:outline-none">{value}</span>
      ) : (
        <button ref={ref} type="button" onClick={onClick} className="w-full border border-gray-500 bg-black flex justify-center items-center focus:outline-none" style={{height: '1.88rem'}} >Choose Resurrection Time</button>
      )}
    </>
  ))
  
  const DatePickerComponent = (props: DatePickerComponentProps ) => (
    <div className="date-picker-width ml-2">
      <DatePicker {...props} popperClassName="-mr-10" />
    </div>
  )

  const CustomTimeSelect = ({values, setFieldValue}: CustomTimeSelectProps) => {
      const { customTime } = values
      const date = new Date()
      // Controls how far in future time must be set
      date.setDate(new Date().getDate() + 1)
      return (
        <DatePickerComponent customInput={<DatePickerButton />} 
            selected={customTime ? utcToDateObject(customTime) : date} 
            value={customTime ? utcToDateObject(customTime).toLocaleString() : ""} 
            title={customTime ? utcToDateObject(customTime).toLocaleString() : date.toLocaleString()} 
            onChange={(date) => {
                setFieldValue("custom", true)
                setFieldValue("customTime", convertToUTCTime(date))
                setFieldValue("resurrectionTime", convertToUTCTime(date))
                setFieldValue("timeSelect", "custom");
            }} 
            dateFormat="MM/dd/yyyy hh:mm" 
            minDate={date} 
            showTimeSelect
        />
    )}

  export default CustomTimeSelect
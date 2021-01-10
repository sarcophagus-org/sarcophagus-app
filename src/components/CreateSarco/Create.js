import React from 'react'
import { Formik } from 'formik'
import DatePicker from 'react-datepicker'
import Button from '../layout/Button'
import Input from '../layout/Input'
import { initialFileValues } from './initialValues'
import { validationFileSchema } from './validationSchemas'
import InfoBox from '../layout/InfoBox'
import Title from '../layout/Title'


const DatePickerButton = React.forwardRef(({value, onClick}, ref) => (
  <>
    <InfoBox title={value || "Month/Day/Year Hour|Minute"}/>
    <button ref={ref} type="button" onClick={onClick} className="w-full my-3 border border-white flex justify-center items-center focus:outline-none" style={{height: '1.88rem'}} >Choose Resurrection Time</button>
  </>
))

const DatePickerComponent = (props) => (
  // Allows for DatePicker to be 100% of container
  <div className="date-picker-width">
    <DatePicker {...props} />
  </div>
)

const Create = ({ fileInfo="", handleSubmit, handleFileChange, setExpanded }) => (
  <Formik initialValues={initialFileValues} validationSchema={validationFileSchema} onSubmit={(values) => handleSubmit(values, setExpanded)}>
    {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
      <form onSubmit={ handleSubmit }>

        <div className="relative w-full h-full px-4"> 
          <Title title="File To Upload" />
          <InfoBox title={fileInfo.name || "File Name"}/>
          <Input type="file" name="file" id="file" onChange={(e) => { handleFileChange(e, setFieldValue)}} />
          
          <Title title="Sarcophgus Name" />
          <Input type="text" height="md" placeholder="" name="sarcophagusName" value={values.sarcophagusName} onChange={handleChange}/>

          <Title title="Set Resurrection Time" />
          
          <DatePickerComponent customInput={<DatePickerButton />} selected={values.resurrectionTime} value={new Date(values.resurrectionTime)} title={new Date(values.resurrectionTime)} onChange={(date) => {setFieldValue("resurrectionTime", date)}} dateFormat="MM/dd/yyyy hh/mm" minDate={new Date()} showTimeSelect/>

          <Title title="Recipient Address" />
          <Input name="recipientAddress" value={values.recipientAddress} onChange={handleChange} type="text" height="md" placeholder="0x........00000" />

          <Button label="Next: Settings" _classNames="w-full bg-white text-gray-900 mt-6 mb-4" height="lg" type="submit" />
        </div>
      </form>
      )}
  </Formik>
)

export default Create
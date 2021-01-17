import React from 'react'
import { Formik } from 'formik'
import Button from '../layout/Button'
import Input from '../layout/Input'
import Title from '../layout/Title'
import { initialFeesValues } from './initialValues'
import { validationFeesSchema } from './validationSchemas'

const Settings = ({handleSubmit, setExpanded, setCompleted, sarcophagusSettings}) => (
  <Formik initialValues={initialFeesValues(sarcophagusSettings)} validationSchema={validationFeesSchema()} onSubmit={(values) => handleSubmit(values, setExpanded, setCompleted)} >
    {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
      <form onSubmit={ handleSubmit } className="relative w-full h-full px-4">

        <Title title="Bounty Fees" />
        <Input type="number" name="bounty" step="0.000000000000000001" min="0.000000000000000000" value={values.bounty} onChange={handleChange} height="md" placeholder="100 Sarco (Suggested)" />

        <Title title="Digging Fees" /> 
        <Input type="number" name="diggingFee" step="0.000000000000000001" min="0.000000000000000000" value={values.diggingFee} onChange={handleChange} height="md" placeholder="10 Sarco (Suggested)" />
        
        <Button label="Next: Choose Archaeologist" _classNames="w-full bg-white text-gray-900 mt-6 mb-4" height="lg" type='submit'/>
      </form>
    )}
  </Formik>
)


export default Settings
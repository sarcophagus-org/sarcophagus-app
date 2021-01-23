import React from 'react'
import { Formik } from 'formik'
import { useData } from '../BlockChainContext'
import FileDrop from './FileDrop'
import PageHeading from './PageHeading'
import NameAndRecipient from './NameAndRecipient'
import ResurrectionTime from './ResurrectionTime'
import PickArchaeologist from './PickArchaeologist'
import { initialValues } from './initialValues'
import { validationSchema } from './validationSchema'
import useSarcophagusCreate from '../customHooks/useSarcophagusCreate'
import Button from '../layout/Button'

const CreateSarcophagus = () => {
  const { archaeologists } = useData()
  const { createSarcophagus } = useData()
  const {file, setFile, handleArchaeologistSelect, handleEmbalming, selectedArchaeologist, handleKey} = useSarcophagusCreate(createSarcophagus)
  return (
    <Formik initialValues={initialValues()} validationSchema={validationSchema()} onSubmit={handleEmbalming}>
      {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
        <form className="ml-8 px-14" onSubmit={handleSubmit}>
          <PageHeading />
          <NameAndRecipient values={values} errors={errors} touched={touched} handleChange={handleChange} handleKey={handleKey}/>
          <FileDrop file={file} handleFile={setFile} errors={errors} touched={touched} setFieldValue={setFieldValue} />
          <ResurrectionTime values={values} errors={errors} touched={touched} handleChange={handleChange} setFieldValue={setFieldValue}/>
          <PickArchaeologist errors={errors} touched={touched} archaeologists={archaeologists} file={file} values={values} handleChange={handleChange} handleEmbalming={handleEmbalming} handleSelected={handleArchaeologistSelect} archSelected={selectedArchaeologist?.archaeologist || ""} setFieldValue={setFieldValue}/>
          <div className="flex flex-col items-end">
            <Button label="Finish" height="lg" type="submit" />
          </div>
        </form>
      )}
    </Formik>
  )
}

export default CreateSarcophagus
import React, { useEffect, useState } from 'react'
import { Formik } from 'formik'
import { useData } from '../BlockChainContext'
import PageHeading from './PageHeading'
import { initialValues } from './initialValues'
import { validationSchema } from './validationSchema'
import useSarcophagusCreate from '../customHooks/useSarcophagusCreate'
import Button from '../layout/Button'
import { useHistory } from 'react-router-dom';
import useApproval from '../customHooks/useApproval'
import SettingsContainer from './SettingsContainer'
import UploadContainer from './UploadContainer'
import ResurrectionContainer from './ResurrectionContainer'
import ArchaeologistContainer from './ArchaeologistContainer'

const CreateSarcophagus = () => {
  const history = useHistory()
  const { archaeologists, createSarcophagus, refresh } = useData()
  const { approved, approveTransaction } = useApproval()
  const {file, setFile, handleArchaeologistSelect, handleEmbalming, selectedArchaeologist, handleKey} = useSarcophagusCreate(createSarcophagus)
  const [ buttonText, setButtonText ] = useState('')
    
    useEffect(() => {
        if(!approved) {
            setButtonText('Approve')
        } else {
            setButtonText('Finish')
        }
    }, [approved])

  const handleSubmit = (values) => {
    handleEmbalming(values, history, refresh)
  }

  const handleApproval = (errors) => {
    if(!!Object.keys(errors).length) return
    approveTransaction()
  }

  return (
    <Formik initialValues={initialValues()} validationSchema={validationSchema()} onSubmit={handleSubmit} validateOnMount >
      {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue, validateForm, isValid }) => (
        <form className="ml-8 px-14" onSubmit={handleSubmit}>
          <PageHeading />
          <SettingsContainer values={values} errors={errors} touched={touched} handleChange={handleChange} handleKey={handleKey}/>
          <UploadContainer values={values} file={file} handleFile={setFile} errors={errors} touched={touched} setFieldValue={setFieldValue} />
          <ResurrectionContainer values={values} errors={errors} touched={touched} handleChange={handleChange} setFieldValue={setFieldValue}/>
          <ArchaeologistContainer errors={errors} touched={touched} archaeologists={archaeologists} file={file} values={values} handleChange={handleChange} handleEmbalming={handleEmbalming} handleSelected={handleArchaeologistSelect} archSelected={selectedArchaeologist?.paymentAddress || ""} setFieldValue={setFieldValue}/>
          
          <Button label={buttonText} isDisabled={!isValid} _classnames="my-8" height="lg" type={approved ? 'submit' : 'button'} onClick={approved ? () => validateForm() : () => {validateForm(); handleApproval(errors)}} />

        </form>
      )}
    </Formik>
  )
}

export default CreateSarcophagus
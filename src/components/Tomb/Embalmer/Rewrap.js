import React, { useEffect, useState } from 'react'
import { Formik } from 'formik'
import { validationSchema } from './validationSchema'
import Fees from '../../create/ArchaeologistContainer/Fees'
import TimeFields from '../../create/ResurrectionContainer/TimeFields'
import Title from '../../layout/Title'
import Error from '../../Error'
import Tooltip from '../../layout/Tooltip'
import Button from '../../layout/Button'
import { initialValues } from './initialValues'
import { useData } from '../../BlockChainContext'
import useApproval from '../../customHooks/useApproval'
import { STATUSES } from '../../../constants'

const Rewrap = ({ sarcophagus, archaeologist, setCurrentStatus, toggle, refresh }) => {
    const { burySarcophagus, rewrapSarcophagus } = useData()
    const { approved, approveTransaction } = useApproval()
    const [ buttonText, setButtonText ] = useState('')
    useEffect(() => {
            if(!approved) {
                setButtonText('Approve')
            } else {
                setButtonText('Rewrap Sarcophagus')
            }
        }, [approved])

    const handleApproval = (errors) => {
        if(!!Object.keys(errors).length) return
        approveTransaction()
    }

    const handleSubmit = async (values) => {
        await rewrapSarcophagus(sarcophagus, values)
        await setCurrentStatus(STATUSES.REWRAP_IN_PROGRESS)
        await refresh()
        await toggle()
    }

    const handleBury = async () => {
        await burySarcophagus(sarcophagus)
        await setCurrentStatus('Burying')
        await refresh()
        await toggle()
    }

    return (
        <Formik initialValues={initialValues(archaeologist)} validationSchema={validationSchema(archaeologist)} onSubmit={handleSubmit} validateOnMount >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue, validateForm, isValid }) => (
                <form onSubmit={handleSubmit} className="pb-8 px-10">
                    <div className="flex items-center">
                        <Title type="subOne" title="Fees" />
                        <Tooltip>
                            <div>These fees are based on current minimum fees provided by archaeologist</div>
                        </Tooltip>
                        {errors.bounty && touched.bounty && <Error>{errors.bounty}</Error>}
                        {errors.diggingFee && touched.diggingFee && <Error>{errors.diggingFee}</Error>}
                    </div>
                    <Fees values={values} handleChange={handleChange} errors={errors} touched={touched} margin="my-4" />
                    <div className="flex mb-4 items-center">
                        <Title type="subOne" title="Choose new resurrection time" />
                        <Tooltip>
                            <div>Choose a resurrection time by selecting an options below</div>
                            <div>1 Week: 7 days from today</div>
                            <div>1 month: 30 days from today</div>
                            <div>3 months: 90 days from today</div>
                        </Tooltip>
                        {errors.resurrectionTime && touched.resurrectionTime && <Error>{errors.resurrectionTime}</Error>}
                    </div>
                    <TimeFields errors={errors} touched={touched} setFieldValue={setFieldValue} values={values} />
                    <div className="flex flex-col justify-center items-center mt-8 mb-12">

                    <Button label={buttonText} isDisabled={!isValid} type={approved ? 'submit' : 'button'} onClick={approved ? () => null: () => {validateForm(); handleApproval(errors)}} />
                        <div className="whitespace-nowrap flex absolute bottom-8 underline justify-center items-center" onClick={handleBury}>
                            <span className="mr-2 cursor-pointer">Bury sarcophagus</span>
                            <Tooltip>
                                {`< Content >`}
                            </Tooltip>
                        </div>
                    </div>
                </form>
            )}
        </Formik>
    )
}

export default Rewrap
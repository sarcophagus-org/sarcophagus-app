import React, { useEffect, useState } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Fees from '../../create/ArchaeologistContainer/Fees'
import TimeFields from '../../create/ResurrectionContainer/TimeFields'
import Title from '../../layout/Title'
import Error from '../../Error'
import Tooltip from '../../layout/Tooltip'
import Button from '../../layout/Button'
import { useData } from '../../BlockChainContext'
import useApproval from '../../customHooks/useApproval'
import { getDecimalNumber } from '../../../utils/bigNumbers'
import { BURY_TOOLTIP } from '../../../constants'

const Rewrap = ({ sarcophagus, archaeologist, refresh, toggle, setCurrentStatus, refreshTimers }) => {
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
        await rewrapSarcophagus(sarcophagus, values, refresh, toggle, setCurrentStatus, refreshTimers)
    }

    const handleBury = async () => {
        await burySarcophagus(sarcophagus, setCurrentStatus, refresh, toggle, refreshTimers)
    }

    const initialValues = {
        resurrectionTime: "",
        bounty: getDecimalNumber(archaeologist?.minimumBounty, 18),
        diggingFee: getDecimalNumber(archaeologist?.minimumDiggingFee, 18),
        custom: false,
        customTime: ""
      }

    const validationSchema = Yup.object().shape({
        resurrectionTime: Yup.number().required('Resurrection time is required'),
        bounty: Yup.number()
          .min(getDecimalNumber(archaeologist?.minimumBounty, 18), 'Bounty is too low')
          .required('Bounty is required'),
        diggingFee: Yup.number()
          .min(getDecimalNumber(archaeologist?.minimumDiggingFee, 18), 'Digging Fee is too low')
          .required('Digging Fee is required'),
        customTime: Yup.number()
          .when("custom", {
            is: true,
            then:  Yup.number().required('Resurrection time is required')
          }),
        custom: Yup.bool()
      }).nullable()

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} validateOnMount >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue, validateForm, isValid }) => (
                <form onSubmit={handleSubmit} className="pb-8 px-10">
                    <div className="flex items-center">
                        <Title type="subOne" title="Fees" />
                        <Tooltip content="These fees are based on current minimum fees provided by archaeologist" />
                        {errors.bounty && touched.bounty && <Error>{errors.bounty}</Error>}
                        {errors.diggingFee && touched.diggingFee && <Error>{errors.diggingFee}</Error>}
                    </div>
                    <Fees values={values} handleChange={handleChange} errors={errors} touched={touched} margin="my-4" paddingRight="mr-8" showInfo={false}/>
                    <div className="flex mb-4 items-center">
                        <Title type="subOne" title="Choose new resurrection time" />
                        <Tooltip content={
                            <div>
                                <div>Choose a resurrection time by selecting an options below</div>
                                <div>1 Week: 7 days from today</div>
                                <div>1 month: 30 days from today</div>
                                <div>3 months: 90 days from today</div>
                            </div>
                        } />
                        {errors.resurrectionTime && touched.resurrectionTime && <Error>{errors.resurrectionTime}</Error>}
                    </div>
                    <TimeFields errors={errors} touched={touched} setFieldValue={setFieldValue} values={values} />
                    <div className="flex flex-col justify-center items-center mt-8 mb-12">

                    <Button label={buttonText} isDisabled={!isValid} type={approved ? 'submit' : 'button'} onClick={approved ? () => null: () => {validateForm(); handleApproval(errors)}} />
                        <div className="whitespace-nowrap flex absolute bottom-8 underline justify-center items-center" onClick={handleBury}>
                            <span className="mr-2 cursor-pointer">Bury sarcophagus</span>
                            <Tooltip content={BURY_TOOLTIP} />
                        </div>
                    </div>
                </form>
            )}
        </Formik>
    )
}

export default Rewrap
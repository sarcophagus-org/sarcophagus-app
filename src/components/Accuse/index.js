import { Formik } from 'formik'
import React from 'react'
import Error from '../Error'
import Button from '../layout/Button'
import Input from '../layout/Input'
import Title from '../layout/Title'
import Tooltip from '../layout/Tooltip'
import { initialValues } from './initialValues'
import { validationSchema } from './validationSchema'
import eyeOfHorus from '../../assets/images/eyeOfHorus2.svg'
import { useData } from '../BlockChainContext'

const TextField = ({errors, touched, handleChange, title, tooltip, ...rest}) => (
    <div className="w-128">
        <div className="flex items-center">
            <Title type="subOne" title={title} />
            <Tooltip>
                <div>{ tooltip } </div>
            </Tooltip>
            {errors && touched && <Error>{errors}</Error>}
        </div>
        <Input _classnames="my-4" errored={errors && touched} error={errors} onChange={handleChange} {...rest} />
    </div>
)

const SINGLEHASH_TITLE = 'Single Hash'
const SINGLEHASH_TOOLTIP = ''
const SINGLEHASH_PLACEHOLDER = '0x0000000000000000000000000000000000000000000000000000000000000000'
const PAYMENT_ADDRESS_TITLE = 'Archaeologist Address'
const PAYMENT_ADDRESS_TOOLTIP = ''
const PAYMENT_ADDRESS_PLACEHOLDER = '0x0000000000000000000000000000000000000000'
const IDENTIFIER_TITLE = 'Sarcophagus Identifier'
const IDENTIFIER_TOOLTIP = ''
const IDENTIFIER_PLACEHOLDER = '0x0000000000000000000000000000000000000000000000000000000000000000'

// paymentAddress // 0x18948906Cb850B1f87bfb8Cb2115785f338C3fb1
// singlehash // 0x3db2acf426baeced6da3c16bf14b349ea91de275cc400f3f5c0a1f6c4f9dcb5c
// doublehash // 0xfd976a9d551d010debe8c7d7cf599239ee6e0622a61c22bff570fb7e4bd9ca68

const AccuseArchaeologist = () => {
    const { accuseArchaeologist } = useData()
    return (
        <Formik initialValues={initialValues()} validationSchema={validationSchema()} onSubmit={values => accuseArchaeologist(values)} >
            {({ values, errors, touched, handleChange, handleSubmit}) => (
            <form onSubmit={handleSubmit} className="px-2 flex flex-wrap justify-center">
                <div className="mr-4 mt-2 w-104">
                    <Title type="subOne" icon={eyeOfHorus} title="Eye of Horus" />
                    <div className="mt-8 text-md text-white" style={{lineHeight: '1.4375rem'}}>
                        <div>Ad aliqua proident adipisicing id cillum nisi cupidatat incididunt duis. Cupidatat occaecat aliquip deserunt mollit labore et occaecat ipsum veniam voluptate aliqua tempor. Deserunt esse dolore occaecat ipsum nulla nisi proident esse ipsum. Sint veniam magna pariatur amet ea ut reprehenderit velit eu magna ut cillum aute.</div>
                        <div className="mt-4">In deserunt sit proident eu incididunt quis veniam. Nisi nisi irure mollit aute nisi incididunt velit qui qui ex amet est. Veniam fugiat fugiat aute magna tempor velit officia nulla est eiusmod. Et incididunt eu anim in adipisicing nisi dolor.</div>
                    </div>
                </div>
                <div className="mt-8 md:mt-16">
                    <TextField type="text" name="paymentAddress" value={values.paymentAddress} errors={errors.paymentAddress} touched={touched.paymentAddress} handleChange={handleChange} title={PAYMENT_ADDRESS_TITLE} tooltip={PAYMENT_ADDRESS_TOOLTIP} placeholder={PAYMENT_ADDRESS_PLACEHOLDER}/>
                    <TextField type="textarea" name="singleHash" height="accuse" value={values.singleHash} errors={errors.singleHash} touched={touched.singleHash} handleChange={handleChange} title={SINGLEHASH_TITLE} tooltip={SINGLEHASH_TOOLTIP} placeholder={SINGLEHASH_PLACEHOLDER}/>
                    <TextField type="textarea" name="identifier" height="accuse" value={values.identifier} errors={errors.identifier} touched={touched.identifier} handleChange={handleChange} title={IDENTIFIER_TITLE} tooltip={IDENTIFIER_TOOLTIP} placeholder={IDENTIFIER_PLACEHOLDER}/>
                    <Button _classnames="mx-auto w-full mb-4" type="submit" label="Submit" />
                </div>
            </form>
            )}
        </Formik>
    )
}

export default AccuseArchaeologist
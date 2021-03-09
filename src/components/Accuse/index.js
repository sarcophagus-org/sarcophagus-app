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
import { ADDRESS_PLACEHOLDER, ADDRESS_TOOLTIP, IDENTIFIER_PLACEHOLDER, IDENTIFIER_TITLE, IDENTIFIER_TOOLTIP, PAYMENT_ADDRESS_TITLE, SINGLEHASH_PLACEHOLDER, SINGLEHASH_TITLE, SINGLEHASH_TOOLTIP } from '../../constants'

const TextField = ({errors, touched, handleChange, title, tooltip, ...rest}) => (
    <div className="w-128">
        <div className="flex items-center">
            <Title type="subOne" title={title} />
            <Tooltip>
                <div>{ tooltip } </div>
            </Tooltip>
            {errors && touched && <Error>{errors}</Error>}
        </div>
        <Input _classnames="my-4 pl-4" errored={errors && touched} error={errors} onChange={handleChange} {...rest} />
    </div>
)

const AccuseArchaeologist = () => {
    const { accuseArchaeologist } = useData()
    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values, {resetForm}) => accuseArchaeologist(values, resetForm)} >
            {({ values, errors, touched, handleChange, handleSubmit}) => (
            <form onSubmit={handleSubmit} className="px-2 flex flex-wrap md:flex-nowrap justify-center">
                <div className="mr-4 mt-2 w-104 md:w-128">
                    <Title type="subOne" icon={eyeOfHorus} title="Eye of Horus" />
                    <div className="mt-8 text-md text-white" style={{lineHeight: '1.4375rem'}}>
                        <div>Ad aliqua proident adipisicing id cillum nisi cupidatat incididunt duis. Cupidatat occaecat aliquip deserunt mollit labore et occaecat ipsum veniam voluptate aliqua tempor. Deserunt esse dolore occaecat ipsum nulla nisi proident esse ipsum. Sint veniam magna pariatur amet ea ut reprehenderit velit eu magna ut cillum aute.</div>
                        <div className="mt-4">In deserunt sit proident eu incididunt quis veniam. Nisi nisi irure mollit aute nisi incididunt velit qui qui ex amet est. Veniam fugiat fugiat aute magna tempor velit officia nulla est eiusmod. Et incididunt eu anim in adipisicing nisi dolor.</div>
                    </div>
                </div>
                <div className="mt-8 md:mt-16">
                    <TextField type="text" name="address" height="lg" value={values.address} errors={errors.address} touched={touched.address} handleChange={handleChange} title={PAYMENT_ADDRESS_TITLE} tooltip={ADDRESS_TOOLTIP} placeholder={ADDRESS_PLACEHOLDER}/>
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
import { utils } from 'ethers'
import { Formik } from 'formik'
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useSarcophagusContract } from '../BlockChainContext/contracts'
import { useRecipientSarcophagi } from '../BlockChainContext/useRecipientSarcophagi'
import Button from '../layout/Button'
import { initialValues } from '../Tomb/Recipient/initialValues'
import RecipientPrivateKeyField from '../Tomb/Recipient/RecipientPrivateKeyField'
import RecipientSarcophagusWrapper from '../Tomb/Recipient/SarcophagusWrapper'
import { validationSchema } from '../Tomb/Recipient/validationSchema'

const useQuery = () => {
    return new URLSearchParams(useLocation().search)
}

const PrivateKeyField = ({handleQuery}) => {
    return (
        <Formik initialValues={initialValues()} validationSchema={validationSchema()} onSubmit={values => handleQuery(values)} >
            {({ values, errors, touched, handleChange, handleSubmit}) => (
                <form onSubmit={handleSubmit} className="px-2">
                    <RecipientPrivateKeyField values={values} errors={errors} touched={touched} handleChange={handleChange} />
                    <Button _classnames="mx-auto w-full mb-4" type="submit" label="Submit" />
                </form>
            )}
        </Formik>
    )
}

const Resurrection = () => {
    const sarcophagusContract = useSarcophagusContract()
    // retrieve keys from query
    let query = useQuery()
    const [ recipientPrivateKey, setRecipientPrivateKey ] = useState(query.get('recipientPrivateKey'))
    
    // takes private key param and converts to address
    const address = recipientPrivateKey ? utils.computeAddress(recipientPrivateKey) : ""
    const { recipientSarcophagi } = useRecipientSarcophagi(sarcophagusContract, address, true)
    
    const handleQuery = (values) => {
        setRecipientPrivateKey(values.recipientPrivateKey)
    }

    return (
        <div className="pt-8 px-8 flex justify-center md:justify-between flex-wrap md:flex-nowrap gap-3 md:gap-0">
            <PrivateKeyField handleQuery={handleQuery}/>
            <div className="pt-2 " style={{width: '34rem'}}>
                {recipientSarcophagi?.map((sarcophagus, i) => <RecipientSarcophagusWrapper key={sarcophagus.archaeologist + i.toString()} sarcophagus={sarcophagus} recipientPrivateKey={recipientPrivateKey} />)}
            </div>
        </div>
    )
}

export default Resurrection
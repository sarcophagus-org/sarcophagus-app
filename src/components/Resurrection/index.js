import { utils } from 'ethers'
import { Formik } from 'formik'
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useSarcophagusContract } from '../Context/BlockChainContext/contracts'
import { useRecipientSarcophagi } from '../Context/SarcophagiContext/useRecipientSarcophagi'
import Button from '../layout/Button'
import RecipientPrivateKeyField from '../Tomb/Recipient/RecipientPrivateKeyField'
import RecipientSarcophagusWrapper from '../Tomb/Recipient/SarcophagusWrapper'
import { validationSchema } from '../Tomb/Recipient/validationSchema'

const useQuery = () => {
    return new URLSearchParams(useLocation().search)
}

const hexString = (value) => {
    let hexKey
    if(value?.substr(0, 2) !== '0x') hexKey = '0x' + value
    return hexKey || value
}


const PrivateKeyField = ({handleQuery, initialValues}) => {
    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={values => handleQuery(values)} >
            {({ values, errors, touched, handleChange, handleSubmit}) => (
                <form onSubmit={handleSubmit} className="px-2 w-128">
                    <RecipientPrivateKeyField values={values} errors={errors} touched={touched} handleChange={handleChange} />
                    <Button _classnames="w-full mb-4" type="submit" label="Submit" />
                </form>
            )}
        </Formik>
    )
}

const Resurrection = () => {
    const sarcophagusContract = useSarcophagusContract()
    // retrieve keys from query
    let query = useQuery()
    const [ recipientPrivateKey, setRecipientPrivateKey ] = useState("")
    
    // takes private key param and converts to address
    const address = recipientPrivateKey ? utils.computeAddress(hexString(recipientPrivateKey)) : ""
    const { recipientAllSarcophagi } = useRecipientSarcophagi(sarcophagusContract, address, true)

    const initialValues = {
        recipientPrivateKey: query.get('recipientPrivateKey') || ""
    }
    
    const handleQuery = (values) => {
        setRecipientPrivateKey(values.recipientPrivateKey)
    }

    return (
        <div className="pt-8 px-8 flex justify-center md:justify-between flex-wrap md:flex-nowrap gap-4 md:gap-8">
            <PrivateKeyField handleQuery={handleQuery} initialValues={initialValues}/>
            <div className="pt-2 " style={{width: '34rem'}}>
                {recipientAllSarcophagi?.map((sarcophagus, i) => <RecipientSarcophagusWrapper key={sarcophagus.archaeologist + i.toString()} sarcophagus={sarcophagus} recipientPrivateKey={recipientPrivateKey} />)}
            </div>
        </div>
    )
}

export default Resurrection
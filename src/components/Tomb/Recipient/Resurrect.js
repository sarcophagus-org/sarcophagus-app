import { decrypt } from 'ecies-geth'
import { Formik } from 'formik'
import React from 'react'
import { toast } from 'react-toastify'
import { arweaveFileValid, initArweave } from '../../../utils/arweave'
import { hexToBytes } from '../../../utils/bytes'
import Button from '../../layout/Button'
import { initialValues } from './initialValues'
import RecipientPrivateKeyField from './RecipientPrivateKeyField'
import { validationSchema } from './validationSchema'

const hexString = (value) => {
    let hexKey
    if(value?.substr(0, 2) !== '0x') hexKey = '0x' + value
    return hexKey || value
}

const Resurrect = ({sarcophagus, recipientPrivateKey}) => {
    const handleDownload = async (values) => {
        try {
            let currentKey = hexString(recipientPrivateKey || values.recipientPrivateKey)
            let archPrivateKey = sarcophagus.privateKey
            // retrieve arweave file
            const Arweave = initArweave()
            const encryptedData = await Arweave.transactions.getData(sarcophagus.assetId, {decode: true})
        
            // !TODO make this show an error
            const isValid = await arweaveFileValid(Arweave, sarcophagus.assetId, {data: encryptedData})
            if(!isValid) return

            // decrypt with private key (NOTE this step may be done by service)
            const outerLayerDecrypted = await decrypt(hexToBytes(archPrivateKey, true).slice(1), encryptedData).catch(e => console.error('Outer', e))
            
            // decrypt with public key
            const innerLayerDecrypted = await decrypt(hexToBytes(currentKey, true).slice(1), outerLayerDecrypted).catch(e => console.error('Inner:', e))
            const parsedData = JSON.parse(innerLayerDecrypted)
            // create blob using Buffer.from(bytes) and file type (use sarco name for now for download)
            const { type, data } = parsedData
            const blob = new Blob([Buffer.from(Object.values(data))], {type: type})
            const url = window.URL.createObjectURL(blob);

            // start download
            const a = document.createElement('a')
            a.style.display = 'none'
            a.href = url
            a.download = sarcophagus.name
            document.body.appendChild(a)
            a.click()
            window.URL.revokeObjectURL(url)
        } catch (e){
            console.error("There was an error downloading file:", e)
            toast.dark('There was an error downloading file')
        }
    }
    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema(!!recipientPrivateKey)} onSubmit={values => handleDownload(values)} >
            {({ values, errors, touched, handleChange, handleSubmit}) => (
                <form onSubmit={handleSubmit} className="px-2">
                    {!recipientPrivateKey && <RecipientPrivateKeyField values={values} errors={errors} touched={touched} handleChange={handleChange} />}
                    <Button _classnames="mx-auto w-full mb-4" type="submit" label="Resurrect File" />
                </form>
            )}
        </Formik>
    )
}

export default Resurrect



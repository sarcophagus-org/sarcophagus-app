import { decrypt } from 'ecies-geth'
import { Formik } from 'formik'
import React from 'react'
import { arweaveFileValid, initArweave } from '../../../utils/arweave'
import { hexToBytes } from '../../../utils/bytes'
import Error from '../../Error'
import Button from '../../layout/Button'
import Input from '../../layout/Input'
import Title from '../../layout/Title'
import Tooltip from '../../layout/Tooltip'
import { initialValues } from './initialValues'
import { validationSchema } from './validationSchema'

const Resurrect = ({sarcophagus}) => {
    const handleDownload = async (values) => {
        try {
            const { recipientPrivateKey } = values

            // retrieve arweave file
            const Arweave = initArweave()
            const encryptedData = await Arweave.transactions.getData(sarcophagus.assetId, {decode: true})
        
            // !TODO make this show an error
            const isValid = await arweaveFileValid(Arweave, sarcophagus.assetId, {data: encryptedData})
            if(!isValid) return

            // decrypt with private key (NOTE this step may be done by service)
            const outerLayerDecrypted = await decrypt(hexToBytes(sarcophagus.privateKey, true).slice(1), encryptedData).catch(e => console.log('Outer', e))
            
            // decrypt with public key
            const innerLayerDecrypted = await decrypt(hexToBytes(recipientPrivateKey, true).slice(1), outerLayerDecrypted).catch(e => console.log('Inner:', e))
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
            console.log(e)
        }
    }
    return (
        <Formik initialValues={initialValues()} validationSchema={validationSchema()} onSubmit={values => handleDownload(values)} >
            {({ values, errors, touched, handleChange, handleSubmit}) => (
                <form onSubmit={handleSubmit} className="px-2">
                    <div className="flex items-center">
                        <Title type="subOne" title="Recipient's Private Key" />
                        <Tooltip>
                            <div>The Private Key of the receiver of this Sarcophagus</div>
                        </Tooltip>
                        {errors.bounty && touched.bounty && <Error>{errors.bounty}</Error>}
                        {errors.diggingFee && touched.diggingFee && <Error>{errors.diggingFee}</Error>}
                    </div>
                    <Input _classNames="my-4" name="recipientPrivateKey" value={values.recipientPrivateKey} errored={errors.recipientPrivateKey && touched.recipientPrivateKey} error={errors.recipientPublicKey} onChange={handleChange} type="textarea" height="xl" placeholder="0x........00000" />   
                    <Button _classNames="mx-auto w-full mb-4" type="submit" label="Resurrect File" />
                </form>
            )}
        </Formik>
    )
}

export default Resurrect



import React from 'react'
import Error from '../../Error'
import Input from '../../layout/Input'
import Title from '../../layout/Title'
import Tooltip from '../../layout/Tooltip'
const RecipientPrivateKeyField = ({values, errors, touched, handleChange}) => {
    return (
        <div>
            <div className="flex items-center">
                <Title type="subOne" title="Recipient's Private Key" />
                <Tooltip>
                    <div>The Private Key of the receiver of this Sarcophagus</div>
                </Tooltip>
                {errors.bounty && touched.bounty && <Error>{errors.bounty}</Error>}
                {errors.diggingFee && touched.diggingFee && <Error>{errors.diggingFee}</Error>}
            </div>
            <Input _classnames="my-4" name="recipientPrivateKey" value={values.recipientPrivateKey} errored={errors.recipientPrivateKey && touched.recipientPrivateKey} error={errors.recipientPublicKey} onChange={handleChange} type="textarea" height="xl" placeholder="0x........00000" />
        </div>
    )
}

export default RecipientPrivateKeyField
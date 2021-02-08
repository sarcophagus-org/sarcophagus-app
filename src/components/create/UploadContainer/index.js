import React, { useEffect } from 'react'
import useCollaspe from '../../customHooks/useCollaspe'
import CollaspedContainer from '../CollaspedContainer'
import { labels } from '../../../constants'
import icon from '../../../assets/images/bxUpload.svg'
import FileDrop from './FileDrop'

const UploadContainer = ({values, errors, ...rest}) => {
    const { collasped, toggle, open } = useCollaspe()
    
    useEffect(() => {
        if(values.name && values.recipientPublicKey) {
            if(!errors.name && !errors.recipientPublicKey) {
                open()
            }
        }
    },[ open, errors, values ])
    if(!collasped) {
        return (
            <FileDrop values={values} title={labels.fileUpload} icon={icon} toggle={toggle} errors={errors} {...rest} />
    )} else {
        return (
            <CollaspedContainer title={labels.fileUpload} icon={icon} toggle={toggle} />
        )}

}

export default UploadContainer
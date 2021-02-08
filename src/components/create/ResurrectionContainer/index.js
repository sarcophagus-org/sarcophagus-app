import React, { useEffect } from 'react'
import useCollaspe from '../../customHooks/useCollaspe'
import CollaspedContainer from '../CollaspedContainer'
import { labels } from '../../../constants'
import icon from '../../../assets/images/clock.svg'
import ResurrectionTime from './ResurrectionTime'

const ResurrectionContainer = ({values, errors, ...rest}) => {
    const { collasped, toggle, open } = useCollaspe()
    
    useEffect(() => {
        if(values.fileUploaded) {
            if(!errors.fileUploaded) {
                open()
            }
        }
    },[ open, errors, values ])

    if(!collasped) {
        return (
            <ResurrectionTime values={values} errors={errors} title={labels.resurrectionTime} icon={icon} toggle={toggle} {...rest} />
    )} else {
        return (
            <CollaspedContainer title={labels.resurrectionTime} icon={icon} toggle={toggle} />
        )}

}

export default ResurrectionContainer
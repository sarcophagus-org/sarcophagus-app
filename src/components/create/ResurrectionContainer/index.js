import React, { useEffect } from 'react'
import useCollapse from '../../customHooks/useCollapse'
import CollapsedContainer from '../CollapsedContainer'
import { RESURRECTION_TIME_HEADER } from '../../../constants'
import icon from '../../../assets/images/clock.svg'
import ResurrectionTime from './ResurrectionTime'

const ResurrectionContainer = ({values, errors, ...rest}) => {
    const { collapsed, toggle, open } = useCollapse()
    
    useEffect(() => {
        if(values.fileUploaded) {
            if(!errors.fileUploaded) {
                open()
            }
        }
    },[ open, errors, values ])

    if(!collapsed) {
        return (
            <ResurrectionTime values={values} errors={errors} title={RESURRECTION_TIME_HEADER} icon={icon} toggle={toggle} {...rest} />
    )} else {
        return (
            <CollapsedContainer title={RESURRECTION_TIME_HEADER} icon={icon} toggle={toggle} />
        )}

}

export default ResurrectionContainer
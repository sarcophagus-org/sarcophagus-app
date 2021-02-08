import React, { useEffect } from 'react'
import useCollaspe from '../../customHooks/useCollaspe'
import CollaspedContainer from '../CollaspedContainer'
import { labels } from '../../../constants'
import icon from '../../../assets/images/pickaxe.svg'
import PickArchaeologist from './PickArchaeologist'

const ArchaeologistContainer = ({values, errors, ...rest}) => {
    const { collasped, toggle, open } = useCollaspe()
    
    useEffect(() => {
        if(values.resurrectionTime) {
            if(!errors.resurrectionTime) {
                open()
            }
        }
    },[ open, errors, values ])

    if(!collasped) {
        return (
            <PickArchaeologist  values={values} errors={errors} title={labels.pickArchaeologist} icon={icon} toggle={toggle} {...rest} />
    )} else {
        return (
            <CollaspedContainer title={labels.pickArchaeologist} icon={icon} toggle={toggle} />
        )}

}

export default ArchaeologistContainer
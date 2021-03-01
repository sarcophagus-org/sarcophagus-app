import React, { useEffect } from 'react'
import useCollapse from '../../customHooks/useCollapse'
import CollapsedContainer from '../CollapsedContainer'
import { labels } from '../../../constants'
import icon from '../../../assets/images/pickaxe.svg'
import PickArchaeologist from './PickArchaeologist'

const ArchaeologistContainer = ({values, errors, ...rest}) => {
    const { collapsed, toggle, open } = useCollapse()
    
    useEffect(() => {
        if(values.resurrectionTime) {
            if(!errors.resurrectionTime) {
                open()
            }
        }
    },[ open, errors, values ])

    if(!collapsed) {
        return (
            <PickArchaeologist  values={values} errors={errors} title={labels.pickArchaeologist} icon={icon} toggle={toggle} {...rest} />
    )} else {
        return (
            <CollapsedContainer title={labels.pickArchaeologist} icon={icon} toggle={toggle} />
        )}

}

export default ArchaeologistContainer
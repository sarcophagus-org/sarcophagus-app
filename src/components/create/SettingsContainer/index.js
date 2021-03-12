import React from 'react'
import useCollapse from '../../customHooks/useCollapse'
import NameAndRecipient from './NameAndRecipient'
import CollapsedContainer from '../CollapsedContainer'
import { NAME_AND_RECIPIENT_HEADER } from '../../../constants'
import icon from '../../../assets/images/name.svg'

const SettingsContainer = ({values, ...rest}) => {
    const { collapsed, toggle } = useCollapse(false, true)

    if(!collapsed) {
        return (
            <NameAndRecipient values={values} title={NAME_AND_RECIPIENT_HEADER} icon={icon} toggle={toggle} {...rest} />
    )} else {
        return (
            <CollapsedContainer title={NAME_AND_RECIPIENT_HEADER} icon={icon} toggle={toggle} />
        )}

}

export default SettingsContainer
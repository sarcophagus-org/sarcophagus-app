import React from 'react'
import useCollapse from '../../customHooks/useCollapse'
import NameAndRecipient from './NameAndRecipient'
import CollapsedContainer from '../CollapsedContainer'
import { labels } from '../../../constants'
import icon from '../../../assets/images/name.svg'

const SettingsContainer = ({values, ...rest}) => {
    const { collapsed, toggle } = useCollapse(false, true)

    if(!collapsed) {
        return (
            <NameAndRecipient values={values} title={labels.nameAndRecipient} icon={icon} toggle={toggle} {...rest} />
    )} else {
        return (
            <CollapsedContainer title={labels.nameAndRecipient} icon={icon} toggle={toggle} />
        )}

}

export default SettingsContainer
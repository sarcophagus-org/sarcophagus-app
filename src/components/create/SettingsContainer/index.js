import React from 'react'
import useCollaspe from '../../customHooks/useCollaspe'
import NameAndRecipient from './NameAndRecipient'
import CollaspedContainer from '../CollaspedContainer'
import { labels } from '../../../constants'
import icon from '../../../assets/images/name.svg'

const SettingsContainer = ({values, ...rest}) => {
    const { collasped, toggle } = useCollaspe(false, true)

    if(!collasped) {
        return (
            <NameAndRecipient values={values} title={labels.nameAndRecipient} icon={icon} toggle={toggle} {...rest} />
    )} else {
        return (
            <CollaspedContainer title={labels.nameAndRecipient} icon={icon} toggle={toggle} />
        )}

}

export default SettingsContainer
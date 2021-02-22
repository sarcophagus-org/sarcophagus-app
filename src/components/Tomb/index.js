import React from 'react'
import Title from '../layout/Title'
import icon from '../../assets/images/tomb.svg'
import SarcophagiList from './SarcophagiList'

const Tomb = () => {
  return (
    <div className="pt-8 px-8 flex justify-center md:justify-between flex-wrap md:flex-nowrap gap-3 md:gap-0">
      <div className="mr-4" style={{width: '22rem'}}>
        <Title type="subOne" icon={icon} title="Tomb" />
        <div className="mt-8 text-md text-white" style={{lineHeight: '1.4375rem'}}>
          <div>Your tomb is where you manage your sarcophagi. You will be able to see the ones you have created or received, as well as any canceled, buried, or errored out sarcophagi.</div>

          <div className="mt-4">More information on the alert statuses and different states for your sarcophagi, please visit our documentation: https://github.com/sarcophagus-org/sarcophagus-app/blob/develop/README.md</div>
        </div>
      </div>
      <SarcophagiList />
    </div>
  )
}

export default Tomb